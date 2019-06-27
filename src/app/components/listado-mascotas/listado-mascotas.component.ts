import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { IMascota } from 'src/app/models/imascota';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listado-mascotas',
  templateUrl: './listado-mascotas.component.html',
  styleUrls: ['./listado-mascotas.component.css']
})
export class ListadoMascotasComponent implements OnInit {

  listadoMascotas: IMascota[];
  esAdmin: any = null;
  userUid: string;

  constructor(private dataApi: DataApiService, private authService: AuthService) { }

  ngOnInit() {
    this.traerTodos();
    this.traerUsuarioActual();
  }

  traerTodos() {
    this.dataApi.traerTodos()
    .subscribe(listadoMascotas => {
      this.listadoMascotas = listadoMascotas;
    });
  }

  seleccionar(unaMascota: IMascota) {
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
