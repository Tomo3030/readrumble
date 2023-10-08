import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { arrayUnion, collection, setDoc } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable, map } from 'rxjs';
import { Team } from 'src/app/shared/modals/team';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ImgMapService } from 'src/app/shared/services/img-map.service';

@Injectable({
  providedIn: 'root',
})
export class LandingDataAccessService {
  constructor(
    private db: Firestore,
    private imgMapService: ImgMapService,
    private authService: AuthService
  ) {}

  public async checkIfClassroomExists(classroomId: string): Promise<boolean> {
    const docRef = doc(this.db, 'classrooms', classroomId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }

  public getTeamData(classroomId: string) {
    const teamRef = collection(this.db, 'classrooms', classroomId, 'games');
    const teamData = collectionData(teamRef) as Observable<Team[]>;
    teamData.pipe(
      map((teams) => {
        return teams.map((team) => {
          return {
            ...team,
            imgUrl: this.imgMapService.getTeamImgUrl(team?.id),
          };
        });
      })
    );
    return teamData as Observable<Team[]>;
  }

  public async joinTeam(classroomId: string, team: Team): Promise<void> {
    const user = this.authService.user().displayName;
    if (!user) throw new Error('No user');
    const docRef = doc(this.db, 'classrooms', classroomId, 'games', team.id);
    return setDoc(docRef, { members: arrayUnion(user) }, { merge: true });
  }
}
