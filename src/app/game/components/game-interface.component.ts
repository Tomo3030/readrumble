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
import { GameDataAccessService } from '../services/game-data-access.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-interface',
  standalone: true,
  template: `
    <div
      *ngIf="quizForm | async as form"
      class="relative h-full  max-w-2xl  m-auto flex  flex-col"
    >
      <div class="m-4  flex gap-4 flex-col ">
        <app-story-card [story]="story"></app-story-card>
        <app-question-card></app-question-card>
      </div>
      <div class="grow md:grow-0"></div>
      <div class="md:m-4 bg-card md:rounded-md">
        <app-action-bar (onSubmitQuiz)="submitQuiz()"></app-action-bar>
      </div>
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
  constructor(
    private quizService: QuizService,
    private data: GameDataAccessService,
    private route: ActivatedRoute
  ) {}
  @Input() story: Story;
  @Input() quizForm: Observable<FormArray<FormGroup>>;

  submitQuiz() {
    this.quizForm.pipe(take(1)).subscribe((quizForm) => {
      const correctedQuiz = this.quizService.correctQuiz();
      const classroomId = this.route.snapshot.paramMap.get('classroomId');
      this.data.postQuizResults(classroomId, correctedQuiz);
    });
  }
}
