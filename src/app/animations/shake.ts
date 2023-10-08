import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const shake = trigger('shake', [
  transition(':enter', []),
  transition('* => *', [
    animate(
      900,
      keyframes([
        style({ transform: 'translateX(0)', offset: 0 }),
        style({ transform: 'translateX(-10px)', offset: 0.1 }),
        style({ transform: 'translateX(10px)', offset: 0.2 }),
        style({ transform: 'translateX(-10px)', offset: 0.3 }),
        style({ transform: 'translateX(10px)', offset: 0.4 }),
        style({ transform: 'translateX(-10px)', offset: 0.5 }),
        style({ transform: 'translateX(10px)', offset: 0.6 }),
        style({ transform: 'translateX(-10px)', offset: 0.7 }),
        style({ transform: 'translateX(5px)', offset: 0.8 }),
        style({ transform: 'translateX(-5px)', offset: 0.9 }),
        style({ transform: 'translateX(0)', offset: 1 }),
      ])
    ),
  ]),
]);
