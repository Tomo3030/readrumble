import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { QuizService } from 'src/app/game/services/quiz.service';

export const quizResolver: ResolveFn<boolean> = (route, state) => {
  const classroomId = route.paramMap.get('classroomId');
  if (!classroomId) throw new Error('Route data not available');
  console.log('jkkk');
  const quizService = inject(QuizService);
  return quizService.isQuizReady(classroomId);
};
