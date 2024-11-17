import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

export interface Encuesta{
  id: string,
  email: string | null,
  foto1: string,
  foto2: string,
  foto3: string,
  calidadServicio : number,
  calificacionLimpieza : string,
  aspectoMasValorado : string,
  serviciosAdicionales : ServiciosAdicionales,
  mensaje : string
}

export interface ServiciosAdicionales{
  wifi: boolean,
  musica: boolean,
  juegos: boolean,
  aireLibre: boolean,
}


@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  public coleccionEncuestas: Encuesta[] = [];
  constructor(private firestore: Firestore) { }

  async crearRegistro(encuesta: Encuesta): Promise<string> {
    let col = collection(this.firestore, 'encuestas');
    return await addDoc(col, encuesta).then((ref) => {
      return ref.id;
    });
  }
}
