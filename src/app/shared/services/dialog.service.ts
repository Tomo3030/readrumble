import {
  ComponentRef,
  Injectable,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { AnchorService } from './anchor.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private viewContainerRef: ViewContainerRef | null = null;
  constructor(private anchor: AnchorService) {
    this.viewContainerRef = this.anchor.anchorRef;
  }

  open<T>(componentToOpen: Type<T>, params?: {}) {
    this.viewContainerRef?.clear();
    let popup: ComponentRef<T> =
      this.viewContainerRef.createComponent(componentToOpen);

    if (params) {
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          (popup.instance as any)[key] = (params as any)[key];
        }
      }
    }
    return popup;
  }

  close() {
    this.viewContainerRef?.clear();
  }
}
