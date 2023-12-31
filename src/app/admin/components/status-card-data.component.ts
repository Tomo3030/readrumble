import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fade } from 'src/app/animations/fade';
import { Game } from 'src/app/shared/modals/game';

@Component({
  selector: 'app-status-card-data',
  standalone: true,
  imports: [CommonModule],
  animations: [fade],
  template: `
    <div class="stack-grid h-24 ">
      <div
        *ngIf="gameData.gameStatus === 'skeleton'"
        [@fade]
        class="mt-2 flex h-full flex-col items-center justify-center gap-2"
      >
        <div class=" h-5 w-28 rounded-full bg-slate-200"></div>
        <div class=" h-5 w-28 rounded-full bg-slate-200"></div>
        <div class=" h-5 w-28 rounded-full bg-slate-200"></div>
      </div>

      <div
        *ngIf="gameData.gameStatus === 'score'"
        [@fade]
        class="flex  h-24 flex-col items-center gap-2"
      >
        <div class=" font-light">score</div>
        <div class=" text-6xl font-bold">{{ gameData.score }}</div>
      </div>

      <div
        [@fade]
        *ngIf="gameData.gameStatus === 'playing'"
        class="flex h-24 flex-col items-center"
      >
        <img src="assets/playing.svg" alt="" class=" w-20" />
        <div class="text-xs font-bold uppercase  text-center">
          <div>playing</div>
          {{ gameData.responses?.length }} / {{ gameData.members.length }}
        </div>
      </div>

      <div
        [@fade]
        *ngIf="gameData.gameStatus === 'gameOver'"
        class="flex h-24 flex-col items-center "
      >
        <div class="flex flex-col items-center">
          <img src="assets/completed.svg" alt="" class=" w-20" />
          <div class="text-xs font-bold uppercase">completed</div>
        </div>
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
export class StatusCardDataComponent {
  @Input() gameData!: Game;
}
