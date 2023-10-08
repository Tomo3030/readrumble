import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { ToastService } from '../services/toast.service';
import { ButtonDirective } from '../directives/button.directive';
import { RippleDirective } from '../directives/ripple.directive';
import { slideUp } from 'src/app/animations/slideUp';

@Component({
  selector: 'app-toast',
  standalone: true,
  animations: [slideUp],
  template: `
    <div [@slideUp] *ngIf="show" class="absolute bottom-0 left-0 w-full">
      <app-card class="w-full p-4 max-w-lg m-auto">
        <div content class=" flex flex-row items-center">
          <div class=" w-full text-center">{{ message }}</div>
          <button appButton appRipple *ngIf="button" (click)="close()">
            {{ button }}
          </button>
        </div>
      </app-card>
    </div>
  `,
  styles: [],
  imports: [CommonModule, CardComponent, ButtonDirective, RippleDirective],
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() button?: string;
  private toast = inject(ToastService);

  ngOnInit(): void {
    if (!this.button) {
      setTimeout(() => {
        this.close();
      }, 3000);
    }
  }
  show: boolean = true;
  close() {
    this.show = false;
    setTimeout(() => {
      this.toast.close();
    }, 200);
  }
}
