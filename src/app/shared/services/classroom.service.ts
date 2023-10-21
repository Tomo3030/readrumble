import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { doc, getDoc, where } from 'firebase/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { QuizService } from 'src/app/game/services/quiz.service';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  constructor(private fb: Firestore, private quizService: QuizService) {}

  private classroomRef = {};

  public getClassroomRef(classroomId: string): string {
    let ref = this.classroomRef[classroomId];
    if (!ref) ref = this.getClassroomFromLocalStorage(classroomId);
    if (!ref) throw new Error('No classroom ref found');
    return ref;
  }

  public setClassroomRef(classroomId: string, classroomRef: string) {
    this.classroomRef = { [classroomId]: classroomRef };
  }

  public resolveClassroom(classroomId: string): Promise<boolean> {
    const ref = this.getClassroomFromLocalStorage(classroomId);
    if (ref) {
      this.quizService.setQuiz(ref.quiz);
      this.setClassroomRef(classroomId, ref.classroomRef);
      return Promise.resolve(true);
    }
    return this.checkIfClassroomExists(classroomId);
  }

  public async checkIfClassroomExists(classroomId: string): Promise<boolean> {
    const classroomCollection = collection(this.fb, 'classrooms');
    //for query id needs to be a number
    const id = parseInt(classroomId);
    const q = query(
      classroomCollection,
      where('id', '==', id),
      orderBy('timestamp'),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return false;
    const document = querySnapshot.docs[0];
    const classroomRef = document.id;
    const quiz = document.data() as any;
    const classroom = { classroomId, classroomRef, quiz };
    this.storeDocData(classroom);
    this.setClassroomRef(classroomId, classroomRef);
    this.quizService.setQuiz(quiz);
    return true;
  }

  getClassroomFromLocalStorage(classroomId): any {
    let ref = JSON.parse(localStorage.getItem('classroom') || '{}');
    if (!ref) return false;
    if (ref.classroomId !== classroomId) return false;
    return ref;
  }

  private storeDocData(data: {
    classroomId: string;
    classroomRef: string;
    quiz: any;
  }) {
    localStorage.setItem('classroom', JSON.stringify(data));
  }
}
