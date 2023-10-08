import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: ` <img class="w-full" src="./assets/logos/logo.svg" alt="" />`,
  styles: [],
})
export class LogoComponent {}
