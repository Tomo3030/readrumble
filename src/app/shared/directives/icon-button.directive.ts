import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIconButton]',
  standalone: true,
})
export class IconButtonDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    const classes = [
      'material-icons',
      'h-9',
      'w-9',
      'rounded-full',
      'bg-yellow-50',
      'flex',
      'justify-center',
      'items-center',
      'overflow-hidden',
      'relative',
      'shadow-md',
      'active:bg-slate-200',
      'active:shadow-none',
      'active:shadow-md',
      'disabled:bg-[#DADADA]',
      'disabled:text-[#5c5c5c]',
      'disabled:cursor-not-allowed',
      'disabled:shadow-none',
    ];
    classes.forEach((c) => this.renderer.addClass(this.el.nativeElement, c));
  }
}
