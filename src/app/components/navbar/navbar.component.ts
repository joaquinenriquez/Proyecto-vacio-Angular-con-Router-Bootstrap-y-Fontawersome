import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IUsuario } from 'src/app/models/iusuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nombreApp = 'Veterinaria';
  estaLogeado = false;
  usuarioActual: IUsuario;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUsuarioLogeado();
  }

  getUsuarioLogeado() {
    this.authService.isLogeado().subscribe(auth => {
      if (auth) {
        console.log('navbar', 'Usuario Logeado');
        this.estaLogeado = true;
        this.usuarioActual = this.authService.getUsuarioActual();
      } else {
        console.log('navbar', 'El usuario no esta Logeado');
        this.estaLogeado = false;
      }
    });
  }

  onLogoutUsuario() {
    this.authService.logoutUsuario();
  }

}
