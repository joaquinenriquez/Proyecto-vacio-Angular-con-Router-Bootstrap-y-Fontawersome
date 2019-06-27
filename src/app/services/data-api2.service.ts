import { Injectable } from '@angular/core';
import { ITurno } from '../models/ITurno';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApi2Service {

  /* #region  Constructor */

  constructor(private afs: AngularFirestore) {
    this.coleccion = this.afs.collection<ITurno>('turnos');

    console.log('Inicialice2');
  }

  /* #endregion */


  /* #region  Atributos */

  private coleccion: AngularFirestoreCollection<ITurno>;
  private listaObservable: Observable<ITurno[]>;
  private doc: AngularFirestoreDocument<ITurno>;
  private unaMascotaObservable: Observable<ITurno>;
  public seleccionado: ITurno = {
    id: null
  };

  /* #endregion */

  /* #region  Métodos */

  agregar(unaMascota: ITurno): void {
    this.coleccion.add(unaMascota);
  }

  eliminar(id: string): void {
    this.doc = this.afs.doc<ITurno>(`turnos/${id}`); // Filtramos por id
    this.doc.delete();
  }

  actualizar(unaMascota: ITurno): void {
    const id = unaMascota.id;
    this.doc = this.afs.doc<ITurno>(`turnos/${id}`); // Filtramos por id
    this.doc.update(unaMascota);
  }

  traerTodos() {
    // return this.listaObservable
    return this.listaObservable = this.coleccion.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ITurno;
        data.id = action.payload.doc.id;
        return data;
      });
    })); // todo esto es para poder traernos el id (lo crea automaticamente firebase en nuestra coleccion)
  }

  /* #endregion */

}
