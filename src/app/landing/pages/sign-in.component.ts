import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card.component';
import { LogoComponent } from '../../shared/components/logo.component';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { RippleDirective } from 'src/app/shared/directives/ripple.directive';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  template: `
    <div class="m-4">
      <ng-container
        *ngIf="user() === null || user()?.isAnonymous; else returnUser"
      >
        <app-card class=" max-w-[400px] m-auto">
          <div content>
            <h1 class="text-center font-bold text-2xl mb-6">
              Sign In To ReadRumble
            </h1>
            <form (ngSubmit)="onSubmit()" class="space-y-4 md:space-y-6">
              <!-- error msg -->
              <div
                *ngIf="error"
                class=" bg-red-200  py-2 px-4 rounded text-center text-red-700 font-semibold text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 inline mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>

                {{ error }}
              </div>

              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <input
                  [(ngModel)]="email"
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  [(ngModel)]="password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  required=""
                />
              </div>

              <button appButton appRipple type="submit">Sign In</button>

              <div class="text-center">or</div>

              <button
                appRipple
                (click)="signInWithGoogle()"
                type="button"
                class="text-card-text relative overflow-hidden bg-white border border-slate-300 w-full rounded px-3 py-2  focus:ring-primary focus:border-primary"
              >
                <div>
                  <img src="assets/logos/google.svg" class="inline mr-6" />
                  <span class="text-sm">Continue With Google</span>
                </div>
              </button>

              <button
                type="button"
                (click)="router.navigate(['sign-up'])"
                class=" active:scale-y-[.85] text-sm transition-transform text-black underline rounded  py-2 px-4 hover:bg-gray-200"
              >
                Don't have an account yet? Sign Up
              </button>
            </form>
          </div>
        </app-card>
      </ng-container>

      <ng-template #returnUser>
        <app-card class="w-96 m-auto">
          <div content class="flex flex-col items-center gap-4">
            <img src="assets/logos/fist.svg" alt="" />
            <div class=" text-2xl mb-">Welcome Back</div>
            <div class="text-3xl font-bold mb-4 ">
              {{ user()?.email }}
            </div>
            <button appButton appRipple (click)="continue()">Continue</button>

            <div class=" text-center mt-4 border-t w-full pt-4">
              <div class="">not {{ user()?.email }}?</div>
              <button (click)="logOut()" class="underline">
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
export class SignInComponent {
  email: string = '';
  password: string = '';
  error: string | null = null;

  constructor(
    public router: Router,
    private auth: AuthService,
    private spinner: SpinnerService,
    private toast: ToastService
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.toast.open('Please enter email and password');
      return;
    }
    this.auth
      .signInWithEmail(this.email, this.password)
      .then((cred) => {
        //navigate to dashboard
        this.continue();
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 'auth/wrong-password') {
          this.error = 'Incorrect email or password';
        }
        if (err.code === 'auth/user-not-found') {
          this.error = 'Incorrect email or password';
        }
        if (err.code === 'auth/invalid-email') {
          this.error = 'Incorrect email or password';
        }
        if (err.code === 'auth/account-exists-with-different-credential') {
          this.error = 'Account already exists with different credentials';
        }
      })
      .finally(() => this.spinner.hide());
  }

  signInWithGoogle() {
    this.auth.signInWithGoogle().catch((err) => {
      this.error = err.message;
    });
  }

  user() {
    return this.auth.user();
  }

  continue() {
    console.log('continue');
  }

  logOut() {
    this.auth.logOut();
  }
}
