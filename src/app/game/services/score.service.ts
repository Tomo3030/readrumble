import { Injectable } from '@angular/core';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private scoreObject = {};
  private results = [];

  constructor(private game: GameService) {}

  public getScoreData() {
    const members = this.game.members;
    const responses = this.game.responses;
    if (!responses) throw new Error('No responses found');
    //responses are in object just need answers:
    const justAnswers = responses().map((r) => r.answers);
    //transpose and sort
    const answers = this.transposeAndSortResponses(justAnswers);
    const score = this.calculateScore(answers, members().length);
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
