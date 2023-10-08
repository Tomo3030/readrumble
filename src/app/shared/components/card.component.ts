import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class=" min-h-[50px] overflow-hidden rounded-lg bg-card p-4 text-card-text shadow-card"
    >
      <ng-content select="[content]"></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class CardComponent {}
