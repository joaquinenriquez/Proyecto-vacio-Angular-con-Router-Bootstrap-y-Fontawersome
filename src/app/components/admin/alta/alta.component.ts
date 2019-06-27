import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { IUsuario } from 'src/app/models/iusuario';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})


export class AltaComponent implements OnInit {

  /* #region  Atributos */
  public email = '';
  public password = '';
  public tipoUsuario = '';

  public isError = false;
  public msgError = '';

  /* #endregion */

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  crearUsuario() {
    this.authService.registrarUsuario(this.email, this.password, this.tipoUsuario)
    .then((result) => {
      this.isError = false;
      this.router.navigate(['home']);
    })
    .catch((err => {
      console.log('Ocurrio un error:', err.message);
      this.isError = true;
      this.msgError = `Ocurrrio un error!: ${err.message}`;
    }))
  }

  }
