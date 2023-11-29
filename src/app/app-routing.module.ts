import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from './create-article/create-article.component';

const routes: Routes = [
  {
    path: 'createArticle',
  //  canActivate: [AuthGuard],
   component:CreateArticleComponent,
   //loadChildren: () => import('./create-article/create-article.module').then(m => m.CreateArticleModule),

  },
  {
   path: 'search-queries',
   loadChildren: () => import('./search-queries/search-queries.module').then(m => m.SearchQueriesModule)
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
