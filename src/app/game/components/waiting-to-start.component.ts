import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card.component';
import { TeamCardImgComponent } from '../../shared/components/team-card-img.component';
import { GameService } from '../services/game.service';
import { LoaderComponent } from '../../shared/components/loader.component';

@Component({
  selector: 'app-waiting-to-start',
  standalone: true,
  template: `
    <div
      class="fixed right-0 top-0 z-30 flex  h-full w-full pt-10 justify-center bg-card-text/50 backdrop-blur-sm"
    >
      <ng-container *ngIf="gameState() as gameState">
        <app-card *ngIf="gameState.imgUrl" class="min-w-[350px]">
          <div content>
            <div class=" text-2xl text-center font-semibold mb-4">
              Your Team:
            </div>
            <div class="  bg-slate-200 pt-4 px-4 rounded-lg">
              <app-team-card-img
                [teamImgUrl]="gameState.imgUrl"
                [teamName]="gameState.teamName"
              ></app-team-card-img>
            </div>
            <div class="mt-6 font-semibold text-center">
              Your Game Will Start Soon!
            </div>
            <app-loader></app-loader>
          </div>
        </app-card>
      </ng-container>
    </div>
  `,
  styles: [],
  imports: [CommonModule, CardComponent, TeamCardImgComponent, LoaderComponent],
})
export class WaitingToStartComponent {
  public gameState = this.game.gameState;
  constructor(private game: GameService) {}
}
