import { Routes } from '@angular/router';
import { quizResolver } from './shared/resolvers/quiz.resolver';

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
    resolve: { quiz: quizResolver },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./landing/pages/enter-name-page.component').then(
            (m) => m.EnterNamePageComponent
          ),
      },
      {
        path: 'join',
        loadComponent: () =>
          import('./landing/pages/join-team.component').then(
            (m) => m.JoinTeamComponent
          ),
      },
      {
        path: 'game/:gameId',
        loadComponent: () =>
          import('./game/pages/game-page.component').then(
            (m) => m.GamePageComponent
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./admin/pages/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'dashboard/:classroomId',
    loadComponent: () =>
      import('./admin/pages/admin-join.component').then(
        (m) => m.AdminJoinComponent
      ),
  },
];
