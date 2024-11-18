import { Injectable } from '@angular/core';
import { DataUsuariosService, Usuario } from './data-usuarios.service';
import { EstadoPedido } from 'src/app/enumerados/estado-pedido';
import { addDoc, collection, collectionData, doc, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { SesionService } from './sesion.service';
import { MesaService } from './mesa.service';

export interface Pedido{
  id: string,
  mesa: number | null,
  emailUsuario: string,
  estadoPedido: EstadoPedido,
  encuesta : string,
}
@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  public coleccionPedidos: Pedido[] = [];
  public coleccionPedidosEnEspera: Pedido[] = [];
  public pedidoUsuario : Pedido | null = null;

  constructor(private firestore: Firestore, private sesion : SesionService, public servicioMesa : MesaService) { 

    this.obtenerDatos();
  }

  async nuevoPedido(email: string): Promise<string> {
    let pedido : Pedido = {id:'', mesa: null, emailUsuario: email, estadoPedido: EstadoPedido.sinMesa, encuesta: ''};
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

  obtenerDatos(){
    let col = collection(this.firestore, 'pedidos');
    const observable = collectionData(col, {idField: 'id'});
    observable.subscribe((respuesta:any) => {
      this.coleccionPedidos = respuesta;
      this.coleccionPedidosEnEspera = this.coleccionPedidos.filter((pedido)=>{return (pedido.estadoPedido == EstadoPedido.sinMesa)});
      
      if(this.sesion.usuarioBD){
        let array = this.coleccionPedidos.filter((pedido)=>{return (pedido.estadoPedido != EstadoPedido.finalizado && pedido.emailUsuario == this.sesion.usuarioBD?.email)});
        if(array.length == 0){
          this.pedidoUsuario=null;
        }else{
          this.pedidoUsuario = array[0];
        }
      }
    })

  }
  private modificarRegistro(pedido : Pedido, data: any) {
    
    let col = collection(this.firestore, 'pedidos');
    const docRef = doc(col, pedido.id);
    
    updateDoc(docRef, data);
  }

  private cambiarEstadoPedido(pedido : Pedido, data : any ){
    this.modificarRegistro(pedido, data);
  }

  public esperandoMozo(pedido: Pedido, numeroMesa : number){
    this.cambiarEstadoPedido(pedido, {estadoPedido: EstadoPedido.esperandoMozo, mesa: numeroMesa});
    this.servicioMesa.cambiarMesaOcupada(numeroMesa); 
    
  }
  public realizarPedido(pedido: Pedido){
    // this.cambiarEstadoPedido(pedido, {estadoPedido : EstadoPedido.realizandoPedido});
  }
  public finalizarPedido(pedido: Pedido, numeroMesa : number){
    this.cambiarEstadoPedido(pedido, {estadoPedido: EstadoPedido.finalizado, mesa: numeroMesa});
    this.servicioMesa.cambiarMesaLibre(numeroMesa); 
  }

  public cargarEncuesta(idEncuesta: string){
    if(this.pedidoUsuario){
      this.modificarRegistro( this.pedidoUsuario, {idEncuesta : idEncuesta});
    }
  }

  
}
