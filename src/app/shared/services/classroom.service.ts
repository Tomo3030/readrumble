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

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  constructor(private fb: Firestore) {}

  private classroomRef = {};

  getClassroomRef(classroomId: string): string {
    const ref = this.classroomRef[classroomId];
    if (!ref) new Error('No classroom ref found');
    return ref;
  }

  setClassroomRef(classroomId: string, classroomRef: string) {
    this.classroomRef = { [classroomId]: classroomRef };
  }

  public async checkIfClassroomExists(classroomId: string): Promise<boolean> {
    const classroomCollection = collection(this.fb, 'classrooms');
    const q = query(
      classroomCollection,
      where('id', '==', classroomId),
      orderBy('timestamp'),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return false;
    const documentId = querySnapshot.docs[0].id;
    this.setClassroomRef(classroomId, documentId);
    this.setClassroomRefInLocalStorage(classroomId, documentId);
    this.storeQuizInLocalStorage(classroomId, querySnapshot.docs[0].data());
    return true;
  }

  private setClassroomRefInLocalStorage(
    classroomId: number | string,
    documentId: string
  ) {
    const id = classroomId.toString();
    const documentRef = { classroomId: id, classroomRef: documentId };
    localStorage.setItem('classroomId', JSON.stringify(documentRef));
  }

  private storeQuizInLocalStorage(classroomId: string, quiz: any) {
    localStorage.setItem('quiz', JSON.stringify({ [classroomId]: quiz }));
  }
}
