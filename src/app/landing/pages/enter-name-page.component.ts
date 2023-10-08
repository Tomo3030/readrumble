import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card.component';
import { LogoComponent } from '../../shared/components/logo.component';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { RippleDirective } from 'src/app/shared/directives/ripple.directive';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-enter-name-page',
  standalone: true,
  template: `
    <div class="w-96 m-auto mt-12">
      <app-card *ngIf="!user()?.displayName; else signedIn" class="w-96 m-auto">
        <div content class="flex flex-col gap-6 ">
          <app-logo></app-logo>
          <input
            [(ngModel)]="name"
            class=" w-full  rounded border-2 border-primary-light placeholder:text-text/80 placeholder:font-semibold placeholder:text-sm bg-primary-light/20 px-6 py-2 text-center text-md font-bold focus:border-primary focus:ring-1  focus:ring-primary focus: outline-none"
            type="text"
            autocomplete="off"
            placeholder="Enter Nickname"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Enter Nickname'"
          />
          <button appButton appRipple class="h-[43px]" (click)="login()">
            Sign In
          </button>
        </div>
      </app-card>

      <ng-template #signedIn>
        <app-card class="w-96 m-auto">
          <div content class="flex flex-col items-center gap-4">
            <img src="assets/fist.svg" alt="" />
            <div class=" text-2xl mb-">Welcome Back</div>
            <div class="text-4xl font-bold ">
              {{ user()?.displayName }}
            </div>

            <div class=" text-center mt-4 border-t w-full pt-4">
              <div class="">not {{ user()?.displayName }}?</div>
              <button (click)="logout()" class="underline">
                Sign in with different account
              </button>
            </div>
          </div>
        </app-card>
      </ng-template>
    </div>
  `,
  styles: [],
  imports: [
    CommonModule,
    CardComponent,
    LogoComponent,
    FormsModule,
    ButtonDirective,
    RippleDirective,
  ],
})
export class EnterNamePageComponent {
  constructor(
    private auth: AuthService,
    private spinner: SpinnerService,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  public user = this.auth.user;
  public name: string = '';

  login() {
    if (this.name.length < 3)
      return this.toast.open('Name must be at least 3 characters');
    this.spinner.show();
    //if user doesn't have display name
    if (this.user() && !this.user().displayName) {
      this.updateDisplayName();
    } else {
      this.signInAnonymously();
    }
  }

  logout() {
    this.name = '';
    this.auth.logOut();
  }

  private signInAnonymously() {
    this.auth
      .anonymousLogin(this.name)
      .catch((err) => {
        this.toast.open(err.message);
      })
      .then(() => {
        this.continueToGame();
      })
      .finally(() => {
        this.spinner.hide();
      });
  }

  private updateDisplayName() {
    this.auth
      .updateDisplayName(this.name)
      .then(() => {
        this.spinner.hide();
        this.continueToGame();
      })
      .catch((err) => {
        this.spinner.hide();
        this.toast.open(err.message);
      })
      .finally(() => {
        this.spinner.hide();
      });
  }

  private continueToGame() {
    this.router.navigate(['join'], {
      relativeTo: this.route,
    });
  }
}
