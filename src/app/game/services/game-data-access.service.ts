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
import { ScoreService } from './score.service';
import { QuizService } from './quiz.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { TimeUpDialogComponent } from '../components/time-up-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class GameDataAccessService {
  private classroomRef: string = '';
  constructor(
    private db: Firestore,
    private gameService: GameService,
    private classroom: ClassroomService,
    private imgMap: ImgMapService,
    private auth: AuthService,
    private scoreService: ScoreService,
    private quiz: QuizService,
    private dialog: DialogService
  ) {}

  public initGameDataAccess(classroomId: string, gameId: string) {
    this.classroomRef = this.classroom.getClassroomRef(classroomId);

    const gameRef = doc(
      this.db,
      'classrooms',
      this.classroomRef,
      'games',
      gameId
    );

    const gameData = docData(gameRef) as Observable<Game>;
    return gameData.pipe(
      tap((game) => {
        //get correct image url
        game.imgUrl = this.imgMap.getTeamImgUrl(game?.id);
        //update game state
        this.gameService.updateGameState(game);
        // if all members have responded, change game state to game over
        if (this.haveAllMembersHaveResponded(game)) {
          if (this.dialog.isOpen) this.dialog.close();
          this.gameService.changeStateToGameOver();
          this.postGameScore(game);
        }
        if (
          game.gameStatus === 'timeUp' &&
          !this.gameService.answerSubmitted()
        ) {
          this.dialog.open(TimeUpDialogComponent);
          setTimeout(() => {
            let quiz = this.quiz.correctQuiz();
            this.postQuizResults(classroomId, quiz);
          }, 4000);
        }
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

  private haveAllMembersHaveResponded(game: Game) {
    const hasMembers = game.members?.length > 0;
    const hasResponses = game.responses?.length > 0;
    const isPlaying = game.gameStatus !== 'gameOver';
    const everyoneHasResponded =
      game.members?.length === game.responses?.length;
    return hasMembers && hasResponses && isPlaying && everyoneHasResponded;
  }

  private postGameScore(game: Game) {
    //post score and update game state
    const displayName = this.auth.user().displayName;
    if (!displayName) throw new Error('user not found');
    const lastToRespond = game.responses[game.responses.length - 1].user;
    if (displayName !== lastToRespond) return;
    const gameId = game.id;
    const scoreData = this.scoreService.getScoreData();
    const score = scoreData.score;
    if (!score) throw new Error('score not found');
    console.log(score);
    const gameRef = doc(
      this.db,
      'classrooms',
      this.classroomRef,
      'games',
      gameId
    );
    setDoc(gameRef, { score, gameStatus: 'gameOver' }, { merge: true }).catch(
      (err) => console.log(err)
    );
  }
}
