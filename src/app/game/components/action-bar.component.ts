import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentQuestionIndicatorComponent } from './current-question-indicator.component';
import { ButtonClustorComponent } from './button-clustor.component';

import { AnswerSubmittedComponent } from '../../admin/components/answer-submitted.component';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-action-bar',
  standalone: true,
  template: `
    <div>
      <app-current-question-indicator></app-current-question-indicator>
      <app-button-clustor (submitQuiz)="onSubmit()"></app-button-clustor>
      <app-answer-submitted
        *ngIf="submited()"
        (expanded)="onExpanded()"
      ></app-answer-submitted>
    </div>
  `,
  styles: [],
  imports: [
    CommonModule,
    CurrentQuestionIndicatorComponent,
    ButtonClustorComponent,
    AnswerSubmittedComponent,
  ],
})
export class ActionBarComponent {
  @Output() onSubmitQuiz = new EventEmitter();
  @Output() expanded = new EventEmitter();

  submited = this.game.answerSubmitted;
  constructor(private game: GameService) {}
  onSubmit() {
    this.onSubmitQuiz.emit();
  }

  onExpanded() {
    this.expanded.emit();
  }
}
