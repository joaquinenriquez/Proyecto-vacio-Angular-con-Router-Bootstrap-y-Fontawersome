import { Injectable, OnInit } from '@angular/core';
import { IMascota } from '../models/imascota';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataApiService implements OnInit {

  /* #region  Constructor */

  constructor(private afs: AngularFirestore) {
    this.coleccion = this.afs.collection<IMascota>('mascotas');

    console.log('Inicialice');
  }

  /* #endregion */

  ngOnInit(): void {

  }

  /* #region  Atributos */

  private coleccion: AngularFirestoreCollection<IMascota>;
  private listaObservable: Observable<IMascota[]>;
  private doc: AngularFirestoreDocument<IMascota>;
  private unaMascotaObservable: Observable<IMascota>;
  public seleccionado: IMascota = {
    id: null
  };

  /* #endregion */

  /* #region  Métodos */

  agregar(unaMascota: IMascota): void {
    this.coleccion.add(unaMascota);
  }

  eliminar(id: string): void {
    this.doc = this.afs.doc<IMascota>(`mascotas/${id}`); // Filtramos por id
    this.doc.delete();
  }

  actualizar(unaMascota: IMascota): void {
    const id = unaMascota.id;
    this.doc = this.afs.doc<IMascota>(`mascotas/${id}`); // Filtramos por id
    this.doc.update(unaMascota);
  }

  traerTodos() {
    // return this.listaObservable
    return this.listaObservable = this.coleccion.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as IMascota;
        data.id = action.payload.doc.id;
        return data;
      });
    })); // todo esto es para poder traernos el id (lo crea automaticamente firebase en nuestra coleccion)
  }

  /* #endregion */

}
