import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from 'src/app/shared/components/chip.component';
import { QuizItem } from 'src/app/shared/modals/quiz-item';
import { DashboardService } from '../services/admin-quiz.service';
import { EditButtonComponent } from './edit-button.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EditQuestionDialogComponent } from './edit-question-dialog.component';

@Component({
  selector: 'app-dashboard-question-row',
  standalone: true,
  imports: [CommonModule, ChipComponent, EditButtonComponent],
  template: `
    <div class="flex items-center">
      <!-- question text -->
      <div>
        <div class="  flex h-10 content-center items-center ">
          <div>{{ index + 1 }}. {{ item.question }}</div>
          <app-edit-button
            *ngIf="canEdit"
            (click)="editQuestion()"
            class="ml-4"
          ></app-edit-button>
        </div>

        <!-- choices -->
        <div class="flex flex-wrap gap-3 m-2">
          <app-chip
            *ngFor="let d of item.choices; let i = index"
            (click)="select(i)"
            [selected]="item.answers.includes(d)"
            >{{ d }}
          </app-chip>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class DashboardQuestionRowComponent {
  constructor(
    private dashboardService: DashboardService,
    private dialog: DialogService
  ) {}
  @Input() item!: QuizItem;
  @Input() canEdit!: boolean;
  @Input() index!: number;

  select(i: number) {
    if (!this.canEdit) return;
    this.dashboardService.editAnswers(this.index, this.item.choices[i]);
  }

  editQuestion() {
    if (!this.canEdit) return;
    this.dialog.open(EditQuestionDialogComponent, {
      question: this.item.question,
      index: this.index,
    });
  }
}
