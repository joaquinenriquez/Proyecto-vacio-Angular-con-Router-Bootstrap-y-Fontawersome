import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { IUsuario } from 'src/app/models/iusuario';

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

  constructor() { }

  ngOnInit() {

  }

  }
