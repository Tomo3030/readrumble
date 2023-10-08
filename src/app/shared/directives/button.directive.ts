import {
  AfterViewInit,
  Directive,
  ElementRef,
  Optional,
  Renderer2,
} from '@angular/core';
import { RippleDirective } from './ripple.directive';

@Directive({
  selector: '[appButton]',
  standalone: true,
})
export class ButtonDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    const classes = [
      'w-full',
      'h-full',
      'relative',
      'overflow-hidden',
      'rounded-md',
      'px-12',
      'py-2',
      'font-display',
      'text-sm',
      'uppercase',
      'tracking-wide',
      'text-white',
      'bg-primary',
      'shadow-md',
      'active:shadow-inner',
      'disabled:bg-[#DADADA]',
      'disabled:text-[#A8A8A8]',
    ];
    classes.forEach((c) => this.renderer.addClass(this.el.nativeElement, c));
  }
}
