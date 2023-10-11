import { Team } from './team';

export interface Game extends Team {
  members: string[];
  gameStatus: 'waitingToStart' | 'playing' | 'gameOver';
  created: Date;
  responses: { user: string; answers: boolean[] }[] | null;
}
