import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnchorService {
  private _viewContainerRef: ViewContainerRef | null = null;
  constructor() {}

  set anchorRef(anchorRef: ViewContainerRef) {
    this._viewContainerRef = anchorRef;
  }

  get anchorRef(): ViewContainerRef | null {
    return this._viewContainerRef;
  }
}
