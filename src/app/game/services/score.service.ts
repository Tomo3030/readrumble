import { Injectable } from '@angular/core';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private _scoreData = { score: 0, answers: [] };
  constructor(private game: GameService) {}

  public getScoreData() {
    if (this._scoreData.answers.length > 0) return this._scoreData;
    const members = this.game.members;
    const responses = this.game.responses;
    if (!responses) throw new Error('No responses found');
    //responses are in object just need answers:
    const justAnswers = responses().map((r) => r.answers);
    //transpose and sort
    const answers = this.transposeAndSortResponses(justAnswers);
    console.log(answers.length);
    const score = this.calculateScore(answers, members().length);
    this._scoreData = { score, answers };
    return { score, answers };
  }

  private transposeAndSortResponses(answers: boolean[][]): boolean[][] {
    const numberOfQuestions = answers[0].length;

    // Ensure all inner arrays have the same length
    if (!answers.every((answer) => answer.length === numberOfQuestions)) {
      throw new Error('Incorrect number of answers');
    }

    // Transpose and sort
    return Array.from({ length: numberOfQuestions }).map((_, i) =>
      answers
        .map((answer) => answer[i])
        .sort((a, b) => (a === b ? 0 : a ? -1 : 1))
    );
  }

  private calculateScore(answers: boolean[][], membersLength: number) {
    let score = 0;
    answers.forEach((a) => {
      const length = a.filter((ans) => ans).length;
      if (length === membersLength) score += 100;
      else score += length * 25;
    });
    return score;
  }
}
