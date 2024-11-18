import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { EstadoPedido } from 'src/app/enumerados/estado-pedido';
import { Usuario } from 'src/servicios/data-usuarios.service';
import { Pedido, PedidoService } from 'src/servicios/pedido.service';
import { SesionService } from 'src/servicios/sesion.service';
import { addIcons } from 'ionicons';
import { restaurant } from 'ionicons/icons';
import { ProductoEnPedido, ProductoEnPedidoService } from 'src/servicios/productos-en-pedido.service';

@Component({
  selector: 'app-home-mozo',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home-mozo.component.html',
  styleUrls: ['./home-mozo.component.scss'],
})
export class HomeMozoComponent implements OnInit {
  @Input() usuario!: Usuario | null;
  opcionSeleccionada: string = 'Pedidos';
  estadoPedido: string = 'ACEPTAR'; // Cambia a LISTO -> cuando finalize la preparación

  listaPedidos: Pedido[] = [];
  productosPendientes: any[] = [];

  constructor(private pedidoServicio: PedidoService, private productosServicio: ProductoEnPedidoService, public sesionServicio: SesionService) {
    addIcons({
      restaurant,
    });
  }

  ngOnInit() {
    this.pedidoServicio.obtenerTodosLosPedidos().subscribe((pedidos) => {
      this.listaPedidos = pedidos;
    });
  }

  cambiarVista(event: any) {
    this.opcionSeleccionada = event.detail.value;
  }

  confirmarPedido(unPedido: Pedido){
    console.log("Pedido", unPedido);
    this.pedidoServicio.pedidoAceptado(unPedido);
    //this.productosServicio.actualizarEstadoPendiente();
  }

  derivarMozo(){

  }
}




  /*
    1 - MOZO 
      -> Tiene una lista de los pedidos  
      -> Filtra por Pendientes
      -> Acepta un pedido : Cambia estado a 'Pedido en preparación' (LO QUE EL CLIENTE VISUALI
      ** CLIENTE VUELVE A ESCANEAR QR MESA PARA VER EL ESTADO DE SU PEDIDO **          

    2 - MOZO 
      -> Se lo deriva según corresponda BARTENDER O COCINERO.
      ** CLIENTE VUELVE A ESCANEAR EL QR MESA (opcional: juegos) ACCEDE A LA ENCUESTA (anteriores) Y VER EL ESTADO DE SU PEDIDO 
    
    3 - BARTENDER O COCINER 
      -> Acepta el producto: Cambia estado a 'En preparación'
      -> Cuando finalizan: Cambia estado a 'Listo para entregar' 
      -> ***** Lista de Productos ( Productos en Pedido ) ***** 

    4 - MOZO 
      -> Verifica el estado del producto 
      -> Cambia estado a 'Entregado' (Del BARTENDER O COCINERO)
      -> Cambia estado a 'Pedido Listo' (LO QUE EL CLIENTE VISUALIS
      ** EL CLIENTE VUELVE A ESCANEAR EL QR MESA PARA  VER EL ESTADO DE SU PEDIDO **

    5 - CLIENTE 
      -> Cambia estado a 'Pedido Aceptado' (confirma recepción del pedido)
      ** CLIENTE VUELVE A ESCANEAR EL QR MESA (opcional: juegos) ACCEDE A LA ENCUESTA Y VER EL CAMBIO DE ESTADO DE SU PEDIDO **
      *EN CASO QUE HAYA COMPLETADO LA ENCUESTA : SI ESCANEA EL QR PODRA VISUALIZAR EL RESULTADO DE SU ENCUESTA EN GRAFICOS*
      ** SE LE HABILITA 'PEDIR CUENTA (PAGAR)'

    ---------------------------------------------------------------------------------------      
    
    6 - MOZO 
      -> Lista de Pedidos: (Habria que filtrar por los que tiene 'Pedido Aceptado' para saber que pedidos estan en condiciones de pagar??) 

    7 - CLIENTE 
      -> Pide la cuenta (Paga)
      ** SE HABILITA UN QR PARA AGREGAR PROPINA ** ¿¿ TAMBIEN PUEDE PAGAR POR QR ??? 
      ** Mensaje alusivo a que se pago con éxito (sonido + sweetAlert) **

    8 - MOZO 
      -> Cambia el estado a 'PAGADO' del pedido (Confirma el pago)-> Lo borra de su lista de pedidos
      -> Se libera la mesa

     ** CLIENTE VUELVE A ESCANERAR EL QR MESA PARA VERIFICAR QUE ESTE LIBRE LA MESA **

    9 - CLIENTE 
      -> Escanea el QR "LISTA DE ESPERA"?? o se refiere al de INGRESO AL LOCAL?? 
      -> Se habilita para ver los resultados de las encuestas (graficos)

      sub 9 - Si el CLIENTE vuelve a escanear (DEBERIA MOSTRAR MENSAJE ALUSIVO QUE LA CUENTA ESTA PAGADA)
      **Usar: SweetAlert (NO LO PIDE QUE LO MOSTREMOS - SE DESCARTA XD )
   

  */
