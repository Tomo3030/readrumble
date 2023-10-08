import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/shared/modals/team';
import { CardComponent } from '../../shared/components/card.component';
import { TeamCardImgComponent } from '../../shared/components/team-card-img.component';
import { TeamSelectComponent } from './team-select.component';

@Component({
  selector: 'app-join-team-card',
  standalone: true,
  template: ` <app-card class="w-[250px]">
    <div content>
      <app-team-card-img
        [teamImgUrl]="team.imgUrl"
        [teamName]="team.teamName"
      ></app-team-card-img>
      <div class="flex  flex-col gap-2">
        <div
          *ngFor="let member of placeholder; let i = index"
          class="bg-gray-200 p-1 rounded-sm pl-2 h-8"
        >
          <span *ngIf="team.members?.[i]">{{ team.members?.[i] }}</span>
        </div>
      </div>
    </div>
  </app-card>`,
  styles: [],
  imports: [
    CommonModule,
    CardComponent,
    TeamCardImgComponent,
    TeamSelectComponent,
  ],
})
export class JoinTeamCardComponent {
  @Input() team!: Team;
  NUMBER_OF_MEMBERS = 4;
  placeholder = Array(this.NUMBER_OF_MEMBERS).fill('');
}
