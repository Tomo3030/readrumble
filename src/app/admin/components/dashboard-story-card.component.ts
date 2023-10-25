import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/shared/components/card.component';
import { Story } from 'src/app/shared/modals/story';
import { DashboardService } from '../services/dashboard.service';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { RippleDirective } from 'src/app/shared/directives/ripple.directive';
import { EditButtonComponent } from './edit-button.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EditStoryDialogComponent } from './edit-story-dialog.component';

@Component({
  selector: 'app-dashboard-story-card',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ButtonDirective,
    RippleDirective,
    EditButtonComponent,
  ],
  template: `
    <app-card class="relative">
      <div content>
        <div class="flex justify-between min-h-[56px]">
          <div class="text-card-text text-2xl mb-2">Stories:</div>
          <button
            *ngIf="canEdit()"
            appButton
            appRipple
            class=" max-w-min"
            (click)="addStory()"
          >
            add story
          </button>
        </div>
        <div class="flex gap-4 overflow-auto">
          <!-- stories -->
          <div
            *ngFor="let story of stories; let i = index"
            class=" border-r  border-card-text/20 p-4 last:border-0"
          >
            <div class="mb-3  flex  items-center min-h-[40px] ">
              <div class=" h-8 text-xl font-bold text-card-text">
                {{ story.title }}
              </div>
              <app-edit-button
                (click)="editStory(story, i)"
                *ngIf="canEdit()"
                class=" ml-4"
              ></app-edit-button>
            </div>
            {{ story.text }}
            <div class=" text-right"></div>
          </div>
        </div>
      </div>
    </app-card>
  `,
  styles: [],
})
export class DashboardStoryCardComponent {
  @Input() stories: Story[];
  canEdit = this.dashboardService.canEdit;
  constructor(
    private dashboardService: DashboardService,
    private dialog: DialogService
  ) {}

  addStory() {
    this.dialog.open(EditStoryDialogComponent);
  }

  editStory(story: Story, index: number) {
    this.dialog.open(EditStoryDialogComponent, {
      title: story.title,
      text: story.text,
      index,
    });
  }
}
