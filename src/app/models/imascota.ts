

enum TipoAnimal {'Perro', 'Gato', 'Huron'}

export interface IMascota {
  id?: string;
  tipo?: TipoAnimal;
  raza?: string;
  nombre?: string;
  edad?: string;
  duenio?: string;
  foto?: string;
  userUid?: string;
}
