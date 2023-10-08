import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: ` <div
    class="fixed right-0 top-0 z-30 flex  h-full w-full items-center justify-center bg-card-text/50 backdrop-blur-sm"
  >
    <div role="status">
      <svg
        class="animate-spin -ml-1 mr-3 h-32 w-32 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-50"
          cx="12"
          cy="12"
          r="10"
          stroke="#fff"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-100"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>`,
  styles: [],
})
export class SpinnerComponent {}
