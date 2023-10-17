import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  of,
  switchMap,
  timer,
} from 'rxjs';
import { TeamService } from 'src/app/shared/services/team.service';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  public stack = false;
  private showSkeleton$ = new BehaviorSubject<boolean>(false);
  private scoreControl$ = new BehaviorSubject<boolean>(false);
  private scoreInterval$ = this.scoreControl$.pipe(
    switchMap((x) => (x ? timer(0, 2000) : of(null)))
  );
  private teams$ = new BehaviorSubject<any>([]);
  constructor(private teamService: TeamService) {}

  getStatusData(classroomId: string) {
    return combineLatest([
      this.teamService.getClassroomTeams(classroomId) as Observable<any>,
      this.showSkeleton$,
      this.scoreInterval$,
    ]).pipe(
      map(([scoreData, showSkeleton, scoreInterval]) => {
        let data = [...scoreData];
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
        return data;
      })
    );
  }

  public showScore() {
    this.showSkeleton$.next(true);
    this.stack = !this.stack;
    setTimeout(() => {
      this.stack = !this.stack;
      this.showSkeleton$.next(false);
      this.scoreControl$.next(true);
    }, 2000);
  }

  public skeleton() {
    this.showSkeleton$.next(true);
    this.stack = !this.stack;
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
}
