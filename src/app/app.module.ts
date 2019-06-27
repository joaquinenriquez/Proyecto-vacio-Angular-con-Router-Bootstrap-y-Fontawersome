import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AltaComponent } from './components/admin/alta/alta.component';

// Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


// Formularios
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomeComponent } from './components/home/home.component';
import { AltaMascotaComponent } from './components/alta-mascota/alta-mascota.component';
import { ListadoMascotasComponent } from './components/listado-mascotas/listado-mascotas.component';
import { ListadoTurnosComponent } from './components/listado-turnos/listado-turnos.component';
import { AltaTurnoComponent } from './components/alta-turno/alta-turno.component';


@NgModule({
  declarations: [
    AppComponent,
    AltaComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    AltaMascotaComponent,
    ListadoMascotasComponent,
    ListadoTurnosComponent,
    AltaTurnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    AngularFireStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
