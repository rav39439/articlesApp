import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './create-article.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';



export const articlesRoutes: Route[] = [
  {
      path: '',
      title: 'create Article',
      component: CreateArticleComponent
  }

]

@NgModule({
  declarations: [
    CreateArticleComponent
  ],
  imports: [
    CommonModule,
    AngularFireModule,
    EditorModule,
    MatToolbarModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(articlesRoutes)
  ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }]

})

export class CreateArticleModule { }
