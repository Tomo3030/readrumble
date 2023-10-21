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

export const classroomResolver: ResolveFn<boolean> = (route, state) => {
  const classroomId = route.paramMap.get('classroomId');
  const classroomService = inject(ClassroomService);

  if (!classroomId) throw new Error('Route data not available');
  return classroomService.resolveClassroom(classroomId);
};
