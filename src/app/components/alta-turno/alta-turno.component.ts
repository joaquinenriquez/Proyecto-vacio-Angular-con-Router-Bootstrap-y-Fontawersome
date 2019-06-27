import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { IMascota } from 'src/app/models/imascota';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.css']
})
export class AltaTurnoComponent implements OnInit {

  unaMascota: IMascota = {};
  @ViewChild('btnCerrar') btnCerrar: ElementRef;
  @ViewChild('fecha') fecha: ElementRef;
  @ViewChild('urlFoto') urlFoto: ElementRef;
  @Input() userUid: string;
  urlImagen: Observable<string>;

  constructor(public dataApi: DataApiService, private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  onGuardar(formulario: NgForm): void {
    if (formulario.value.id === null) { // Si el id es null entonces estamos editando
      formulario.value.userUid = this.userUid;
      formulario.value.foto = this.urlFoto.nativeElement.value;
      this.dataApi.agregar(formulario.value);
    } else {
      this.dataApi.actualizar(formulario.value);
    }

    this.urlImagen = null;
    formulario.resetForm();

    this.btnCerrar.nativeElement.click();

  }

  subirFoto(event) {
    const idFoto = Math.random().toString(14).substring(2);
    const archivo = event.target.files[0];
    const pathDestino = `fotos/foto_${idFoto}`;
    const referenciaArchivo = this.storage.ref(pathDestino);
    const subir = this.storage.upload(pathDestino, archivo);
    subir.snapshotChanges().pipe(finalize(() => this.urlImagen = referenciaArchivo.getDownloadURL())).subscribe();
  }

}
