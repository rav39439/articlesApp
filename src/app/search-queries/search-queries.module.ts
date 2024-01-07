import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchQueriesComponent } from './search-queries.component';

import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

export const articlesRoutes: Route[] = [
  {
      path: '',
      title: 'search Queries',
      component: SearchQueriesComponent
  }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule,
    EditorModule,
    MatToolbarModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(articlesRoutes)
  ]
})
export class SearchQueriesModule { }
