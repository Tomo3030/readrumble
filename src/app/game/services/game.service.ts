import { Injectable, Signal, computed, signal } from '@angular/core';
import { Game } from 'src/app/shared/modals/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  //the gameState is updated from the game-page-component
  private _gameState = signal<Game>({
    created: new Date(0, 0),
    gameStatus: 'waitingToStart',
    id: '',
    imgUrl: '',
    teamName: '',
    members: [''],
    responses: [] as any,
  });
  constructor() {}
  //selecters
  public status = computed(() => this._gameState().gameStatus);
  public members = computed(() => this._gameState().members);

  public updateGameState(game: Game) {
    this._gameState.set(game);
  }
}
