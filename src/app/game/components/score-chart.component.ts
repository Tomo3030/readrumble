import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { chartFade } from 'src/app/animations/chart-fade';

@Component({
  selector: 'app-score-chart',
  standalone: true,
  imports: [CommonModule],
  animations: [chartFade],
  template: `
    <div
      [@chartFade]
      (@chartFade.done)="animationDone()"
      class=" flex flex-row items-end justify-center gap-2 border-b bg-slate-200 pt-4"
    >
      <div *ngFor="let col of scoreData.answers">
        <div class="col  flex flex-col-reverse ">
          <div *ngFor="let cell of col">
            <div
              class="cell bg-r h-5  w-5 border-collapse border border-slate-600"
              [style.background-color]="getClass(cell)"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-center  gap-2">
      <div
        *ngFor="let d of scoreData.answers; let i = index"
        class="h-5 w-5   text-center text-sm font-bold text-card-text"
      >
        {{ i + 1 }}
      </div>
    </div>
  `,
  styles: [],
})
export class ScoreChartComponent {
  @Input() scoreData: { answers: boolean[][]; score: number };
  @Output() chartAniDone = new EventEmitter();

  getClass(value: boolean) {
    return value ? '#33CA7F' : '#FE656E';
  }

  animationDone() {
    console.log('done');
    this.chartAniDone.emit();
  }
}
