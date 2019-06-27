import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /* #region  Atributos */
  email: string;
  password: string;
  mensajeError: string;
  isError = false;
  /* #endregion */

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm): void {
    if (form.valid) {
      this.authService.loginConEmail(this.email, this.password)
      .then(datosUsuario => { this.onLoginRedireccionar(); }) // En caso de que salga todo bien
      .catch(err => {
        this.isError = true;
        this.mensajeError = err.message;
        console.log('Ocurrio un error:', err.message);
      });
    } else {
      this.isError = true;
      this.mensajeError = 'Datos no validos';
    }
  }

  onLoginRedireccionar(){
    this.router.navigate(['admin/altausuario']);
  }


}
