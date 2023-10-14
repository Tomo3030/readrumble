import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/shared/components/card.component';
import { TeamCardImgComponent } from 'src/app/shared/components/team-card-img.component';
import { Team } from 'src/app/shared/modals/team';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { RippleDirective } from 'src/app/shared/directives/ripple.directive';
import { IconButtonDirective } from 'src/app/shared/directives/icon-button.directive';

@Component({
  selector: 'app-add-team-card',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    TeamCardImgComponent,
    ButtonDirective,
    RippleDirective,
    IconButtonDirective,
  ],
  template: `
    <app-card class="w-[250px]  ">
      <div content>
        <ng-container *ngIf="displayTeam; else noTeam">
          <app-team-card-img
            [teamImgUrl]="displayTeam.imgUrl"
            [teamName]="displayTeam.teamName"
          ></app-team-card-img>
          <div class="flex justify-evenly">
            <button
              appIconButton
              appRipple
              (click)="decrement()"
              [ngStyle]="{ 'background-color': '#F6B166' }"
            >
              chevron_left
            </button>
            <button
              appIconButton
              appRipple
              (click)="increment()"
              [ngStyle]="{ 'background-color': '#F6B166' }"
            >
              chevron_right
            </button>
          </div>

          <button appButton appRipple (click)="addTeam()" class="my-8">
            Add Team
          </button>
        </ng-container>
      </div>
    </app-card>

    <ng-template #noTeam>
      <app-team-card-img
        [teamImgUrl]="'assets/error.svg'"
        [teamName]="'Max Teams Reached'"
      >
      </app-team-card-img>
    </ng-template>
  `,
  styles: [],
})
export class AddTeamCardComponent implements OnInit {
  ngOnInit() {
    this.displayTeam = this.teams[this.index];
  }
  @Input() teams!: Team[];
  @Output() teamAdded = new EventEmitter();
  index = 0;
  displayTeam!: Team;

  increment() {
    this.index++;
    if (this.index > this.teams.length - 1) {
      this.index = 0;
    }
    this.displayTeam = this.teams[this.index];
  }

  decrement() {
    this.index--;
    if (this.index < 0) {
      this.index = this.teams.length - 1;
    }
    this.displayTeam = this.teams[this.index];
  }

  addTeam() {
    this.teamAdded.emit();
  }
}
