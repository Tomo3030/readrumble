import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonDirective } from 'src/app/shared/directives/icon-button.directive';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { RippleDirective } from 'src/app/shared/directives/ripple.directive';
import { QuizService } from '../services/quiz.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-button-clustor',
  standalone: true,
  imports: [
    CommonModule,
    IconButtonDirective,
    ButtonDirective,
    RippleDirective,
  ],
  template: ` <div class="m-2 mb-3  mt-4 flex h-12  gap-4 justify-between">
    <button
      (click)="prev()"
      class="pb-1 transition-transform focus:rounded-md focus:ring-1 focus:ring-accent-green/40  focus:ring-offset-1 active:scale-[.95] active:bg-accent-green/30"
    >
      <span
        class="material-icons flex  w-20 flex-col items-center text-accent-green"
        >arrow_back</span
      >
    </button>

    <button
      [disabled]="!(valid$ | async)"
      appButton
      appRipple
      class="bg-primary"
    >
      submit
    </button>

    <button
      (click)="next()"
      class="pb-1 transition-transform focus:rounded-md focus:ring-1 focus:ring-accent-green/40  focus:ring-offset-1 active:scale-[.95] active:bg-accent-green/30"
    >
      <span
        class="material-icons flex  w-20 flex-col items-center text-accent-green"
        >arrow_forward</span
      >
    </button>
  </div>`,
  styles: [],
})
export class ButtonClustorComponent {
  constructor(private quizService: QuizService) {}

  valid$ = this.quizService.quizForm$.pipe(
    switchMap((form) => {
      return form!.statusChanges.pipe(map((x) => x === 'VALID'));
    })
  );

  public next() {
    this.quizService.incrementQuizIndex();
  }

  public prev() {
    this.quizService.decrementQuizIndex();
  }
}
