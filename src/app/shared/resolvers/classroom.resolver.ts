import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { ClassroomService } from '../services/classroom.service';
import { ToastService } from '../services/toast.service';

export const classroomResolver: ResolveFn<boolean> = async (route, state) => {
  const classroomId = route.paramMap.get('classroomId');
  const classroomService = inject(ClassroomService);
  const router = inject(Router);
  const toast = inject(ToastService);
  if (!classroomId) throw new Error('Route data not available');
  let classroom = await classroomService.resolveClassroom(classroomId);
  console.log(classroom);
  if (classroom) return true;
  else {
    router.navigate(['/']);
    toast.open('Route Does Not Exist');
    return null;
  }
};
