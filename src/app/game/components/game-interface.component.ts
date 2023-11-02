import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Story } from 'src/app/shared/modals/story';
import { Observable, take } from 'rxjs';
import { FormArray, FormGroup } from '@angular/forms';
import { StoryCardComponent } from './story-card.component';
import { QuestionCardComponent } from './question-card.component';
import { ButtonClustorComponent } from './button-clustor.component';
import { ActionBarComponent } from './action-bar.component';
import { QuizService } from '../services/quiz.service';
import { GameDataAccessService } from '../services/game-data-access.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-interface',
  standalone: true,
  template: `
    <div
      *ngIf="quizForm | async as form"
      [style.paddingBottom.px]="actionBarHeight"
      class="relative  max-w-2xl  m-4 flex gap-4  flex-col overflow-y-auto md:m-auto md:mt-4"
    >
      <app-story-card [story]="story"></app-story-card>
      <app-question-card></app-question-card>
    </div>
    <div
      #actionBar
      class="fixed bottom-0 left-0 w-full  bg-card  md:relative md:bottom-auto md:right-auto  md:m-auto md:mt-4 md:max-w-2xl md:rounded-md md:p-4"
    >
      <app-action-bar
        (onSubmitQuiz)="submitQuiz()"
        (expanded)="setActionBarHeight()"
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
export class GameInterfaceComponent implements AfterViewInit {
  constructor(
    private quizService: QuizService,
    private data: GameDataAccessService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    this.setActionBarHeight();
  }
  @Input() story: Story;
  @Input() quizForm: Observable<FormArray<FormGroup>>;
  @ViewChild('actionBar') actionBar: ElementRef;
  windowSize: number = window.innerWidth;
  public actionBarHeight: number = 0;

  submitQuiz() {
    this.quizForm.pipe(take(1)).subscribe((quizForm) => {
      const correctedQuiz = this.quizService.correctQuiz();
      const classroomId = this.route.snapshot.paramMap.get('classroomId');
      this.data.postQuizResults(classroomId, correctedQuiz);
    });
  }

  public setActionBarHeight() {
    if (this.windowSize > 768) return;
    this.actionBarHeight = this.actionBar
      ? this.actionBar.nativeElement.offsetHeight + 10
      : 0;
    this.cdr.detectChanges();
  }
}
