import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaComponent } from './components/admin/alta/alta.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'admin/altausuario', component: AltaComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
