import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaComponent } from './components/admin/alta/alta.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ListadoMascotasComponent } from './components/listado-mascotas/listado-mascotas.component';
import { ListadoTurnosComponent } from './components/listado-turnos/listado-turnos.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/altausuario', component: AltaComponent },
  { path: 'listado-mascotas', component: ListadoMascotasComponent, canActivate: [AuthGuard] },
  { path: 'listado-turnos', component: ListadoTurnosComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
