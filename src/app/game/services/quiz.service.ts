import { Injectable, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { GameDataAccessService } from './game-data-access.service';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { Quiz } from 'src/app/shared/modals/quiz';
import { Story } from 'src/app/shared/modals/story';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { QuizItem } from 'src/app/shared/modals/quiz-item';
import { GameService } from './game.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { increment } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private stories = signal<Story[]>([]);
  private quizFormSubject = new BehaviorSubject<FormArray | null>(null);
  private quizIndexSubject = new BehaviorSubject<number>(0);
  public quizForm$ = this.quizFormSubject.asObservable();
  public quizIndex$ = this.quizIndexSubject.asObservable();

  constructor(
    private dataAccess: GameDataAccessService,
    private fb: FormBuilder,
    private game: GameService,
    private auth: AuthService
  ) {}

  //called from resolver
  public isQuizReady(classroomId: string): Observable<boolean> {
    const quiz = this.getQuizObservable(classroomId);
    return quiz.pipe(
      tap((quiz) => {
        if (!quiz) throw new Error('Quiz not found');
        localStorage.setItem('quiz', JSON.stringify({ [classroomId]: quiz }));
        this.stories.set(quiz.stories);
        this.quizFormSubject.next(this.makeFormArray(quiz.items));
      }),
      map((quiz) => {
        return !!quiz;
      })
    );
  }

  public incrementQuizIndex() {
    let length = this.quizFormSubject.getValue()?.controls.length;
    let index = this.quizIndexSubject.getValue();
    if (length && index < length - 1) {
      this.quizIndexSubject.next(index + 1);
    }
  }

  public decrementQuizIndex() {
    let index = this.quizIndexSubject.getValue();
    if (index > 0) {
      this.quizIndexSubject.next(this.quizIndexSubject.getValue() - 1);
    }
  }

  public getMyStory() {
    const myIndex = this.getMyIndex();
    return this.stories()[myIndex];
  }

  private getMyIndex() {
    const members = this.game.members();
    if (!members.length) throw new Error('Members not found');
    const displayName = this.auth.user().displayName;
    if (!displayName) throw new Error('Display name not found');
    let myIndex = members.indexOf(displayName);
    if (myIndex === -1) throw new Error('User not found in game');
    return myIndex;
  }

  private getQuizObservable(classroomId: string): Observable<Quiz> {
    let localQuiz = this.getQuizFromLocalStorage(classroomId);
    if (localQuiz) return of(localQuiz);
    else {
      return this.dataAccess.fetchQuizData(classroomId);
    }
  }

  private getQuizFromLocalStorage(classroomId: string) {
    let rawQuiz = localStorage.getItem('quiz');
    let quiz: Quiz | null = null;
    if (rawQuiz) {
      let parsed = JSON.parse(rawQuiz);
      let quiz = parsed[classroomId];
      if (quiz) {
        quiz = quiz as Quiz;
      } else {
        localStorage.removeItem('quiz');
      }
    }
    return quiz;
  }

  private makeFormArray(items: QuizItem[]): FormArray {
    const formArray = this.fb.array([]);
    //for each choice set array to false;
    items.forEach((item, index) => {
      let choiceArray: any[] = [];
      item.choices.forEach((choice) => {
        choiceArray.push(
          this.fb.group({
            text: choice,
            value: new FormControl(false),
          })
        );
      });
      let group = this.fb.group({
        question: [item.question],
        choices: new FormArray(choiceArray, this.answerValid()),
        answers: [item.answers],
      }) as any;

      formArray.push(group);
    });
    return formArray as unknown as FormArray<FormGroup<{}>>;
  }

  private answerValid(): ValidatorFn {
    return function validate(formArray: AbstractControl) {
      if (!(formArray instanceof FormArray))
        throw new Error('Not a form array');
      let totalChecked = 0;
      for (const control of formArray.controls) {
        if (control instanceof FormGroup) {
          const valueControl = control.get('value');
          if (valueControl && valueControl.value) {
            totalChecked++;
          }
        }
      }
      if (totalChecked === 0) {
        return { noChecked: true };
      }
      return null;
    };
  }
}
