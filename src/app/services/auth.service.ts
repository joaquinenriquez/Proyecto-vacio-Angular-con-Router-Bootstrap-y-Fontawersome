import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { IUsuario } from '../models/iusuario';


@Injectable({
  providedIn: 'root'
})

// Servicio que va a tener todo lo relacionado con los usuarios (creación, login, etc)
export class AuthService {

  public usuarioActual: IUsuario = {
    email: '',
    password: '',
    tipoUsuario: ''
  };

  constructor(private afsAuth: AngularFireAuth) { }

  registrarUsuario() {
    return new
  }

  loginConEmail(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, password)
      .then(datosUsuario => {
        this.usuarioActual.email = datosUsuario.user.email;
        resolve(datosUsuario);
      }, err => {
        reject(err);
      });
    });
  }


  logoutUsuario() {
    return this.afsAuth.auth.signOut();
  }

  isLogeado() {
    return this.afsAuth.authState.pipe(map(auth => auth)); // Operamos sobre el flujo de datos del observable.
  }

  getUsuarioActual(): IUsuario {
    return this.usuarioActual;
  }

}
