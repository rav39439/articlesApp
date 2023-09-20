import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { Route } from '@angular/router';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// import { GameLoginComponent } from './game-login/game-login.component';
// import { GameRegistrationComponent } from './game-registration/game-registration.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthGuard } from './auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';

export const mainRoutes: Route[] = [
  {
    path: '',
   loadChildren: () => import('./create-article/create-article.module').then(m => m.CreateArticleModule),
  },
  // {
  //  path: 'game-registration',
  //  loadChildren: () => import('./game-registration/game-registration.module').then(m => m.GameRegistrationModule)
  // },
  // {
  //   path:'logout',
  //  component:LogoutComponent,
  //   canActivate: [AuthGuard]

  // },

  // {
  //   path:'game-login',
  //   loadChildren: () => import('./game-login/game-login.module').then(m => m.GameLoginModule),
  // },
  
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
    AngularFireStorageModule,
    BrowserModule,
    EditorModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(mainRoutes),
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule
  ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
