import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRipple]',
  standalone: true,
})
export class RippleDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const bg = getComputedStyle(this.el.nativeElement).backgroundColor;
    const [r, g, b] = this.extractRGB(bg);
    const color = this.contrastingColor(r, g, b);

    const ripple = this.renderer.createElement('span');
    this.renderer.setStyle(ripple, 'left', x + 'px');
    this.renderer.setStyle(ripple, 'top', y + 'px');
    this.renderer.setStyle(ripple, 'position', 'absolute');
    this.renderer.setStyle(ripple, 'background', color);
    this.renderer.setStyle(ripple, 'opacity', '0.5');
    this.renderer.setStyle(ripple, 'borderRadius', '50%');
    this.renderer.setStyle(ripple, 'width', '24px');
    this.renderer.setStyle(ripple, 'height', '24px');
    this.renderer.setStyle(
      ripple,
      'transform',
      'translate(-50%, -50%) scale(0)'
    );
    this.renderer.setStyle(ripple, 'animation', 'ripple .7s');
    this.renderer.appendChild(this.el.nativeElement, ripple);
    setTimeout(() => {
      this.renderer.removeChild(this.el.nativeElement, ripple);
    }, 1000);
  }

  private extractRGB(color: string): [number, number, number] {
    const matches = color.match(/\d+/g);
    if (matches) {
      return [parseInt(matches[0]), parseInt(matches[1]), parseInt(matches[2])];
    }
    return [0, 0, 0]; // Default to black if extraction fails.
  }

  private contrastingColor(r: number, g: number, b: number): string {
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.7 ? 'gray' : 'white';
  }
}
