import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { Route } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameLoginComponent } from './game-login/game-login.component';
import { GameRegistrationComponent } from './game-registration/game-registration.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthGuard } from './auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';

export const mainRoutes: Route[] = [
  {
    path: '',
    //component: GameLoginComponent
    loadChildren: () => import('./game-login/game-login.module').then(m => m.GameLoginModule)

  },
  {
   path: 'game-registration',
   //component:GameRegistrationComponent
   loadChildren: () => import('./game-registration/game-registration.module').then(m => m.GameRegistrationModule)

  },
  {
    path:'logout',
  
    //component:ThinktacGameComponent,
   component:LogoutComponent,

    canActivate: [AuthGuard]

  },

  {
    path:'game',
  
    //component:ThinktacGameComponent,
    loadChildren: () => import('./thinktac-game/thinktac-game.module').then(m => m.ThinktacGameModule),

    canActivate: [AuthGuard]

  },
  
];
// AngularFireModule.initializeApp(environment.firebase),
//     AngularFireFunctionsModule,
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(mainRoutes),
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
