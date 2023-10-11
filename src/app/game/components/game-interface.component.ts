import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Story } from 'src/app/shared/modals/story';
import { Observable } from 'rxjs';
import { FormArray, FormGroup } from '@angular/forms';
import { StoryCardComponent } from './story-card.component';
import { QuestionCardComponent } from './question-card.component';
import { ButtonClustorComponent } from './button-clustor.component';
import { ActionBarComponent } from './action-bar.component';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-game-interface',
  standalone: true,
  template: `
    <div *ngIf="quizForm | async as form" class="relative h-full">
      <div class="m-4 flex gap-4 flex-col">
        <app-story-card [story]="story"></app-story-card>
        <app-question-card></app-question-card>
      </div>
      <app-action-bar class="fixed bottom-0 w-full bg-card"></app-action-bar>
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
  constructor() {}
  @Input() story: Story;
  @Input() quizForm: Observable<FormArray<FormGroup>>;
}
