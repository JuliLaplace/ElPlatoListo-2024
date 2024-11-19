import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, collectionData, query, where, getDocs, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { EstadoCliente } from 'src/app/enumerados/estado-cliente';
import { TipoUsuario } from 'src/app/enumerados/tipo-usuario';
import { NotificadorPushService } from './notificador-push.service';

export interface Usuario{
  id: string,
  nombre: string,
  apellido: string | null,
  dni : number | null,
  cuil : number | null,
  email: string,
  tipo : TipoUsuario, 
  fotoPerfil: string,
  estado : EstadoCliente | null,
}
@Injectable({
  providedIn: 'root',
})
export class DataUsuariosService {
  public coleccionUsuarios: Usuario[] = [];
  public coleccionClientesPendientes: Usuario[] = [];

  constructor(
    private firestore: Firestore,
    private notificacionPush: NotificadorPushService
  ) {
    this.obtenerDatos();
  }

  async crearRegistro(cliente: Usuario): Promise<string> {
    let col = collection(this.firestore, 'usuarios');
    return await addDoc(col, cliente).then((ref) => {
      this.notificacionPush.enviarMailRegistro(cliente.nombre, cliente.email);
      //PUSH
      if (cliente.tipo == TipoUsuario.cliente) {
        this.notificacionPush.notificarDuenoClienteNuevo();
      }
      return ref.id;
    });
  }

  async obtenerUsuario(email: string) {
    const col = collection(this.firestore, 'usuarios');
    const usuarioQuery = query(col, where('email', '==', email));
    const usuarioSnapshot = await getDocs(usuarioQuery);

    if (!usuarioSnapshot.empty) {
      // Devuelve el primer usuario encontrado, si coindice con el email
      return usuarioSnapshot.docs[0].data() as Usuario;
    }

    // Si no encuentra el usuario
    return null;
  }

  obtenerDatos() {
    let col = collection(this.firestore, 'usuarios');
    const observable = collectionData(col, { idField: 'id' });
    observable.subscribe((respuesta: any) => {
      this.coleccionUsuarios = respuesta;
      this.coleccionClientesPendientes = this.coleccionUsuarios.filter(
        (usuario) => {
          return (
            usuario.tipo == TipoUsuario.cliente &&
            usuario.estado == EstadoCliente.pendiente
          );
        }
      );
    });
  }

  private modificarRegistro(usuario: Usuario, data: any) {
    console.log(usuario);
    let col = collection(this.firestore, 'usuarios');
    const docRef = doc(col, usuario.id);
    updateDoc(docRef, data);
  }

  private cambiarEstadoCliente(usuario: Usuario, estado: EstadoCliente) {
    this.modificarRegistro(usuario, { estado: estado });
  }

  aceptarCliente(usuario: Usuario) {
    this.modificarRegistro(usuario, { estado: EstadoCliente.aceptado });
    this.notificacionPush.enviarMail(true, usuario.nombre, usuario.email);
  }

  rechazarCliente(usuario: Usuario) {
    this.modificarRegistro(usuario, { estado: EstadoCliente.rechazado });
    this.notificacionPush.enviarMail(false, usuario.nombre, usuario.email);
  }
}
