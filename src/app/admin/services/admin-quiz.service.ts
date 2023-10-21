import { Injectable, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { first, map } from 'rxjs';
import { Quiz } from 'src/app/shared/modals/quiz';
import { QuizItem } from 'src/app/shared/modals/quiz-item';
import { Story } from 'src/app/shared/modals/story';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private fb: Firestore, private spinner: SpinnerService) {}

  public quizSignal = signal({
    id: '',
    category: '',
    stories: [] as Story[],
    items: [] as QuizItem[],
  });

  public canEdit = signal(false);
  public hasBeenEdited = signal(false);

  public getQuizes() {
    let ref = doc(this.fb, 'quizList', 'list');
    return docData(ref).pipe(
      map((data) => {
        const keyValueArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          name: value,
        }));
        return keyValueArray;
      })
    );
  }

  public selectQuiz(id: string) {
    this.spinner.show();
    let ref = doc(this.fb, 'quizzes', id.toString());
    docData(ref)
      .pipe(first())
      .subscribe((quiz: any) => {
        let q = {
          id: quiz.id,
          category: quiz.category,
          stories: quiz.stories,
          items: quiz.items,
        };
        this.quizSignal.update(() => q);
        this.spinner.hide();
      });
  }

  public createNewQuiz() {
    this.toggleEdit();
    let quiz = {
      id: '',
      category: '',
      stories: [] as Story[],
      items: [] as QuizItem[],
    };
    this.quizSignal.update(() => quiz);
  }

  async startGame(): Promise<number> {
    const quiz = this.quizSignal() as Quiz;
    const id = Math.floor(Math.random() * 900000) + 100000;
    const ref = collection(this.fb, 'classrooms');
    await addDoc(ref, {
      id: id,
      timestamp: serverTimestamp(),
      stories: quiz.stories,
      items: quiz.items,
      category: quiz.category,
    })
      .then((doc) => {
        console.log(doc.id);

        localStorage.setItem('classroomId', JSON.stringify({ id: doc.id }));
      })
      .catch((err) => {
        console.log(err);
      });
    return id;
  }

  public saveQuiz() {
    let quiz = this.quizSignal();
    let ref = collection(this.fb, 'quizzes');
    addDoc(ref, quiz);
  }

  public toggleEdit() {
    this.canEdit.set(!this.canEdit());
  }

  public editAnswers(questionIndex: number, answerToToggle: string) {
    //it take in a question index and an answer to toggle
    // quiz.items[questionIndex].answers // this is an array of answers
    // see if the answerToToggle is in the array
    // if it is, remove it
    // if it isn't, add it
    // then update the quiz
    this.hasBeenEdited.update(() => true);
    let item = this.quizSignal().items[questionIndex];
    let answers = item.answers;
    let index = answers.indexOf(answerToToggle);
    if (index === -1) answers.push(answerToToggle);
    else answers.splice(index, 1);
    item.answers = answers;
    let items = this.quizSignal().items;
    items[questionIndex] = item;
    this.quizSignal.update((quiz) => ({
      ...quiz,
      items: items,
    }));
  }

  public addStory(story: Story) {
    this.hasBeenEdited.update(() => true);
    let stories = this.quizSignal().stories;
    stories.push(story);
    this.updateAnswerChoices();
    this.quizSignal.update((quiz) => ({
      ...quiz,
      stories: stories,
    }));
  }

  public saveStoryEdit(story: Story, index: number) {
    this.hasBeenEdited.update(() => true);
    let stories = this.quizSignal().stories;
    stories[index] = story;
    this.updateAnswerChoices();
    this.quizSignal.update((quiz) => ({
      ...quiz,
      stories: stories,
    }));
  }

  public deleteStory(index: number) {
    this.hasBeenEdited.update(() => true);
    let stories = this.quizSignal().stories;
    stories.splice(index, 1);
    this.updateAnswerChoices();
    this.quizSignal.update((quiz) => ({
      ...quiz,
      stories: stories,
    }));
  }

  private updateAnswerChoices() {
    this.hasBeenEdited.update(() => true);
    let choices = this.quizSignal().stories.map((story) => story.title);
    let items = this.quizSignal().items;
    items.forEach((item) => (item.choices = choices));
    this.quizSignal.update((quiz) => ({
      ...quiz,
      items: items,
    }));
  }

  public addQuestion(question: string) {
    this.hasBeenEdited.update(() => true);
    let answers: string[] = [];
    let choices = this.quizSignal().stories.map((story) => story.title);
    let item = {
      question: question,
      answers: answers,
      choices: choices,
    } as QuizItem;
    let items = this.quizSignal().items;
    items.push(item);
    this.quizSignal.update((quiz) => ({
      ...quiz,
      items: items,
    }));
  }

  public editQuestionText(index: number, question: string) {
    this.hasBeenEdited.update(() => true);
    let items = this.quizSignal().items;
    items[index].question = question;
    this.quizSignal.update((quiz) => ({
      ...quiz,
      items: items,
    }));
  }

  public deleteQuestion(index: number) {
    this.hasBeenEdited.update(() => true);
    let items = this.quizSignal().items;
    items.splice(index, 1);
    this.quizSignal.update((quiz) => ({
      ...quiz,
      items: items,
    }));
  }
}
