import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { DashboardCategoryCardComponent } from './dashboard-category-card.component';
import { DashboardQuestionsCardComponent } from './dashboard-questions-card.component';
import { DashboardStoryCardComponent } from './dashboard-story-card.component';

@Component({
  selector: 'app-dashboard-quiz-view',
  standalone: true,
  imports: [
    CommonModule,
    DashboardCategoryCardComponent,
    DashboardQuestionsCardComponent,
    DashboardStoryCardComponent,
  ],
  template: `
    <div class="flex flex-col gap-6 w-full">
      <app-dashboard-category-card
        [category]="category()"
      ></app-dashboard-category-card>
      <app-dashboard-story-card
        [stories]="stories()"
      ></app-dashboard-story-card>
      <app-dashboard-questions-card
        [quizItems]="questions()"
      ></app-dashboard-questions-card>
    </div>
  `,
  styles: [],
})
export class DashboardQuizViewComponent {
  private quiz = this.dashboardService.quizSignal;
  public category = computed(() => this.quiz().category);
  public stories = computed(() => this.quiz().stories);
  public questions = computed(() => this.quiz().items);

  constructor(private dashboardService: DashboardService) {}
}
