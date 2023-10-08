import { Inject, Injectable, ViewContainerRef, inject } from '@angular/core';
import { AnchorDirective } from '../directives/anchor.directive';
import { ToastComponent } from '../components/toast.component';
import { AnchorService } from './anchor.service';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private anchor: AnchorService) {
    this.viewContainerRef = this.anchor.anchorRef;
  }

  private viewContainerRef: ViewContainerRef | null = null;

  open<T>(message: string, button?: string) {
    this.viewContainerRef?.clear();

    let toast = this.viewContainerRef!.createComponent(ToastComponent);

    (toast.instance as any).message = message;
    (toast.instance as any).button = button;

    if (!button)
      setTimeout(() => {
        this.close();
      }, 4000);
  }

  close() {
    this.viewContainerRef?.clear();
  }
}
