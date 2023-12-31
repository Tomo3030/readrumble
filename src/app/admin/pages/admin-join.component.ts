import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinBannerComponent } from '../components/join-banner.component';
import { ActivatedRoute, Router } from '@angular/router';
import { JoinTeamCardComponent } from 'src/app/landing/components/join-team-card.component';
import { Observable } from 'rxjs';
import { Team } from 'src/app/shared/modals/team';
import { AddTeamCardComponent } from '../components/add-team-card.component';
import { TeamService } from 'src/app/shared/services/team.service';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { RippleDirective } from 'src/app/shared/directives/ripple.directive';

@Component({
  selector: 'app-admin-join',
  standalone: true,
  template: `
    <div class="p-4 h-full relative">
      <app-join-banner [classroomId]="classroomId"></app-join-banner>
      <div class="flex gap-4 mt-4 ">
        <div *ngFor="let team of teams | async">
          <app-join-team-card [team]="team"></app-join-team-card>
        </div>
        <app-add-team-card
          [teams]="availableTeams | async"
          (teamAdded)="addTeam($event)"
        ></app-add-team-card>
      </div>
      <div class="absolute bottom-5 right-5">
        <button
          appButton
          appRipple
          (click)="startGame()"
          class="max-w-[300px] bg-accent-green min-h-[70px] "
        >
          Start Game
        </button>
      </div>
    </div>
  `,
  styles: [],
  imports: [
    CommonModule,
    JoinBannerComponent,
    JoinTeamCardComponent,
    AddTeamCardComponent,
    ButtonDirective,
    RippleDirective,
  ],
})
export class AdminJoinComponent implements OnInit {
  public classroomId: string = '';
  public teams: Observable<Team[]>;
  public availableTeams: any;
  constructor(
    private route: ActivatedRoute,
    private team: TeamService,
    private router: Router
  ) {
    this.classroomId = this.route.snapshot.paramMap.get('classroomId');
  }
  ngOnInit() {
    this.teams = this.team.getClassroomTeams(this.classroomId);
    this.availableTeams = this.team.getAvailableTeams(this.classroomId);
  }

  addTeam(team: Team) {
    this.team.addTeam(this.classroomId, team);
  }

  startGame() {
    console.log('start game');
    // need to change all team status to playing
    this.team.changeTeamsStatusToPlaying(this.classroomId);
    // need to change the route to game
    this.router.navigate(['dashboard', this.classroomId, 'game']);
  }
}
