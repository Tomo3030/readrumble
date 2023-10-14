import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { GameService } from './game.service';
import { Observable, map, of, tap } from 'rxjs';
import { Game } from 'src/app/shared/modals/game';
import { Quiz } from 'src/app/shared/modals/quiz';

@Injectable({
  providedIn: 'root',
})
export class GameDataAccessService {
  constructor(private db: Firestore, private gameService: GameService) {}

  public initGameDataAccess(classroomId: string, gameId: string) {
    console.log('this is not right now, the route is wrong');
    //need to use classroom service to get the classroom id
    const gameRef = doc(this.db, `classrooms/${classroomId}/games/${gameId}`);
    const gameData = docData(gameRef) as Observable<Game>;
    return gameData.pipe(
      tap((game) => {
        this.gameService.updateGameState(game);
      })
    );
  }

  public fetchQuizData(classroomId: string) {
    console.log('this is not right now, the route is wrong');
    //need to use classroom service to get the classroom id
    const quizRef = doc(this.db, `classrooms/${classroomId}`);
    const quizData = docData(quizRef) as Observable<Quiz>;
    return quizData;
  }
}
