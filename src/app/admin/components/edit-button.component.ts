import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleDirective } from 'src/app/shared/directives/ripple.directive';

@Component({
  selector: 'app-edit-button',
  standalone: true,
  imports: [CommonModule, RippleDirective],
  template: `
    <button
      appRipple
      class="h-10 w-10 rounded-full  bg-white ring-1 ring-text flex justify-center items-center relative overflow-hidden shadow-md hover:bg-slate-100 active:shadow-none"
    >
      <span class="material-icons text-text">edit</span>
    </button>
  `,
  styles: [],
})
export class EditButtonComponent {}
