import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-join-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class=" text-text flex justify-between shadow-2xl bg-card ">
      <div class="flex items-end m-auto mb-10 flex-shrink-0">
        <span class="text-5xl font-thin">www.</span>
        <img class="inline" src="assets/logos/rr-grill.svg" alt="" />
        <span class="text-5xl font-thin">.com</span>
      </div>

      <div class=" py-4 px-20 bg-[#FBFF31] ">
        <div class="text-2xl">Enter Code:</div>
        <div class="text-8xl font-black">
          {{ classroomId }}
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class JoinBannerComponent {
  @Input() classroomId: string = '';
}
