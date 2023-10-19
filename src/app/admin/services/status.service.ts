import { Injectable, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, writeBatch } from 'firebase/firestore';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  of,
  switchMap,
  timer,
} from 'rxjs';
import { Game } from 'src/app/shared/modals/game';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  public stack = signal(false);
  private showSkeleton$ = new BehaviorSubject<boolean>(false);
  private scoreControl$ = new BehaviorSubject<boolean>(false);
  private scoreInterval$ = this.scoreControl$.pipe(
    switchMap((x) => (x ? timer(0, 2000) : of(null)))
  );
  private teams$ = new BehaviorSubject<Game[]>([]);
  constructor(
    private teamService: TeamService,
    private db: Firestore,
    private classroomService: ClassroomService
  ) {}

  getGameData(classroomId: string): Observable<Game[]> {
    return combineLatest([
      this.teamService.getClassroomTeams(classroomId) as Observable<any>,
      this.showSkeleton$,
      this.scoreInterval$,
    ]).pipe(
      map(([scoreData, showSkeleton, scoreInterval]) => {
        let data = [...scoreData];
        console.log(data);
        this.teams$.next(data);
        if (showSkeleton) {
          data.map((data) => {
            data.gameStatus = 'skeleton';
          });
        }
        if (scoreInterval) {
          //sort by score
          data = data.sort((a, b) => b.score - a.score);
          //get index to reveal
          let scoreIndex = data.length - scoreInterval;
          data[scoreIndex].gameStatus = 'score';
          //stop score interval
          if (scoreInterval >= data.length) {
            this.scoreControl$.next(false);
          }
        }
        return data as unknown as Game[];
      })
    );
  }

  public showScore() {
    this.showSkeleton$.next(true);
    this.stack.set(true);
    setTimeout(() => {
      this.stack.set(false);
      this.showSkeleton$.next(false);
      this.scoreControl$.next(true);
    }, 2000);
  }

  public showEndGame$ = this.teams$.pipe(
    map((team) => {
      return team.some((team) => team.gameStatus === 'playing');
    })
  );

  public showScoreButton$ = this.teams$.pipe(
    map((team) => {
      return team.every((team) => team.gameStatus === 'gameOver');
    })
  );

  public endGame(classroomId: string) {
    const classroomRef = this.classroomService.getClassroomRef(classroomId);
    if (!classroomRef) throw new Error('Classroom not found');
    const teams = this.getTeamsStillPlaying();
    let teamId = teams.map((team) => {
      return team.id;
    });

    const batch = writeBatch(this.db);
    const baseRef = `classrooms/${classroomRef}/games`;
    teamId.forEach((id) => {
      const ref = doc(this.db, baseRef, id);
      batch.update(ref, { gameStatus: 'gameOver' });
    });
    return batch.commit().catch((err) => {
      console.log(err);
    });
  }

  private getTeamsStillPlaying() {
    const teams = this.teams$.getValue();
    const teamsStillPlaying = teams.filter(
      (team) => team.gameStatus !== 'timeUp'
    );
    return teamsStillPlaying;
  }
}
