import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing/pages/classroom-id-page.component').then(
        (m) => m.ClassroomIdPageComponent
      ),
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./landing/pages/sign-in.component').then(
        (m) => m.SignInComponent
      ),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./landing/pages/sign-up.component').then(
        (m) => m.SignUpComponent
      ),
  },
  {
    path: 'classroom/:classroomId',
    loadComponent: () =>
      import('./landing/pages/enter-name-page.component').then(
        (m) => m.EnterNamePageComponent
      ),
  },
  {
    path: 'classroom/:classroomId/join',
    loadComponent: () =>
      import('./landing/pages/join-team.component').then(
        (m) => m.JoinTeamComponent
      ),
  },
];
