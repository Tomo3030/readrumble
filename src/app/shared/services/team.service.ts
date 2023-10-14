import { Injectable } from '@angular/core';
import { ImgMapService } from './img-map.service';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  from,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { collection } from 'firebase/firestore';
import { Team } from '../modals/team';
import { collectionData } from 'rxfire/firestore';
import { ClassroomService } from './classroom.service';
import { Firestore } from '@angular/fire/firestore';
import { teamMap } from '../img-maps/team-imgs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private classroomTeams$ = new BehaviorSubject<Team[]>([]);

  constructor(
    private imgMap: ImgMapService,
    private classroom: ClassroomService,
    private db: Firestore
  ) {}

  getClassroomTeams(classroomId: string) {
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
                imgUrl: this.imgMap.getTeamImgUrl(team?.id),
              };
            });
          }),
          tap((teams) => {
            this.classroomTeams$.next(teams);
          })
        );
      })
    );
  }

  getAvailableTeams(classroomId: string): Observable<Team[]> {
    const allTeams = of(this.getAllTeams());
    return combineLatest([allTeams, this.classroomTeams$]).pipe(
      map(([allTeams, classroomTeams]) => {
        if (classroomTeams.length === 0) {
          return allTeams;
        }
        const addedIds = classroomTeams.map((team) => team.id);
        return allTeams.filter((team) => !addedIds.includes(team.id));
      })
    );
  }

  private getAllTeams(): Team[] {
    const allTeams = teamMap;
    return Object.keys(allTeams).map((key) => {
      const team = allTeams[key];
      team.id = key;
      team.imgUrl = `assets/team-images/${team.assetName}`;
      return team;
    });
  }
}
