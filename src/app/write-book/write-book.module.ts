import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { WriteBookComponent } from './write-book.component';

export const articlesRoutes: Route[] = [
  {
      path: '',
      title: 'search Queries',
      component: WriteBookComponent
  }

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(articlesRoutes)

  ]
})
export class WriteBookModule { }
