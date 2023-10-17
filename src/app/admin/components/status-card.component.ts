import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card.component';
import { StatusCardTeamComponent } from './status-card-team.component';
import { StatusCardDataComponent } from './status-card-data.component';

@Component({
  selector: 'app-status-card',
  standalone: true,
  template: `
    <app-card>
      <div
        class="flex items-center"
        [class.animate-pulse]="scoreData.gameStatus === 'skeleton'"
        content
      >
        <app-status-card-team [scoreData]="scoreData"></app-status-card-team>

        <div class="flex-1"></div>
        <app-status-card-data
          class=" h-28 w-28"
          [scoreData]="scoreData"
        ></app-status-card-data>
      </div>
    </app-card>
  `,
  styles: [],
  imports: [
    CommonModule,
    CardComponent,
    StatusCardTeamComponent,
    StatusCardDataComponent,
  ],
})
export class StatusCardComponent {
  @Input() scoreData!: {
    imgUrl: string;
    teamName: string;
    score: number;
    gameStatus: string;
  };
}
