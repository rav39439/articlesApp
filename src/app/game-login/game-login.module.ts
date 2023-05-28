import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { GameLoginComponent } from './game-login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
export const gameLoginRoute:Route[]=[
  {
    path:'',
    component:GameLoginComponent
  }
]

@NgModule({
  declarations: [GameLoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(gameLoginRoute),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatProgressSpinnerModule

  ]
  ,
  exports:[
    GameLoginComponent
  ]
})
export class GameLoginModule { }
