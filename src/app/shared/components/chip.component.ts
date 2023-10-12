import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="inline-flex h-6 cursor-pointer  items-center rounded-full  px-3 text-xs  "
      [ngClass]="
        selected
          ? 'bg-accent-yellow  hover:bg-accent-yellow/70'
          : 'bg-[#E0E0E0]   hover:bg-[#BDBDBD]'
      "
    >
      <span class="mx-2 ">
        <ng-content></ng-content>
      </span>
    </div>
  `,
  styles: [],
})
export class ChipComponent {
  @Input() selected: boolean = true;
}
