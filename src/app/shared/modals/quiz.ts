import { QuizItem } from './quiz-item';
import { Story } from './story';

export interface Quiz {
  id: string;
  category: string;
  stories: Story[];
  items: QuizItem[];
}
