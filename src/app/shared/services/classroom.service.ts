import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  constructor(private fb: Firestore) {}

  setDocumentId(classroomId: number | string, documentId: string) {
    const id = classroomId.toString();
    const documentRef = { classroomId: id, documentId: documentId };
    localStorage.setItem('classroomId', JSON.stringify(documentRef));
  }

  async getDocumentId(classroomId: number | string): Promise<string> {
    //for local storage  classroomId needs to be a string
    classroomId = classroomId.toString();
    const localStorageItem = JSON.parse(
      localStorage.getItem('classroomId') || '{}'
    );
    if (localStorageItem.classroomId === classroomId) {
      return Promise.resolve(localStorageItem.documentId);
    }
    const classroomCollection = collection(this.fb, 'classrooms');

    //for query classroomId needs to be a number
    classroomId = parseInt(classroomId);
    const q = query(
      classroomCollection,
      where('id', '==', classroomId),
      orderBy('timestamp'),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const documentId = querySnapshot.docs[0].id;
      this.setDocumentId(classroomId, documentId);
      return documentId;
    } else {
      throw new Error('No document found');
    }
  }
}
