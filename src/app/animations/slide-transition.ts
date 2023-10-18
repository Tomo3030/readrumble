import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { delay } from 'rxjs';

export const slideTransition = trigger('slideTransition', [
  transition(':enter', [
    query(
      'div',
      [
        style({ transform: 'translateX(-100%)' }),
        stagger(150, [
          animate('0.3s ease-in', style({ transform: 'translateX(0%)' })),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);
