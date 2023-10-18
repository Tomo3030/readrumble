import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  sequence,
} from '@angular/animations';

export const chartFade = trigger('chartFade', [
  transition(':enter', [
    query('.cell', [style({ opacity: 0 })], { optional: true }),
    query(
      '.col',
      [
        style({ opacity: 0 }),
        stagger('1100ms', [
          sequence([
            animate('50ms', style({ opacity: 1 })),
            query('.cell', [
              stagger('100ms 100ms', [animate('100ms', style({ opacity: 1 }))]),
            ]),
          ]),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);
