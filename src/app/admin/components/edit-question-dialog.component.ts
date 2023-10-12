import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-question-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="fixed right-0 top-0 z-30 flex  h-full w-full items-center justify-center bg-card-text/50 backdrop-blur-sm"
    >
      <div class=" flex  w-6/12 flex-col rounded-md bg-white p-5">
        <div class="mb-4 flex flex-row justify-between align-middle">
          <div class=" text-2xl font-bold  text-card-text">Add a Question</div>
          <button (click)="onClose()">
            <span class="material-icons text-3xl">close</span>
          </button>
        </div>

        <label>Question: </label>
        <textarea
          class="bg-slate-100 h-[48px] p-2 rounded-md"
          [(ngModel)]="question"
        ></textarea>

        <div *ngIf="index !== undefined" class="self-end">
          <button
            (click)="onDelete()"
            class="mr-4 mt-3  rounded-md border border-primary-light px-8 py-3 text-sm font-bold uppercase text-card-text hover:bg-primary-light/90"
          >
            Delete
          </button>
          <button
            (click)="onSaveEdit()"
            class="mt-3  rounded-md  bg-primary-light px-12 py-3 text-sm font-bold uppercase text-white hover:bg-primary-light/90"
          >
            Save
          </button>
        </div>

        <div *ngIf="index === undefined">
          <button
            (click)="onAdd()"
            class="mt-3  rounded-md  bg-primary-light px-12 py-3 text-sm font-bold uppercase text-white hover:bg-primary-light/90"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class EditQuestionDialogComponent {
  @Input() question?: string = '';
  @Input() index?: number;
  constructor(
    private dashboard: DashboardService,
    private dialog: DialogService
  ) {}

  onSaveEdit() {
    this.dashboard.editQuestionText(this.index!, this.question!);
    this.dialog.close();
  }

  onDelete() {
    this.dashboard.deleteQuestion(this.index!);
    this.dialog.close();
  }

  onClose() {
    this.dialog.close();
  }

  onAdd() {
    this.dashboard.addQuestion(this.question!);
    this.dialog.close();
  }
}
