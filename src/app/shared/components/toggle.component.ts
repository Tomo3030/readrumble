import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule],
  template: ` <div>
    <label
      for="Toggle"
      class="text-gray-800 inline-flex cursor-pointer items-center rounded-md text-xs"
    >
      <input
        id="Toggle"
        type="checkbox"
        class="peer hidden"
        [checked]="value"
        (change)="changed()"
      />
      <span
        class="rounded-l-md px-8 py-2 bg-gray-300"
        [style.background-color]="value ? '' : '#F6B166'"
        >Off</span
      >
      <span
        class="rounded-r-md px-8 py-2 bg-gray-300"
        [style.background-color]="value ? '#F6B166' : ''"
        >On</span
      >
    </label>
  </div>`,
  styles: [],
})
export class ToggleComponent {
  @Output() onToggle = new EventEmitter<boolean>();
  value = false;
  changed() {
    this.value = !this.value;
    this.onToggle.emit(this.value);
  }
}
