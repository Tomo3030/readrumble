import { animate, style, transition, trigger } from '@angular/animations';

export const slideUp = trigger('slideUp', [
  transition(':enter', [
    style({ transform: 'translateY(100%)' }),
    animate('0.2s ease-in', style({ transform: 'translateY(0%)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0%)' }),
    animate('0.2s ease-out', style({ transform: 'translateY(100%)' })),
  ]),
]);
