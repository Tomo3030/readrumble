import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative text-card-text">
      <div class="relative">
        <input
          type="text"
          placeholder="Enter a Category"
          [(ngModel)]="search"
          (input)="updateOptions()"
          (focus)="isOpen = true; updateOptions()"
          (ngModelChange)="updateOptions()"
          (blur)="onBlur()"
          class="w-full rounded  border-0 bg-white p-3  text-sm shadow-sm focus:rounded-b-none focus:bg-[#FCE9D4] focus:ring-0"
        />
      </div>

      <div
        class="absolute z-20  w-full  rounded-b  bg-white shadow-md"
        *ngIf="isOpen"
      >
        <div
          class="cursor-pointer p-3 text-sm hover:bg-[#FCE9D4]"
          *ngFor="let option of filteredOptions"
        >
          <div (click)="select(option)">
            {{ option.name }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AutocompleteComponent {
  @Input() options: any[] = [];
  @Output() onSelectionChange = new EventEmitter();
  search = '';

  filteredOptions: any[] = [];
  isOpen = false;

  updateOptions() {
    if (this.search === '') {
      this.filteredOptions = this.options;
    } else {
      this.filteredOptions = this.options.filter((option) =>
        option.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }

  select(option: { id: number; name: string }) {
    this.search = option.name;
    this.onSelectionChange.emit(option.id);
    this.isOpen = false;
  }

  clear() {
    this.search = '';
    this.filteredOptions = this.options;
  }

  onBlur() {
    setTimeout(() => {
      this.isOpen = false;
    }, 200);
  }
}
