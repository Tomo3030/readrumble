import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { GameService } from './game.service';
import { Observable, tap } from 'rxjs';
import { Game } from 'src/app/shared/modals/game';
import { Quiz } from 'src/app/shared/modals/quiz';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { ImgMapService } from 'src/app/shared/services/img-map.service';

@Injectable({
  providedIn: 'root',
})
export class GameDataAccessService {
  constructor(
    private db: Firestore,
    private gameService: GameService,
    private classroom: ClassroomService,
    private imgMap: ImgMapService
  ) {}

  public initGameDataAccess(classroomId: string, gameId: string) {
    const classroomRef = this.classroom.getClassroomRef(classroomId);

    const gameRef = doc(this.db, 'classrooms', classroomRef, 'games', gameId);

    const gameData = docData(gameRef) as Observable<Game>;
    return gameData.pipe(
      tap((game) => {
        game.imgUrl = this.imgMap.getTeamImgUrl(game?.id);
        this.gameService.updateGameState(game);
      })
    );
  }

  public fetchQuizData(classroomId: string) {
    const classroomRef = this.classroom.getClassroomRef(classroomId);
    const quizRef = doc(this.db, 'classrooms', classroomRef);
    const quizData = docData(quizRef) as Observable<Quiz>;
    return quizData;
  }

  public postQuizResults(classroomId: string, quiz: Quiz) {}
}
