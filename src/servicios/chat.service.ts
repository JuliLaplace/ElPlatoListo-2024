import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  orderBy,
  query,
  Timestamp,
  where,
} from '@angular/fire/firestore';
import { NotificadorPushService } from './notificador-push.service';

export interface Mensaje {
  uidPedido: string;
  nroMesa: number | null;
  uidUsuario: string;
  mensaje: string;
  fecha: Timestamp | null;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private coleccion: string = 'chats';

  constructor(
    private firestore: Firestore,
    private notificacionPush: NotificadorPushService
  ) {}

  async enviarMensaje(mensaje: Mensaje) {
    if (mensaje.nroMesa) {
      this.notificacionPush.notificarMozoConsultaDeCliente(mensaje.nroMesa);
    }
    mensaje.fecha = Timestamp.fromDate(new Date());
    console.log(mensaje);
    const ref = collection(this.firestore, this.coleccion);
    return addDoc(ref, mensaje).catch((error) =>
      console.error('Error al guardar los chats:', error)
    );
  }

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
}
