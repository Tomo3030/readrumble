import {
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { RippleDirective } from 'src/app/shared/directives/ripple.directive';
import { AutocompleteComponent } from '../../shared/components/autocomplete.component';
import { BehaviorSubject } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { ToggleComponent } from 'src/app/shared/components/toggle.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  template: `
    <div
      class=" h-screen sticky top-0 left-0 p-5 w-72 flex flex-col gap-4 bg-primary-light  text-card-text shadow-lg "
    >
      <img src="assets/logos/stack-logo.svg" />
      <app-autocomplete
        [options]="(quizes | async)!"
        (onSelectionChange)="onQuizSelect($event)"
      ></app-autocomplete>
      <div class="flex items-center">
        <span class="mr-1">Edit Mode:</span>
        <app-toggle (onToggle)="toggleEdit($event)"></app-toggle>
      </div>
      <button
        appButton
        appRipple
        *ngIf="!canEdit()"
        (click)="startGame()"
        class="max-h-[40px]"
      >
        Start Game
      </button>
      <button
        appButton
        appRipple
        *ngIf="!canEdit()"
        (click)="createNewQuiz()"
        class="max-h-[40px]"
      >
        Create New Quiz
      </button>
      <button
        appButton
        appRipple
        *ngIf="canEdit()"
        [disabled]="!hasBeenEdited()"
        (click)="saveQuiz()"
        class="max-h-[40px]"
      >
        Save
      </button>
    </div>
  `,
  styles: [],
  imports: [
    CommonModule,
    ButtonDirective,
    RippleDirective,
    AutocompleteComponent,
    ToggleComponent,
  ],
})
export class SideBarComponent {
  constructor(private dashboardService: DashboardService) {}

  public quizes = this.dashboardService.getQuizes();
  public canEdit = this.dashboardService.canEdit;
  public hasBeenEdited = this.dashboardService.hasBeenEdited;

  onQuizSelect(id: string) {
    this.dashboardService.selectQuiz(id);
  }

  createNewQuiz() {
    this.dashboardService.createNewQuiz();
  }

  startGame() {
    this.dashboardService.startGame();
  }

  toggleEdit(value) {
    this.dashboardService.toggleEdit();
  }

  saveQuiz() {
    this.dashboardService.saveQuiz();
  }
}
