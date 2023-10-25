import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizItem } from 'src/app/shared/modals/quiz-item';
import { CardComponent } from 'src/app/shared/components/card.component';
import { DashboardQuestionRowComponent } from './dashboard-question-row.component';
import { DashboardService } from '../services/dashboard.service';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { RippleDirective } from 'src/app/shared/directives/ripple.directive';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EditQuestionDialogComponent } from './edit-question-dialog.component';

@Component({
  selector: 'app-dashboard-questions-card',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    DashboardQuestionRowComponent,
    ButtonDirective,
    RippleDirective,
  ],
  template: `
    <app-card class="relative">
      <div content>
        <div class="flex justify-between min-h-[56px]">
          <div class="text-card-text text-2xl mb-2">Questions:</div>
          <button
            *ngIf="canEdit()"
            appButton
            appRipple
            (click)="addQuestion()"
            class=" max-w-min"
          >
            add question
          </button>
        </div>
        <div
          *ngFor="let item of quizItems; let i = index"
          class=" border-b p-3"
        >
          <app-dashboard-question-row
            [item]="item"
            [index]="i"
            [canEdit]="canEdit()"
          ></app-dashboard-question-row>
        </div>
      </div>
    </app-card>
  `,
  styles: [],
})
export class DashboardQuestionsCardComponent {
  public canEdit = this.dashboardService.canEdit;
  constructor(
    private dashboardService: DashboardService,
    private dialog: DialogService
  ) {}
  @Input() quizItems: QuizItem[];

  addQuestion() {
    this.dialog.open(EditQuestionDialogComponent);
  }
}
