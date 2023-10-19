import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card.component';
import { LoaderComponent } from '../../shared/components/loader.component';

@Component({
  selector: 'app-time-up-dialog',
  standalone: true,
  template: `
    <div
      class="fixed right-0 top-0 z-30 flex  h-full w-full  justify-center bg-card-text/50 backdrop-blur-sm"
    >
      <app-card class=" mt-8 mx-4">
        <div content class="  font-bold text-center text-text">
          <div class=" text-3xl">You Ran Out of Time</div>
          <div class="text-lg font-light mt-4">
            Please wait while we check your results ...
          </div>
          <app-loader></app-loader>
        </div>
      </app-card>
    </div>
  `,
  styles: [],
  imports: [CommonModule, CardComponent, LoaderComponent],
})
export class TimeUpDialogComponent {}
