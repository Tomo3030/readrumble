import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentQuestionIndicatorComponent } from './current-question-indicator.component';
import { ButtonClustorComponent } from './button-clustor.component';
import { Observable } from 'rxjs';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-action-bar',
  standalone: true,
  template: `
    <div class=>
      <app-current-question-indicator></app-current-question-indicator>
      <app-button-clustor></app-button-clustor>
    </div>
  `,
  styles: [],
  imports: [
    CommonModule,
    CurrentQuestionIndicatorComponent,
    ButtonClustorComponent,
  ],
})
export class ActionBarComponent {}
