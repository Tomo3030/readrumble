import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamSelectComponent } from '../components/team-select.component';
import { LandingDataAccessService } from '../services/landing-data-access.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from 'src/app/shared/modals/team';
import { JoinTeamCardComponent } from '../components/join-team-card.component';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { RippleDirective } from 'src/app/shared/directives/ripple.directive';

@Component({
  selector: 'app-join-team',
  standalone: true,
  template: `
    <div>
      <div class="text-white text-4xl font-bold text-center my-4">
        Select Team
      </div>
      <ng-container *ngIf="teamData$ | async as teams">
        <app-team-select [carouselItems]="teams"></app-team-select>
      </ng-container>
      <div class="text-center mt-5">
        <button appButton appRipple class=" max-w-[250px] bg-accent-green">
          Join
        </button>
      </div>
    </div>
  `,
  styles: [],
  imports: [
    CommonModule,
    TeamSelectComponent,
    JoinTeamCardComponent,
    ButtonDirective,
    RippleDirective,
  ],
})
export class JoinTeamComponent {
  teamData$: Observable<Team[]> | null = null;
  constructor(
    private landingService: LandingDataAccessService,
    private route: ActivatedRoute
  ) {
    const classroomId = this.route.snapshot.paramMap.get('classroomId');
    this.teamData$ = this.landingService.getTeamData(classroomId);
  }
}
