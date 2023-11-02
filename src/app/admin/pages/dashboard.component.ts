import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../components/side-bar.component';
import { DashboardQuizViewComponent } from '../components/dashboard-quiz-view.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="flex">
      <app-side-bar></app-side-bar>
      <app-dashboard-quiz-view class=" m-4 grow"></app-dashboard-quiz-view>
    </div>
  `,
  styles: [],
  imports: [CommonModule, SideBarComponent, DashboardQuizViewComponent],
})
export class DashboardComponent {
  constructor() {}
}
