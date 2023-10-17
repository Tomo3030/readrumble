import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Story } from 'src/app/shared/modals/story';
import { Observable, take } from 'rxjs';
import { FormArray, FormGroup } from '@angular/forms';
import { StoryCardComponent } from './story-card.component';
import { QuestionCardComponent } from './question-card.component';
import { ButtonClustorComponent } from './button-clustor.component';
import { ActionBarComponent } from './action-bar.component';
import { QuizService } from '../services/quiz.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-interface',
  standalone: true,
  template: `
    <div *ngIf="quizForm | async as form" class="relative h-full">
      <div class="m-4 flex gap-4 flex-col">
        <app-story-card [story]="story"></app-story-card>
        <app-question-card></app-question-card>
      </div>
      <app-action-bar
        class="fixed bottom-0 w-full bg-card"
        (onSubmitQuiz)="submitQuiz()"
      ></app-action-bar>
    </div>
  `,
  styles: [],
  imports: [
    CommonModule,
    StoryCardComponent,
    QuestionCardComponent,
    ButtonClustorComponent,
    ActionBarComponent,
  ],
})
export class GameInterfaceComponent {
  constructor(private quizService: QuizService) {}
  @Input() story: Story;
  @Input() quizForm: Observable<FormArray<FormGroup>>;

  submitQuiz() {
    let correctedQuiz: boolean[] = [];
    this.quizForm.pipe(take(1)).subscribe((quizForm) => {
      correctedQuiz = this.quizService.correctQuiz(quizForm);
    });
    console.log(correctedQuiz);
  }
}
