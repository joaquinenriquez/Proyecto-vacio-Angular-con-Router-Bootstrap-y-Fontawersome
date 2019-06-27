import { Component, OnInit } from '@angular/core';
import { ITurno } from 'src/app/models/iturno';
import { DataApi2Service } from 'src/app/services/data-api2.service';
import { IMascota } from 'src/app/models/imascota';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.css']
})
export class ListadoTurnosComponent implements OnInit {

  listadoTurnos: ITurno[];
  esAdmin: any = null;
  userUid: string;

  constructor(private dataApi: DataApi2Service, private authService: AuthService) { }

  ngOnInit() {
    this.traerTodos();
    this.traerUsuarioActual();
  }

  traerTodos() {
    this.dataApi.traerTodos()
    .subscribe(listadoTurnos => {
      this.listadoTurnos = listadoTurnos;
    });
  }

  seleccionar(unaMascota: ITurno) {
    this.dataApi.seleccionado = Object.assign({}, unaMascota);
  }

  eliminar(id: string) {
    const confirmacion = confirm('¿Esta seguro que quiere eliminar?');
    if (confirmacion) {
      this.dataApi.eliminar(id);
    }
  }

  traerUsuarioActual() {
    this.authService.isLogeado().subscribe( datosUsuario => {
      if (datosUsuario) {
        this.userUid = datosUsuario.uid; // Nos quedamos con el userid
        this.authService.isAdmin(this.userUid).subscribe (usuario => {
          if (usuario.tipoUsuario === 'administrador') {
            this.esAdmin = true;
          } else {
            this.esAdmin = false;
          }
        });
      }
    });
  }

}
