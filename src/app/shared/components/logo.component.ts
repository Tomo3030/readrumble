import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: ` <img
    class="w-[352px] h-[184px]"
    src="./assets/logos/logo.svg"
    alt=""
  />`,
  styles: [],
})
export class LogoComponent {}
