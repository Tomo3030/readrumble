import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusCardComponent } from '../components/status-card.component';
import { TeamService } from 'src/app/shared/services/team.service';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  of,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { Team } from 'src/app/shared/modals/team';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { RippleDirective } from 'src/app/shared/directives/ripple.directive';
import { StatusService } from '../services/status.service';
import { Game } from 'src/app/shared/modals/game';

@Component({
  selector: 'app-game-status',
  standalone: true,
  template: `
    <div class="relative h-full">
      <div class="m-auto flex w-[700px] flex-col gap-4 pt-4">
        <app-status-card
          *ngFor="
            let data of gameData$ | async;
            let i = index;
            trackBy: trackByFn
          "
          [ngStyle]="getTranslateValue(i)"
          [gameData]="data"
          class="transition-all duration-500 ease-in-out"
        ></app-status-card>
      </div>
      <div class="absolute bottom-5 right-5">
        <button
          (click)="endGame()"
          [disabled]="buttonDisabled"
          *ngIf="status.showEndGame$ | async"
          appButton
          appRipple
          class="bg-accent-green max-w-[300px] min-h-[80px] shadow-xl "
        >
          End Game
        </button>
        <button
          (click)="showScore()"
          *ngIf="status.showScoreButton$ | async"
          appButton
          appRipple
          class="bg-accent-green max-w-[300px] min-h-[80px] shadow-xl"
        >
          Show Scores
        </button>
      </div>
    </div>
  `,
  styles: [],
  imports: [
    CommonModule,
    StatusCardComponent,
    ButtonDirective,
    RippleDirective,
  ],
})
export class GameStatusComponent {
  public gameData$: Observable<Game[]>;
  public buttonDisabled = false;
  private stack = this.status.stack;
  private _cardHeight = 144; //px
  private _cardMargin = 16; //px
  private classroomId = this.route.snapshot.paramMap.get('classroomId');

  constructor(private route: ActivatedRoute, public status: StatusService) {
    this.gameData$ = this.status.getGameData(this.classroomId);
  }

  public endGame() {
    console.log('make all game status game over');
    this.buttonDisabled = true;
    this.status.endGame(this.classroomId);
  }

  public showScore() {
    this.status.showScore();
  }

  public trackByFn(index: number, item: any) {
    return item.id;
  }

  public getTranslateValue(index: number) {
    if (!this.stack()) return {};
    let translateValue = index * (this._cardHeight + this._cardMargin);
    `translateY(${translateValue}px)`;
    return { transform: `translateY(-${translateValue}px)` };
  }
}
