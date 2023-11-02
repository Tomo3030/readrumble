import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-current-question-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    class="mt-1 flex min-h-[25px]  items-center justify-around overflow-hidden"
  >
    <div *ngFor="let a of (answerForm$ | async)?.controls; let i = index">
      <div [ngClass]="getIndicatorClass(i, a.valid)">
        <!-- indicator content class must be fetched to trigger animation -->
        <div [ngClass]="getIndicatorContentClass(i)">
          {{ questionIndex + 1 }}
        </div>
      </div>
    </div>
  </div>`,
  styles: [],
})
export class CurrentQuestionIndicatorComponent implements OnDestroy {
  public answerForm$ = this.quizService.quizForm$;
  public questionIndex$ = this.quizService.quizIndex$;
  public questionIndex = 0;
  private sub;
  constructor(private quizService: QuizService) {
    this.sub = this.questionIndex$.subscribe((i) => {
      this.questionIndex = i;
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  public getIndicatorClass(i: number, valid: boolean) {
    if (i === this.questionIndex) {
      return 'h-6 w-6 flex justify-center items-center rounded bg-accent-yellow transition-all duration-300 ';
    }
    if (valid) return 'h-1 w-6 rounded bg-accent-green origin-center ';
    return 'h-1 w-6 rounded bg-[#cccccc] origin-center ';
  }

  public getIndicatorContentClass(i: number) {
    if (i !== this.questionIndex) return 'text-[0px]';
    return 'text-center text-card-text text-xs  font-bold transition-all duration-200 ';
  }
}
