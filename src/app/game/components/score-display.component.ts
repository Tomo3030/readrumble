import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fade } from 'src/app/animations/fade';

@Component({
  selector: 'app-score-display',
  standalone: true,
  imports: [CommonModule],
  animations: [fade],
  template: `
    <div class="flex flex-col items-center text-card-text min-h-[80px]">
      <div *ngIf="show" [@fade] (@fade.done)="start()">
        <div class=" text-lg font-bold text-center">Score:</div>
        <div class="text-5xl font-bold text-center">{{ score }}</div>
      </div>
    </div>
  `,
  styles: [],
})
export class ScoreDisplayComponent {
  public score = 0;
  @Input() show = false;
  @Input() target = 0;
  start() {
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const progress = Math.min((timestamp - startTime) / 2000, 1);

      this.score = Math.floor(progress * this.target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
}
