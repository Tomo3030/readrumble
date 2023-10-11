import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Story } from 'src/app/shared/modals/story';
import { CardComponent } from '../../shared/components/card.component';

@Component({
  selector: 'app-story-card',
  standalone: true,
  template: `
    <app-card>
      <div content>
        <div class=" font-display text-2xl">
          {{ story?.title }}
        </div>
        <div
          class=" from-primary-light to-yellow h-1 rounded bg-gradient-to-r mb-4"
        ></div>
        {{ story?.text }}
      </div>
    </app-card>
  `,
  styles: [],
  imports: [CommonModule, CardComponent],
})
export class StoryCardComponent {
  @Input() story: Story;
}
