import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ThinktacGameComponent } from './thinktac-game.component';

export const gameComponentRoute:Route[]=[
  {
    path:'',
    component:ThinktacGameComponent
  }
]

@NgModule({
  declarations: [ThinktacGameComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(gameComponentRoute)
  ],
  exports:[
    ThinktacGameComponent
  ]
})
export class ThinktacGameModule { }
