import { Injectable, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { first, map } from 'rxjs';
import { Quiz } from 'src/app/shared/modals/quiz';
import { QuizItem } from 'src/app/shared/modals/quiz-item';
import { Story } from 'src/app/shared/modals/story';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private fb: Firestore,
    private spinner: SpinnerService,
    private toast: ToastService
  ) {}
  public canEdit = signal(false);
  public hasBeenEdited = signal(false);
  public quizSignal = signal({
    id: '',
    category: '',
    stories: [] as Story[],
    items: [] as QuizItem[],
  });
  private initialCategoryValue = '';
  private currentQuizId = '';

  public getQuizList() {
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
    this.currentQuizId = id;
    this.canEdit.set(false);
    this.hasBeenEdited.set(false);
    let ref = doc(this.fb, 'quizzes', id);
    docData(ref)
      .pipe(first())
      .subscribe((quiz: any) => {
        let q = {
          id: quiz.id,
          category: quiz.category,
          stories: quiz.stories,
          items: quiz.items,
        };

        this.initialCategoryValue = quiz.category;
        this.quizSignal.update(() => q);
        this.spinner.hide();
      });
  }

  public createNewQuiz() {
    this.currentQuizId = '';
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

  public async saveQuiz() {
    const quiz = this.quizSignal();
    const category = quiz.category;
    const stories = quiz.stories.length;
    const items = quiz.items.length;
    console.log(category, stories, items);
    if (!category || !stories || !items)
      return this.toast.open('Please fill out all fields');
    console.log('lll');
    this.hasBeenEdited.update(() => false);
    this.canEdit.set(false);
    const isNewQuiz = this.currentQuizId === '';
    //isNewQuiz ? this.saveNewQuiz(quiz) : this.saveEditedQuiz(quiz);
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

  public editCategory(category: string) {
    this.hasBeenEdited.update(() => true);
    this.quizSignal.update((quiz) => ({
      ...quiz,
      category: category,
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
    console.log('edit question text');
    this.hasBeenEdited.update(() => true);
    let items = this.quizSignal().items;
    items[index].question = question;
    this.quizSignal.update((quiz) => ({
      ...quiz,
      items: items,
    }));
  }

  public deleteQuestion(index: number) {
    console.log('delete question');
    this.hasBeenEdited.update(() => true);
    let items = this.quizSignal().items;
    items.splice(index, 1);
    this.quizSignal.update((quiz) => ({
      ...quiz,
      items: items,
    }));
  }

  private async saveNewQuiz(quiz: Quiz) {
    const ref = collection(this.fb, 'quizzes');
    const document = await addDoc(ref, quiz);
    return this.updateQuizList(document.id, quiz.category);
  }

  private saveEditedQuiz(quiz: Quiz) {
    let quizRef = this.currentQuizId;
    if (!quizRef) throw new Error('No quiz id found');
    const categoryNameChange =
      this.quizSignal().category !== this.initialCategoryValue;
    const ref = doc(this.fb, 'quizzes', quizRef);
    setDoc(ref, quiz);
    if (categoryNameChange) return this.updateQuizList(quizRef, quiz.category);
    return Promise.resolve();
  }

  private updateQuizList(docId: string, category: string) {
    let quizListRef = doc(this.fb, 'quizList', 'list');
    return setDoc(quizListRef, { [docId]: category }, { merge: true });
  }
}
