import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from './create-article/create-article.component';
import { PortFolioUserComponent } from './port-folio-user/port-folio-user.component';

const routes: Routes = [
  {
    path: 'createArticle',
  //  canActivate: [AuthGuard],
   component:CreateArticleComponent,
   //loadChildren: () => import('./create-article/create-article.module').then(m => m.CreateArticleModule),

  },

  {
    path: 'user',
  //  canActivate: [AuthGuard],
   component:PortFolioUserComponent,
   //loadChildren: () => import('./create-article/create-article.module').then(m => m.CreateArticleModule),

  },

  {
   path: 'search-queries',
   loadChildren: () => import('./search-queries/search-queries.module').then(m => m.SearchQueriesModule)
  },

  {
    path: 'search-books',
    loadChildren: () => import('./write-book/write-book.module').then(m => m.WriteBookModule)
   },
  // {
  //   path:'logout',
  //  component:LogoutComponent,
  //   // canActivate: [AuthGuard]

  // },

   {
    path:'',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
