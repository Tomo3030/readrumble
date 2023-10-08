import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: ` <div class=" text-8xl text-center">LOGO</div> `,
  styles: [],
})
export class LogoComponent {}
