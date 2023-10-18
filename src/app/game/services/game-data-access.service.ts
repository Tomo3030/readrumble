import { Injectable } from '@angular/core';
import { Firestore, arrayUnion } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { GameService } from './game.service';
import { Observable, tap } from 'rxjs';
import { Game } from 'src/app/shared/modals/game';
import { Quiz } from 'src/app/shared/modals/quiz';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { ImgMapService } from 'src/app/shared/services/img-map.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GameDataAccessService {
  constructor(
    private db: Firestore,
    private gameService: GameService,
    private classroom: ClassroomService,
    private imgMap: ImgMapService,
    private auth: AuthService
  ) {}

  public initGameDataAccess(classroomId: string, gameId: string) {
    const classroomRef = this.classroom.getClassroomRef(classroomId);

    const gameRef = doc(this.db, 'classrooms', classroomRef, 'games', gameId);

    const gameData = docData(gameRef) as Observable<Game>;
    return gameData.pipe(
      tap((game) => {
        game.imgUrl = this.imgMap.getTeamImgUrl(game?.id);
        this.gameService.updateGameState(game);
        if (game.members.length === game.responses.length)
          this.gameService.changeStateToGameOver();
      })
    );
  }

  public fetchQuizData(classroomId: string) {
    const classroomRef = this.classroom.getClassroomRef(classroomId);
    const quizRef = doc(this.db, 'classrooms', classroomRef);
    const quizData = docData(quizRef) as Observable<Quiz>;
    return quizData;
  }

  public postQuizResults(classroomId: string, answers: boolean[]) {
    const user = this.auth.user().displayName;
    if (!user) throw new Error('user not found');
    const answerObject = { user, answers };
    const classroomRef = this.classroom.getClassroomRef(classroomId);
    const gameId = this.gameService.gameState().id;
    const gameRef = doc(this.db, 'classrooms', classroomRef, 'games', gameId);
    return setDoc(
      gameRef,
      { responses: arrayUnion(answerObject) },
      { merge: true }
    ).catch((err) => console.log(err));
  }
}
