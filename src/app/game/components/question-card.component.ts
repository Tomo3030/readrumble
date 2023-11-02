import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card.component';
import { switchMap, tap } from 'rxjs';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-question-card',
  standalone: true,
  template: `
    <div>
      <app-card>
        <div content>
          <div class=" font-display text-2xl">
            Question {{ questionIndex + 1 }}
          </div>
          <div
            class=" from-primary-light to-yellow h-1 rounded bg-gradient-to-r mb-4"
          ></div>
          <div class=" mt-4 text-lg font-semibold">
            {{ question }}
          </div>
          <div class=" mt-4 ">
            <ng-container
              *ngFor="let form of formArray.controls; let i = index"
            >
              <div class=" mt-4 ">
                <label class="flex  justify-items-center">
                  <input
                    [formControl]="getControl(i)"
                    type="checkbox"
                    name="answer"
                    class="mr-3 h-6 w-6 rounded bg-card shadow-sm transition-transform active:scale-[.90] accent-primary"
                  />
                  {{ form.get('text')?.value }}
                </label>
              </div>
            </ng-container>
          </div>
        </div>
      </app-card>
    </div>
  `,
  styles: [],
  imports: [CommonModule, CardComponent, ReactiveFormsModule],
})
export class QuestionCardComponent implements OnInit, OnDestroy {
  constructor(public quizService: QuizService) {}
  public questionIndex: number = 0;
  public question: string;
  public formArray: FormArray<FormGroup>;
  private formGroup: FormGroup;
  private sub;

  ngOnInit(): void {
    const form$ = this.quizService.quizForm$;
    const index$ = this.quizService.quizIndex$;
    this.sub = index$
      .pipe(
        tap((index) => {
          this.questionIndex = index;
        }),
        switchMap(() => {
          return form$;
        })
      )
      .subscribe((form) => {
        //here is where we set the formGroup based on the index
        this.formGroup = form.controls[this.questionIndex] as FormGroup;
        this.onQuestionChange();
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getControl(i: number): FormControl {
    let control = this.formArray.controls[i].get('value') as FormControl;
    if (!control) throw new Error('No control found');
    return control;
  }

  private onQuestionChange() {
    this.question = this.formGroup.get('question')?.value;
    this.formArray = this.formGroup.get('choices') as FormArray<FormGroup>;
  }
}

//class="mr-3 h-6 w-6 rounded border-accent-green  bg-card text-primary shadow-sm transition-transform focus:ring-1 focus:ring-primary focus:ring-opacity-50 focus:ring-offset-0 active:scale-[.90] accent-primary"
