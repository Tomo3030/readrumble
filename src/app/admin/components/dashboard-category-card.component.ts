import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/shared/components/card.component';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard-category-card',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  template: `
    <app-card>
      <div content class=" text-card-text">
        <div class=" text-2xl">Category:</div>
        <input
          type="text"
          [disabled]="!canEdit()"
          class="  mt-0 block w-9/12 border-0 border-b-2 border-card-text/80 border-gray-200 px-0.5 text-3xl font-bold text-card-text focus:rounded-t-md  focus:border-primary-light  focus:bg-[#EEEEEE] focus:ring-0"
          [(ngModel)]="category"
          (ngModelChange)="categoryChange($event)"
        />
      </div>
    </app-card>
  `,
  styles: [],
})
export class DashboardCategoryCardComponent {
  canEdit = this.dashboardService.canEdit;
  constructor(private dashboardService: DashboardService) {}
  @Input() category: string;
  categoryChange(event: string) {}
}
