import { Injectable } from '@angular/core';
import { DataUsuariosService, Usuario } from './data-usuarios.service';
import { EstadoProductoEnPedido } from 'src/app/enumerados/estado-producto-en-pedido';
import { addDoc, collection, collectionData, doc, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { SesionService } from './sesion.service';
import { Pedido } from './pedido.service';
import { map, Observable } from 'rxjs';
import { EstadoPedido } from 'src/app/enumerados/estado-pedido';

export interface ProductoEnPedido{
  id: string,
  idPedido: string,
  idProducto: string,
  cantidad: number,
  estado: EstadoProductoEnPedido,
  nombreProducto: string,
  sector: string
}
@Injectable({
  providedIn: 'root',
})
export class ProductoEnPedidoService {
  public coleccionProductosEnPedido: ProductoEnPedido[] = [];
  //   public coleccionPedidosEnEspera: Pedido[] = [];
  //   public pedidoUsuario : Pedido | null = null;

  constructor(private firestore: Firestore, private sesion: SesionService) {
    // this.obtenerDatos();
  }

  async agregarProductoEnPedido(
    idPedido: string,
    idProducto: string,
    cantidad: number,
    nombreProducto: string,
    sector: string
  ): Promise<string> {
    let productoEnPedido: ProductoEnPedido = {
      id: '',
      idPedido: idPedido,
      idProducto: idProducto,
      cantidad: cantidad,
      estado: EstadoProductoEnPedido.sinConfirmar,
      nombreProducto: nombreProducto,
      sector: sector,
    };
    let col = collection(this.firestore, 'productosEnPedido');
    return await addDoc(col, productoEnPedido).then((ref) => {
      return ref.id;
    });
  }

  //   async obtenerPedido(email: string) {
  //     const col = collection(this.firestore, 'pedidos');
  //     const pedidoQuery = query(col, where('emailUsuario', '==', email));
  //     const pedidoSnapshot = await getDocs(pedidoQuery);

  //     if (!pedidoSnapshot.empty) {
  //       // Devuelve el primer usuario encontrado, si coindice con el email
  //       return pedidoSnapshot.docs[0].data() as Usuario;
  //     }

  //     // Si no encuentra el usuario
  //     return null;
  //   }

  //   obtenerDatos(){
  //     let col = collection(this.firestore, 'pedidos');
  //     const observable = collectionData(col, {idField: 'id'});
  //     observable.subscribe((respuesta:any) => {
  //       this.coleccionPedidos = respuesta;
  //       this.coleccionPedidosEnEspera = this.coleccionPedidos.filter((pedido)=>{return (pedido.estadoPedido == EstadoPedido.sinMesa)});

  //       if(this.sesion.usuarioBD){
  //         let array = this.coleccionPedidos.filter((pedido)=>{return (pedido.estadoPedido != EstadoPedido.finalizado && pedido.emailUsuario == this.sesion.usuarioBD?.email)});
  //         if(array.length == 0){
  //           this.pedidoUsuario=null;
  //         }else{
  //           this.pedidoUsuario = array[0];
  //         }
  //       }
  //     })
  //   }

  //   private modificarRegistro(pedido : Pedido, data: any) {

  //     let col = collection(this.firestore, 'pedidos');
  //     const docRef = doc(col, pedido.id);

  //     updateDoc(docRef, data);
  //   }
  //   private cambiarEstadoPedido(pedido : Pedido, data : any ){
  //     this.modificarRegistro(pedido, data);
  //   }

  //   public esperandoMozo(pedido: Pedido, numeroMesa : number){
  //     this.cambiarEstadoPedido(pedido, {estadoPedido: EstadoPedido.esperandoMozo, mesa: numeroMesa});
  //     this.servicioMesa.cambiarMesaOcupada(numeroMesa);

  //   }
  //   public realizarPedido(pedido: Pedido){
  //     this.cambiarEstadoPedido(pedido, {estadoPedido : EstadoPedido.realizandoPedido});
  //   }
  //   public finalizarPedido(pedido: Pedido, numeroMesa : number){
  //     this.cambiarEstadoPedido(pedido, {estadoPedido: EstadoPedido.finalizado, mesa: numeroMesa});
  //     this.servicioMesa.cambiarMesaLibre(numeroMesa);
  //   }

  private modificarRegistro(producto: ProductoEnPedido, data: any) {
    let col = collection(this.firestore, 'productosEnPedido');
    const docRef = doc(col, producto.id);

    updateDoc(docRef, data)
      .then(() => {
        console.log(`Productos ${producto.id} actualizado a ${data.estado}.`);
      })
      .catch((error) => {
        console.error('Error al actualizar el producto: ', error);
      });
  }

  private cambiarEstadoProducto(producto: ProductoEnPedido, data: any) {
    this.modificarRegistro(producto, data);
  }

  public actualizarEstadoPendiente(producto: ProductoEnPedido) {
    this.cambiarEstadoProducto(producto, {
      estadoproducto: EstadoProductoEnPedido.pendiente,
    });
  }

  async obtenerProductoPorPedido(unPedido: string) {
    const col = collection(this.firestore, 'productosEnPedido');
    const pedidoQuery = query(col, where('idPedido', '==', unPedido));
    const pedidoSnapshot = await getDocs(pedidoQuery);

    if (!pedidoSnapshot.empty) {
      // Devuelve el primer usuario encontrado, si coindice con el email
      return pedidoSnapshot.docs[0].data() as ProductoEnPedido;
    }
    // Si no encuentra el usuario
    return null;
  }

  async cambiarEstadoPorIdPedido(idPedido: string, nuevoEstado: EstadoProductoEnPedido): Promise<void> {
    try {
      // Referencia a la colección 'productosEnPedido'
      const productosCollection = collection(this.firestore, 'productosEnPedido');
      
      // Crear una query para filtrar los productos con el idPedido
      const q = query(productosCollection, where('idPedido', '==', idPedido));
      // Obtener los documentos que coinciden con la query
      const querySnapshot = await getDocs(q);

      // Recorrer los documentos y actualizar el campo 'estado'
      const batchUpdates = querySnapshot.docs.map((docSnapshot) => {
        const productoRef = doc(this.firestore, 'productosEnPedido', docSnapshot.id);
        return updateDoc(productoRef, { estado: nuevoEstado });
      });
      // Esperar a que todas las actualizaciones se completen
      await Promise.all(batchUpdates);

      console.log(`Se han actualizado los estados de los productos con idPedido: ${idPedido}`);
    } catch (error) {
      console.error('Error al cambiar el estado de los productos:', error);
    }
  }



  public actualizarEstadoPreparacion(producto: ProductoEnPedido) {
    this.cambiarEstadoProducto(producto, {
      estado: EstadoProductoEnPedido.enPreparacion,
    });
  }

  public actualizarEstadoListoEntregar(producto: ProductoEnPedido) {
    this.cambiarEstadoProducto(producto, {
      estado: EstadoProductoEnPedido.listoParaEntregar,
    });
  }

  obtenerTodosLosProductosPendientes(): Observable<any[]> {
    let col = collection(this.firestore, 'productosEnPedido');
    return collectionData(col, { idField: 'id' }).pipe(
      map((pedidos: any[]) =>
        pedidos.filter(
          (pedido) => pedido.estado === EstadoProductoEnPedido.pendiente
        )
      )
    );
  }
}
