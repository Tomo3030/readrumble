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
import {
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { Team } from '../modals/team';
import { collectionData } from 'rxfire/firestore';
import { ClassroomService } from './classroom.service';
import { Firestore } from '@angular/fire/firestore';
import { teamMap } from '../img-maps/team-imgs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private classroomTeams$ = new BehaviorSubject<Team[]>([]);

  constructor(
    private imgMap: ImgMapService,
    private classroom: ClassroomService,
    private db: Firestore,
    private authService: AuthService
  ) {}

  public getClassroomTeams(classroomId: string) {
    const classroomRef = this.classroom.getClassroomRef(classroomId);

    const teamRef = collection(this.db, 'classrooms', classroomRef, 'games');
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
  }

  public getAvailableTeams(classroomId: string): Observable<Team[]> {
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

  public async addTeam(classroomId: string, team: Team) {
    const classroomRef = this.classroom.getClassroomRef(classroomId);
    const docRef = doc(this.db, 'classrooms', classroomRef, 'games', team.id);
    const teamData = {
      ...team,
      members: [],
      created: serverTimestamp(),
      gameStatus: 'waitingToStart',
    };
    return setDoc(docRef, teamData, { merge: true });
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

  public joinTeam(classroomId: string, team: Team): Promise<void> {
    const user = this.authService.user().displayName;
    if (!user) throw new Error('No user');
    const classroomRef = this.classroom.getClassroomRef(classroomId);
    const docRef = doc(this.db, 'classrooms', classroomRef, 'games', team.id);
    return setDoc(docRef, { members: arrayUnion(user) }, { merge: true });
  }
}
