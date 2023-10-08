import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinTeamCardComponent } from './join-team-card.component';
import { RippleDirective } from 'src/app/shared/directives/ripple.directive';
import { IconButtonDirective } from 'src/app/shared/directives/icon-button.directive';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';

@Component({
  selector: 'app-team-select',
  standalone: true,
  template: `
    <div class="flex justify-center items-center ">
      <button appIconButton appRipple (click)="prevSlide()">
        chevron_left
      </button>
      <div class="mx-4">
        <app-join-team-card
          [team]="carItems[currentSlide]"
        ></app-join-team-card>
      </div>
      <button appIconButton appRipple (click)="nextSlide()">
        chevron_right
      </button>
    </div>
  `,
  styles: [],
  imports: [
    CommonModule,
    JoinTeamCardComponent,
    RippleDirective,
    IconButtonDirective,
    ButtonDirective,
  ],
})
export class TeamSelectComponent {
  carItems: any[] = [];
  currentDisplay = 0;
  currentSlide = 0;

  @Input() set carouselItems(items: any[]) {
    this.carItems = items;
    if (items) this.slideChange.emit(items[0]);
  }

  @Input() template!: TemplateRef<any>;
  @Output() slideChange = new EventEmitter();

  nextSlide() {
    if (this.currentSlide >= this.carItems.length - 1) this.currentSlide = 0;
    else this.currentSlide++;
  }

  prevSlide() {
    if (this.currentSlide === 0) this.currentSlide = this.carItems.length - 1;
    else this.currentSlide--;
  }
}
