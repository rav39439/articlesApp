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
  // {
  //  path: 'game-registration',
  //  loadChildren: () => import('./game-registration/game-registration.module').then(m => m.GameRegistrationModule)
  // },
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
