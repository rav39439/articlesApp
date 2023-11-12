import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { Route } from '@angular/router';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { environment } from 'src/environments/environment.prod';
import {MatButtonModule} from '@angular/material/button';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { GameLoginComponent } from './game-login/game-login.component';
// import { GameRegistrationComponent } from './game-registration/game-registration.component';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthGuard } from './auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { CreateArticleComponent } from './create-article/create-article.component';


// AngularFireModule.initializeApp(environment.firebase),
//     AngularFireFunctionsModule,
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserModule,
    EditorModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule,

    AngularFireModule.initializeApp(environment.firebase),

    // RouterModule.forRoot(mainRoutes),
    MatToolbarModule,
    AngularFireFunctionsModule,
  ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
