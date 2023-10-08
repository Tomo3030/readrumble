import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private showing = new BehaviorSubject<boolean>(false);
  public showing$ = this.showing.asObservable();

  public show() {
    this.showing.next(true);
  }
  public hide() {
    this.showing.next(false);
  }
}
