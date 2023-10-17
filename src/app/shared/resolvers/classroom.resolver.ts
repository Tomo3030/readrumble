import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import {
  Firestore,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { ClassroomService } from '../services/classroom.service';
import { QuizService } from 'src/app/game/services/quiz.service';
import { Quiz } from '../modals/quiz';

export const classroomResolver: ResolveFn<boolean> = (route, state) => {
  //takes classroomId from route and checks if it exists in firestore or localstorage
  //if it exists store the quiz in quizService && set the classroomRef in classroomService
  //else throw an error
  const classroomId = route.paramMap.get('classroomId');
  const fb = inject(Firestore);
  const classroomService = inject(ClassroomService);
  const quizService = inject(QuizService);

  if (!classroomId) throw new Error('Route data not available');

  const classroomRef = getClassroomRefFromStorage(classroomId);
  if (classroomRef)
    classroomService.setClassroomRef(classroomId, classroomRef.classroomRef);
  const quiz = getQuizFromStorage(classroomId);
  if (quiz) quizService.setQuiz(quiz);

  if (classroomRef && quiz) return true;

  const classroomCollection = collection(fb, 'classrooms');

  //for query classroomId needs to be a number
  const q = query(
    classroomCollection,
    where('id', '==', classroomId),
    orderBy('timestamp'),
    limit(1)
  );

  return getDocs(q).then((querySnapshot) => {
    if (!querySnapshot.empty) {
      const document = querySnapshot.docs[0];
      classroomService.setClassroomRef(classroomId, document.id);
      quizService.setQuiz(document.data() as Quiz);
      return !!document.id;
    } else {
      throw new Error('No document found');
    }
  });
};
//helper functions
function getClassroomRefFromStorage(classroomId: String) {
  const ref = JSON.parse(localStorage.getItem('classroomId') || '{}');
  return ref;
}

function getQuizFromStorage(classroomId) {
  const rawQuiz = localStorage.getItem('quiz');
  if (!rawQuiz) return false;
  const parsed = JSON.parse(rawQuiz);
  const quiz = parsed[classroomId];
  if (Object.keys(quiz).length === 0) return null;
  return quiz;
}
