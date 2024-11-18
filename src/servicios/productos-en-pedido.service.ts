import { Injectable } from '@angular/core';
import { DataUsuariosService, Usuario } from './data-usuarios.service';
import { EstadoProductoEnPedido } from 'src/app/enumerados/estado-producto-en-pedido';
import { addDoc, collection, collectionData, doc, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { SesionService } from './sesion.service';

export interface ProductoEnPedido{
  id: string,
  idPedido: string,
  idProducto: string,
  cantidad: number,
  estado: EstadoProductoEnPedido
}
@Injectable({
  providedIn: 'root'
})
export class ProductoEnPedidoService {

  public coleccionProductosEnPedido: ProductoEnPedido[] = [];
//   public coleccionPedidosEnEspera: Pedido[] = [];
//   public pedidoUsuario : Pedido | null = null;

  constructor(private firestore: Firestore, private sesion : SesionService) { 

    // this.obtenerDatos();
  }

  async agregarProductoEnPedido(idPedido: string, idProducto: string, cantidad:number): Promise<string> {
    let productoEnPedido : ProductoEnPedido = {id:'', idPedido: idPedido, idProducto: idProducto, cantidad: cantidad, estado: EstadoProductoEnPedido.sinConfirmar};
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

  
}
