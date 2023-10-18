import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { slideTransition } from 'src/app/animations/slide-transition';
import { ScoreChartComponent } from './score-chart.component';
import { ScoreDisplayComponent } from './score-display.component';
import { CardComponent } from '../../shared/components/card.component';
import { fade } from 'src/app/animations/fade';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-score',
  standalone: true,
  animations: [slideTransition, fade],
  template: `
    <div
      class="flex flex-col h-full w-full overflow-hidden absolute top-0 left-0"
      [@slideTransition]
      (@slideTransition.done)="revealCard()"
    >
      <div class="bg-accent-green flex-1 "></div>
      <div class="bg-accent-green flex-1 "></div>
      <div class="bg-accent-green flex-1 "></div>
      <div class="bg-accent-green flex-1 "></div>
      <div class="bg-accent-green flex-1 "></div>
      <div class="bg-accent-green flex-1 "></div>
      <div class="bg-accent-green flex-1 "></div>
    </div>
    <app-card [@fade] *ngIf="showCard" class="z-10 relative p-4 ">
      <div content class="min-h-[300px]">
        <div class=" text-center font-bold text-xl mb-4">Your Results:</div>
        <app-score-chart
          *ngIf="showChart"
          [scoreData]="scoreData"
          (chartAniDone)="startScore()"
        ></app-score-chart>
        <app-score-display
          [target]="scoreData.score"
          [show]="scoreAnimating"
        ></app-score-display>
      </div>
    </app-card>
  `,
  styles: [],
  imports: [
    CommonModule,
    ScoreChartComponent,
    ScoreDisplayComponent,
    CardComponent,
  ],
})
export class ScoreComponent {
  constructor(private score: ScoreService) {}
  public showCard = false;
  public showChart = false;
  public scoreAnimating = false;
  public scoreData = this.score.getScoreData();
  revealCard() {
    this.showCard = true;
    setTimeout(() => {
      this.showChart = true;
    }, 1000);
  }

  startScore() {
    this.scoreAnimating = true;
  }
}
