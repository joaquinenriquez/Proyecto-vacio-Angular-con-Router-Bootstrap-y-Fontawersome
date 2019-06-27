import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IUsuario } from '../models/iusuario';

// Firebase
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

// Servicio que va a tener todo lo relacionado con los usuarios (creación, login, etc)
export class AuthService {

  /* #region  Atributos */
  public usuarioActual: IUsuario = {
    email: '',
    password: '',
    tipoUsuario: ''
  };
  /* #endregion */

  /* #region  Constructor */

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  /* #endregion */

  /* #region  Métodos de clase */

  registrarUsuario(email: string, password: string, tipo: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, password) // Damos de alta el usuario
        .then(datosUsuario => {
          resolve(datosUsuario);
          this.updateDatosUsuario(datosUsuario.user, tipo); // Lo agregamos a la coleccion de usuarios
        })
        .catch(err => {
          console.log(err.message);
          reject(err);
        });
    });
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


  updateDatosUsuario(usuario, tipo: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuarios/${usuario.uid}`);
    const datos: IUsuario = {
      id: usuario.uid,
      email: usuario.email,
      tipoUsuario: tipo
    };
    return userRef.set(datos, { merge: true });
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

  /* #endregion */

}
