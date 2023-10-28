import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/components/loader.component';

@Component({
  selector: 'app-answer-submitted',
  standalone: true,
  template: `
    <div class="text-center my-4 font-bold text-card-text/80">
      Answer Submitted, Please Wait...
    </div>
    <app-loader></app-loader>
  `,
  styles: [],
  imports: [CommonModule, LoaderComponent],
})
export class AnswerSubmittedComponent implements AfterViewInit {
  @Output() expanded = new EventEmitter();
  ngAfterViewInit(): void {
    this.expanded.emit();
  }
}
