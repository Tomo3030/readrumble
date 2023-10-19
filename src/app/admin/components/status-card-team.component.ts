import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fade } from 'src/app/animations/fade';
import { Game } from 'src/app/shared/modals/game';

@Component({
  selector: 'app-status-card-team',
  standalone: true,
  imports: [CommonModule],
  animations: [fade],
  template: `
    <div class="flex items-center">
      <div
        class="mr-7 flex h-28 w-28 items-center rounded-full bg-slate-200 p-6"
      >
        <img
          [@fade]
          *ngIf="scoreData.gameStatus !== 'skeleton'"
          src="{{ scoreData.imgUrl }}"
          alt="Team Logo"
        />
      </div>
      <div class="stack-grid w-80">
        <div
          *ngIf="scoreData.gameStatus !== 'skeleton'"
          [@fade]
          class="text-3xl font-bold"
        >
          {{ scoreData.teamName }}
        </div>
        <div
          *ngIf="scoreData.gameStatus === 'skeleton'"
          [@fade]
          class="h-8 w-80 rounded-full bg-slate-200"
        ></div>
      </div>
    </div>
  `,
  styles: [
    `
      .stack-grid {
        display: grid;
        align-items: center;

        div {
          grid-area: 1/1/2/2;
        }
      }
    `,
  ],
})
export class StatusCardTeamComponent {
  @Input() scoreData!: Game;
}
