import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { RippleDirective } from 'src/app/shared/directives/ripple.directive';
import { CardComponent } from 'src/app/shared/components/card.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ButtonDirective,
    RippleDirective,
    CardComponent,
    FormsModule,
  ],
  template: `
    <div class="m-4">
      <app-card class=" max-w-[400px] m-auto">
        <div content>
          <h1 class="text-center font-bold text-2xl mb-6">
            Sign Up To ReadRumble
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
                class="block mb-2 text-sm font-medium text-gray-900"
                >Your email</label
              >
              <input
                [(ngModel)]="email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="name@email.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
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

            <button appButton appRipple type="submit">Sign Up</button>

            <div class="text-center">or</div>

            <button
              (click)="signInWithGoogle()"
              type="button"
              class="text-card-text bg-white border border-slate-300 w-full rounded px-3 py-2  focus:ring-primary focus:border-primary"
            >
              <div>
                <img src="assets/logos/google.svg" class="inline mr-6" />
                <span class="text-sm">Continue With Google</span>
              </div>
            </button>
          </form>
        </div>
      </app-card>
    </div>
  `,
  styles: [],
})
export class SignUpComponent {
  email = '';
  password = '';
  error = '';
  constructor(
    private auth: AuthService,
    private router: Router,
    private spinner: SpinnerService,
    private toast: ToastService
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.toast.open('Please enter email and password');
      return;
    }
    this.spinner.show();
    this.auth
      .signUpWithEmail(this.email, this.password)
      //.then(() => this.router.navigate(['dashboard']))
      .then(() => console.log('go to route'))
      .catch((err) => (this.error = err.message))
      .finally(() => this.spinner.hide());
  }

  signInWithGoogle() {
    this.auth
      .signInWithGoogle()
      // .then(() => {
      //   this.router.navigate(['dashboard']);
      // })
      .then(() => console.log('go to route'))
      .catch((err) => (this.error = err.message))
      .finally(() => this.spinner.hide());
  }
}
