import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { GameRegistrationComponent } from './game-registration.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireFunctionsModule, REGION, USE_EMULATOR } from '@angular/fire/compat/functions';

import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import {MatCardModule} from '@angular/material/card';

export const gameRegistrationRoute:Route[]=[
  {
    path:'',
    component:GameRegistrationComponent
  }
]

@NgModule({
  declarations: [GameRegistrationComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectInfiniteScrollModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatStepperModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(gameRegistrationRoute),
    AngularFireFunctionsModule,

  ],
  providers: [{
    provide: REGION, useValue: 'asia-south1'
  },
  //  { provide: USE_EMULATOR, useValue: 'asia-south1' },
    { provide: USE_EMULATOR, useValue: ['localhost', 4200] }
  ],
  exports:[
    GameRegistrationComponent
  ]
})
export class GameRegistrationModule { }
