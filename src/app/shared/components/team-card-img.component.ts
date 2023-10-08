import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-card-img',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center">
      <img [src]="teamImgUrl" class=" w-24 h-24" alt="" />
      <div
        class="text-xl font-bold my-2 text-center h-[56px] flex items-center"
      >
        {{ teamName }}
      </div>
    </div>
  `,
  styles: [],
})
export class TeamCardImgComponent {
  @Input() teamName: string;
  @Input() teamImgUrl: string;
}
