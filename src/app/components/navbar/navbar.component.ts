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
  esAdmin = false;
  usuarioActual: IUsuario = {};
  userUid: string;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.traerUsuarioActual();
  }

  traerUsuarioActual() {
    this.authService.isLogeado().subscribe( datosUsuario => {
      if (datosUsuario) {
        this.userUid = datosUsuario.uid; // Nos quedamos con el userid
        console.log(`usuario logeado: ${this.userUid}`);
        this.usuarioActual.id = datosUsuario.uid;
        this.estaLogeado = true;
        this.authService.isAdmin(this.userUid).subscribe (usuario => {
          if (usuario.tipoUsuario === 'administrador') {
            this.esAdmin = true;
          } else {
            this.esAdmin = false;
          }
          this.usuarioActual.email = usuario.email;
          this.usuarioActual.tipoUsuario = usuario.tipoUsuario;
        });
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
