import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamSelectComponent } from '../components/team-select.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Team } from 'src/app/shared/modals/team';
import { JoinTeamCardComponent } from '../components/join-team-card.component';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { RippleDirective } from 'src/app/shared/directives/ripple.directive';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { TeamService } from 'src/app/shared/services/team.service';

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
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService
  ) {
    this.spinner.show();
    const classroomId = this.route.snapshot.paramMap.get('classroomId');
    this.teamData$ = this.teamService.getClassroomTeams(classroomId).pipe(
      tap((team) => {
        if (team.length) this.spinner.hide();
      })
    );
  }

  setCurrentTeam(team: Team) {
    this.currentTeam = team;
    console.log(this.currentTeam);
  }

  joinTeam() {
    if (!this.currentTeam) new Error('No currentTeam selected');
    if (!this.classroomId) new Error('No classroomId');
    this.spinner.show();
    this.teamService
      .joinTeam(this.classroomId, this.currentTeam)
      .then(() => {
        this.spinner.hide();
        this.router.navigate([
          'classroom',
          this.classroomId,
          'game',
          this.currentTeam.id,
        ]);
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }
}
