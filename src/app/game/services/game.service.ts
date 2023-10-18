import { Injectable, Signal, computed, signal } from '@angular/core';
import { Game } from 'src/app/shared/modals/game';
import { AuthService } from 'src/app/shared/services/auth.service';

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
  constructor(private auth: AuthService) {}
  //selecters
  public status = computed(() => this._gameState().gameStatus);
  public members = computed(() => this._gameState().members);
  public responses = computed(() => this._gameState().responses);

  public answerSubmitted = computed(() => {
    const user = this.auth.user;
    const responses = this.responses();
    if (!responses) return false;
    const userResponse = responses.map((r) => r.user);
    if (userResponse.includes(user().displayName)) return true;
    return false;
  });

  public gameState = computed(() => this._gameState());

  public changeStateToGameOver() {
    this._gameState.set({ ...this._gameState(), gameStatus: 'gameOver' });
  }

  public updateGameState(game: Game) {
    this._gameState.set(game);
  }
}
