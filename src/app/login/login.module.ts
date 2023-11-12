import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
export const LoginRoute: Route[] = [
  {
      path: '',
      title: 'Login',
      component: LoginComponent
  }

]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    AngularFireModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    MatButtonModule,
    MatInputModule,
    RouterModule.forChild(LoginRoute)

  ]
})
export class LoginModule { }
