import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { LoginComponent } from './login/login.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { SearchQueriesComponent } from './search-queries/search-queries.component';

@NgModule({
  declarations: [
    AppComponent,
 CreateArticleComponent,
 SearchQueriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // provideFirebaseApp(() => initializeApp({"projectId":"mynewproject-ae49a","appId":"1:939005557600:web:ee766070db4bd2dadfbc05","storageBucket":"mynewproject-ae49a.appspot.com","locationId":"us-central","apiKey":"AIzaSyAZ9x_QbhCfY9aEsqxEiYhWtfIRNGl_qeo","authDomain":"mynewproject-ae49a.firebaseapp.com","messagingSenderId":"939005557600","measurementId":"G-YFKTT151SN"})),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore())
    AngularFireStorageModule,
    AngularFireModule,
    FormsModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebase),
     BrowserAnimationsModule,
     MatInputModule

  ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
