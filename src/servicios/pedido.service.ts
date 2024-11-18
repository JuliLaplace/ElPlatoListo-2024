import { Injectable } from '@angular/core';
import { DataUsuariosService, Usuario } from './data-usuarios.service';
import { EstadoPedido } from 'src/app/enumerados/estado-pedido';
import { addDoc, collection, collectionData, doc, Firestore, getDocs, query, Timestamp, updateDoc, where, orderBy } from '@angular/fire/firestore';
import { SesionService } from './sesion.service';
import { MesaService } from './mesa.service';
import { timestamp } from 'rxjs';

export interface Pedido {
  id: string,
  mesa: number | null,
  fechaIngreso?: Timestamp,
  emailUsuario: string,
  estadoPedido: EstadoPedido,
  precioTotal: number,
  propina: number,
  descuentoJuego: number,
  tiempoPreparacion: number,
  encuesta: string
}

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  public coleccionPedidos: Pedido[] = [];
  public coleccionPedidosEnEspera: Pedido[] = [];
  public pedidoUsuario: Pedido | null = null;

  constructor(
    private firestore: Firestore,
    private sesion: SesionService,
    public servicioMesa: MesaService
  ) {
    this.obtenerDatos();
  }

  async nuevoPedido(email: string): Promise<string> {
    let pedido: Pedido = {
      id: '',
      mesa: null,
      fechaIngreso: Timestamp.fromDate(new Date()),
      emailUsuario: email,
      estadoPedido: EstadoPedido.sinMesa,
      precioTotal: 0,
      propina: 0,
      descuentoJuego: 0,
      tiempoPreparacion: 0,
      encuesta: '',
    };
    let col = collection(this.firestore, 'pedidos');
    return await addDoc(col, pedido).then((ref) => {
      return ref.id;
    });
  }

  async obtenerPedido(email: string) {
    const col = collection(this.firestore, 'pedidos');
    const pedidoQuery = query(col, where('emailUsuario', '==', email));
    const pedidoSnapshot = await getDocs(pedidoQuery);

    if (!pedidoSnapshot.empty) {
      // Devuelve el primer usuario encontrado, si coindice con el email
      return pedidoSnapshot.docs[0].data() as Usuario;
    }

    // Si no encuentra el usuario
    return null;
  }

  obtenerDatos() {
    let col = collection(this.firestore, 'pedidos');
    let consulta = query(col, orderBy('fechaIngreso'));
    const observable = collectionData(consulta, { idField: 'id' });

    observable.subscribe((respuesta: any) => {
      this.coleccionPedidos = respuesta;
      this.coleccionPedidosEnEspera = this.coleccionPedidos.filter((pedido) => {
        return pedido.estadoPedido == EstadoPedido.sinMesa;
      });

      if (this.sesion.usuarioBD) {
        let array = this.coleccionPedidos.filter((pedido) => {
          return (
            pedido.estadoPedido != EstadoPedido.finalizado &&
            pedido.emailUsuario == this.sesion.usuarioBD?.email
          );
        });
        if (array.length == 0) {
          this.pedidoUsuario = null;
        } else {
          this.pedidoUsuario = array[0];
        }
      }
    });
  }

  modificarPrecioTotalPedido(idPedido: string, precioAModificar: number) {
    // Referencia al documento en la colección "pedidos" con el ID proporcionado
    const docRef = doc(this.firestore, 'pedidos', idPedido);

    // Realizar la actualización del campo `precioTotal`
    return updateDoc(docRef, {
      precioTotal: precioAModificar,
      estadoPedido: EstadoPedido.esperandoMozo
    })
      .then(() => {
        console.log('Pedido actualizado correctamente');
      })
      .catch((error) => {
        console.error('Error al actualizar el pedido:', error);
      });
  }

  private modificarRegistro(pedido: Pedido, data: any) {
    let col = collection(this.firestore, 'pedidos');
    const docRef = doc(col, pedido.id);

    updateDoc(docRef, data);
  }

  private cambiarEstadoPedido(pedido: Pedido, data: any) {
    this.modificarRegistro(pedido, data);
  }

  public cambiarEstadoSinPedido (pedido: Pedido, numeroMesa: number) {
    this.cambiarEstadoPedido(pedido, {
      estadoPedido: EstadoPedido.sinPedido,
      mesa: numeroMesa,
    });
    this.servicioMesa.cambiarMesaOcupada(numeroMesa);
  }

  public esperandoMozo(pedido: Pedido, numeroMesa: number) {
    this.cambiarEstadoPedido(pedido, {
      estadoPedido: EstadoPedido.esperandoMozo,
      mesa: numeroMesa,
    });
    this.servicioMesa.cambiarMesaOcupada(numeroMesa);
  }

  public realizarPedido(pedido: Pedido) {
    // this.cambiarEstadoPedido(pedido, {estadoPedido : EstadoPedido.realizandoPedido});
  }

  public finalizarPedido(pedido: Pedido, numeroMesa: number) {
    this.cambiarEstadoPedido(pedido, {
      estadoPedido: EstadoPedido.finalizado,
      mesa: numeroMesa,
    });
    this.servicioMesa.cambiarMesaLibre(numeroMesa);
  }

  public cargarEncuesta(idEncuesta: string) {
    if (this.pedidoUsuario) {
      this.modificarRegistro(this.pedidoUsuario, { idEncuesta: idEncuesta });
    }
  }

  // aplicarDescuentoPorJuego(pedido: Pedido, porcentaje: number) {
  //   const coleccion = collection(this.firestore, 'pedidos');
  //   const documento = doc(coleccion, pedido.id);

  //   updateDoc(documento, {
  //     descuentoJuego: porcentaje,
  //     total: pedido.total - (pedido.total * porcentaje) / 100 + pedido.propina,
  //   });
  // }

  // aplicarPropina(pedido: Pedido, propina: number): Promise<void> {
  //   const coleccion = collection(this.firestore, 'pedidos');
  //   const documento = doc(coleccion, pedido.id);
  //   const propinaTotal = pedido.total * (propina / 100);
  //   // Aplica el descuento si existe, de lo contrario, no aplica ningún descuento
  //   const descuentoJuegos = pedido.descuentoJuego ? pedido.descuentoJuego : 0;

  //   // Calcula el total incluyendo propina y descuento
  //   const total = pedido.total + propinaTotal - (descuentoJuegos * pedido.total) / 100;

  //   return updateDoc(documento, {
  //     propina: propina,
  //     total: total,
  //   });
  // }
}