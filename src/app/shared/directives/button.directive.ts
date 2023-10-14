import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { split } from 'postcss/lib/list';

@Directive({
  selector: '[appButton]',
  standalone: true,
})
export class ButtonDirective implements OnInit {
  @Input() color = 'bg-primary';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    const classes = [
      'w-full',
      //'h-full',
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
      'shadow-md',
      'active:shadow-inner',
      'disabled:bg-[#DADADA]',
      'disabled:text-[#A8A8A8]',
    ];
    const bg = getComputedStyle(this.el.nativeElement).backgroundColor;

    classes.forEach((c) => this.renderer.addClass(this.el.nativeElement, c));
  }
  ngOnInit(): void {
    const bg = getComputedStyle(this.el.nativeElement).backgroundColor;
    let rgb = this.extractRGB(bg);
    let c = rgb.reduce((acc, curr) => acc + curr, 0);
    if (!c) this.renderer.addClass(this.el.nativeElement, 'bg-primary');
  }
  private extractRGB(color: string): [number, number, number] {
    const matches = color.match(/\d+/g);
    if (matches) {
      return [parseInt(matches[0]), parseInt(matches[1]), parseInt(matches[2])];
    }
    return [0, 0, 0]; // Default to black if extraction fails.
  }
}
