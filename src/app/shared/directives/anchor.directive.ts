import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAnchor]',
  standalone: true,
})
export class AnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
