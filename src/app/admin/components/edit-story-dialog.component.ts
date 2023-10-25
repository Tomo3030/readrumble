import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { DashboardService } from '../services/dashboard.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-story-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="fixed right-0 top-0 z-30 flex  h-full w-full items-center justify-center bg-card-text/50 backdrop-blur-sm"
    >
      <div class=" flex  w-6/12 flex-col rounded-md bg-white p-5">
        <div class="mb-4 flex flex-row justify-between align-middle">
          <div class=" text-2xl font-bold  text-text">Add a Story</div>
          <button (click)="close()">
            <span class="material-icons text-3xl">close</span>
          </button>
        </div>

        <label>Title: </label>
        <input
          type="text"
          [(ngModel)]="title"
          class="bg-slate-100 h-8 p-2 rounded-md"
        />
        <label>Story: </label>
        <textarea
          class="h-48 bg-slate-100 p-2 rounded-md"
          [(ngModel)]="text"
        ></textarea>
        <div *ngIf="index !== undefined" class="self-end">
          <button
            (click)="onDelete()"
            class="mr-4 mt-3  rounded-md border border-primary-light px-8 py-3 text-sm font-bold uppercase text-text hover:bg-primary-light/90"
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
        <div *ngIf="index == undefined" class="self-end">
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
export class EditStoryDialogComponent {
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() index?: number;

  constructor(
    private dialogService: DialogService,
    private dashboardService: DashboardService
  ) {}

  onSaveEdit() {
    //this is when a story has been edited
    let story = {
      title: this.title,
      text: this.text,
    };
    if (this.index !== undefined)
      this.dashboardService.saveStoryEdit(story, this.index);
    this.dialogService.close();
  }

  onAdd() {
    //this is when a story has been added
    let story = {
      title: this.title,
      text: this.text,
    };
    this.dashboardService.addStory(story);
    this.dialogService.close();
  }

  onDelete() {
    if (this.index !== undefined) this.dashboardService.deleteStory(this.index);
    this.dialogService.close();
  }

  close() {
    this.dialogService.close();
  }
}
