import { Component, OnDestroy, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameDataAccessService } from '../services/game-data-access.service';
import { ActivatedRoute } from '@angular/router';
import { WaitingToStartComponent } from '../components/waiting-to-start.component';
import { GameInterfaceComponent } from '../components/game-interface.component';
import { ScoreComponent } from '../components/score.component';
import { GameService } from '../services/game.service';
import { QuizService } from '../services/quiz.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-page',
  standalone: true,
  template: `
    <app-waiting-to-start
      *ngIf="gameStatus() === 'waitingToStart'"
    ></app-waiting-to-start>
    <app-game-interface
      *ngIf="gameStatus() === 'playing'"
      [quizForm]="quizForm"
      [story]="story"
    ></app-game-interface>
    <app-score *ngIf="gameStatus() === 'gameOver'"></app-score>
    <div>{{ game() }}</div>
  `,
  styles: [],
  imports: [
    CommonModule,
    WaitingToStartComponent,
    GameInterfaceComponent,
    ScoreComponent,
  ],
})
export class GamePageComponent implements OnDestroy {
  public gameStatus: Signal<string> = this.gameSerice.status;
  public story;
  public quizForm;
  private sub: any;

  public game = this.gameSerice.gameState;

  constructor(
    private dataAccess: GameDataAccessService,
    private activatedRoute: ActivatedRoute,
    private gameSerice: GameService,
    private quizService: QuizService
  ) {
    const classroomId =
      this.activatedRoute.snapshot.paramMap.get('classroomId');
    const gameId = this.activatedRoute.snapshot.paramMap.get('gameId');
    this.sub = this.dataAccess
      .initGameDataAccess(classroomId, gameId)
      .subscribe((data) => {
        console.log(data);
        this.story = this.quizService.getMyStory();
        this.quizForm = this.quizService.quizForm$;
      });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
