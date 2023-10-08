import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AnchorDirective } from './shared/directives/anchor.directive';
import { AnchorService } from './shared/services/anchor.service';
import { SpinnerComponent } from './shared/components/spinner.component';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AnchorDirective],
  imports: [CommonModule, RouterOutlet, AnchorDirective, SpinnerComponent],
})
export class AppComponent {
  constructor(
    private anchor: AnchorDirective,
    private anchorService: AnchorService,
    public spinnerService: SpinnerService
  ) {
    //this is a hacky way to provide the base viewContainerRef to the toast, and modal services
    this.anchorService.anchorRef = this.anchor.viewContainerRef;
  }
  title = 'base-project';
}
