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
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-join-team',
  standalone: true,
  template: `
    <div>
      <div class="text-white text-4xl font-bold text-center my-4">
        Select Team
      </div>
      <ng-container *ngIf="teamData$ | async as teams">
        <app-team-select
          [carouselItems]="teams"
          (slideChange)="setCurrentTeam($event)"
        ></app-team-select>
      </ng-container>
      <div class="text-center mt-5">
        <button
          appButton
          appRipple
          class=" max-w-[250px] bg-accent-green"
          (click)="joinTeam()"
        >
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
  private currentTeam: Team | null = null;
  private classroomId =
    this.activatedRoute.snapshot.paramMap.get('classroomId');
  constructor(
    private landingService: LandingDataAccessService,
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    const classroomId = this.route.snapshot.paramMap.get('classroomId');
    this.teamData$ = this.landingService.getTeamData(classroomId);
  }

  setCurrentTeam(team: Team) {
    this.currentTeam = team;
  }

  joinTeam() {
    if (!this.currentTeam) new Error('No currentTeam selected');
    if (!this.classroomId) new Error('No classroomId');
    this.spinner.show();
    this.landingService
      .joinTeam(this.classroomId, this.currentTeam)
      .then(() => {
        this.spinner.hide();
        //need to go somewhere so the user can't join again.
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }
}
