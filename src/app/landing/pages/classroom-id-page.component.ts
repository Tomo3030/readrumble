import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../shared/components/logo.component';
import { ButtonDirective } from '../../shared/directives/button.directive';
import { CardComponent } from '../../shared/components/card.component';
import { RippleDirective } from 'src/app/shared/directives/ripple.directive';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { LandingDataAccessService } from '../services/landing-data-access.service';
import { FormsModule } from '@angular/forms';
import { shake } from 'src/app/animations/shake';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-classroom-id-page',
  standalone: true,
  providers: [ToastService],
  animations: [shake],
  template: `
    <div class="w-96 m-auto mt-12">
      <app-card>
        <div content class="flex flex-col gap-6">
          <app-logo></app-logo>
          <input
            [@shake]="shake"
            [(ngModel)]="classroomId"
            type="text"
            autocomplete="off"
            class=" w-full  rounded border-2 border-primary-light placeholder:text-text/80 placeholder:font-semibold placeholder:text-sm bg-primary-light/20 px-6 py-2 text-center text-md font-bold focus:border-primary focus:ring-1  focus:ring-primary focus: outline-none"
            placeholder="Enter Classroom ID"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="6"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Enter Classroom ID'"
          />
          <button
            appButton
            appRipple
            (click)="joinClassroom()"
            class="h-[43px]"
          >
            Join Classroom
          </button>
        </div>
      </app-card>
      <div class="mt-3 text-xl text-center">
        <button
          (click)="router.navigate(['sign-in'])"
          class=" active:scale-y-[.85] text-sm transition-transform text-black underline rounded  py-2 px-4 hover:bg-white/50"
        >
          Sign In for more options
        </button>
      </div>
    </div>
  `,
  styles: [],
  imports: [
    CommonModule,
    LogoComponent,
    ButtonDirective,
    RippleDirective,
    CardComponent,
    FormsModule,
  ],
})
export class ClassroomIdPageComponent {
  public classroomId: string = '';
  public shake: boolean = false;

  constructor(
    public router: Router,
    public toast: ToastService,
    private landingService: LandingDataAccessService,
    private spinner: SpinnerService
  ) {}

  async joinClassroom() {
    if (this.classroomId.length < 6) {
      this.pinNotValid();
      return;
    }
    this.spinner.show();
    this.landingService
      .checkIfClassroomExists(this.classroomId)
      .then((exists) => {
        if (exists) {
          console.log('exists');
          this.router.navigate(['classroom', this.classroomId]);
        } else {
          this.pinNotValid();
        }
        this.spinner.hide();
      });
  }

  private pinNotValid() {
    this.toast.open('Classroom does not exist');
    this.shake = !this.shake;
    this.classroomId = '';
  }
}
