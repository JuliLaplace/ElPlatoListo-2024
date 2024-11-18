import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addDoc, and, collection, collectionData, Firestore, orderBy, query, where } from '@angular/fire/firestore';

export interface Mensaje {
  uidPedido: string;
  nroMesa: number | null;
  uidUsuario: string;
  mensaje: string;
  fecha: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private coleccion: string = 'chats';
  constructor(private firestore: Firestore) {}

  async enviarMensaje(mensaje: Mensaje) {
    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, mensaje).catch((error) =>
      console.error('Error al guardar los chats:', error)
    );
  }

  // registrarMensaje(salaId: string, usuario: string, mensaje: string) {
  //   let col = collection(this.firestore, 'chat');
  //   addDoc(col, {
  //     fecha: new Date(),
  //     salaId: salaId,
  //     usuario: usuario,
  //     mensaje: mensaje,
  //   });
  // }

  getMensajes(uidPedido: string) {
    let col = collection(this.firestore, this.coleccion);
    const filteredQuery = query(
      col,
      where('uidPedido', '==', uidPedido),
      orderBy('fecha', 'asc')
    );
    const observable = collectionData(filteredQuery);
    return observable;
  }

  // obtenerMensajesMesa(nroPedido: number): Observable<Mensaje[]> {
  //   // Obtener mensajes específicos de una mesa
  //   const ref = collection(this.firestore, this.coleccion);
  //   const queryAll = query(
  //     ref,
  //     where('nroPedido', '==', nroPedido),
  //     orderBy('fecha', 'asc')
  //   );
  //   return collectionData(queryAll, { idField: 'uid' }) as Observable<
  //     Mensaje[]
  //   >;
  // }

  // obtenerTodosLosMensajes(): Observable<Mensaje[]> {
  //   // Obtener todos los mensajes (vista del mozo)
  //   const ref = collection(this.firestore, this.coleccion);
  //   const consulta = query(ref, orderBy('fecha', 'asc'));
  //   return collectionData(consulta, { idField: 'uid' }) as Observable<
  //     Mensaje[]
  //   >;
  // }
}
