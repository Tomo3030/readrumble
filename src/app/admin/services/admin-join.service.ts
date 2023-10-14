import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable, from, map, switchMap } from 'rxjs';
import { Team } from 'src/app/shared/modals/team';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { ImgMapService } from 'src/app/shared/services/img-map.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private classroom: ClassroomService,
    private db: Firestore,
    private imgMapService: ImgMapService
  ) {}

  getTeams(classroomId: string) {
    const classroomRef$ = from(this.classroom.getDocumentId(classroomId));
    return classroomRef$.pipe(
      switchMap((classroomRef) => {
        const teamRef = collection(
          this.db,
          'classrooms',
          classroomRef,
          'games'
        );
        const teamData = collectionData(teamRef) as Observable<Team[]>;
        return teamData.pipe(
          map((teams) => {
            return teams.map((team) => {
              return {
                ...team,
                imgUrl: this.imgMapService.getTeamImgUrl(team?.id),
              };
            });
          })
        );
      })
    );
  }

  getAvailableTeams(classroomId: string) {}
}
