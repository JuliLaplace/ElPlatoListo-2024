import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { EstadoPedido } from 'src/app/enumerados/estado-pedido';
import { Usuario } from 'src/servicios/data-usuarios.service';
import { Pedido, PedidoService } from 'src/servicios/pedido.service';
import { SesionService } from 'src/servicios/sesion.service';
import { addIcons } from 'ionicons';
import { restaurant } from 'ionicons/icons';
import {
  ProductoEnPedido,
  ProductoEnPedidoService,
} from 'src/servicios/productos-en-pedido.service';
import { RouterModule } from '@angular/router';
import { EstadoProductoEnPedido } from 'src/app/enumerados/estado-producto-en-pedido';
import { EstadoColor } from 'src/app/enumerados/estado-color';

@Component({
  selector: 'app-home-mozo',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './home-mozo.component.html',
  styleUrls: ['./home-mozo.component.scss'],
})
export class HomeMozoComponent implements OnInit {
  @Input() usuario!: Usuario | null;
  opcionSeleccionada: string = 'Pedidos';
  estadoPedido: string = 'ACEPTAR'; // Cambia a LISTO -> cuando finalize la preparación

  listaPedidos: Pedido[] = [];
  productosPendientes: any[] = [];
  unProductoPorPedido!: ProductoEnPedido | null;

  constructor(
    public pedidoServicio: PedidoService,
    private productosServicio: ProductoEnPedidoService,
    public sesionServicio: SesionService
  ) {
    addIcons({
      restaurant,
    });
  }

  ngOnInit() {
    this.pedidoServicio.obtenerTodosLosPedidos().subscribe((pedidos) => {
      this.listaPedidos = pedidos;
      console.log(this.listaPedidos);
    });
  }

  cambiarVista(event: any) {
    this.opcionSeleccionada = event.detail.value;
  }

  confirmarPedido(unPedido: Pedido) {
    console.log('Pedidosss', unPedido);

    if (unPedido.estadoPedido === EstadoPedido.esperandoMozo){
      this.pedidoServicio.pedidoAceptado(unPedido);
      this.productosServicio.cambiarEstadoPorIdPedido(
        unPedido.id,
        EstadoProductoEnPedido.pendiente
      );
    } else if (unPedido.estadoPedido === EstadoPedido.pedidoListo) {
      this.pedidoServicio.entregandoPedido(unPedido);
    } else if (unPedido.estadoPedido === EstadoPedido.pagado) {
      //Si el Cliente pago la cuenta cambia el Estado a Pagado
      //Confirmo el pago ---> Cambia estado a Finalizado y libero la mesa
      this.pedidoServicio.confirmarPago(unPedido,unPedido.mesa);
    }
  }

  cambioEstadoColor(status: string) {
    let color: string = EstadoColor.SinPedido;
    switch (status) {
      case EstadoPedido.esperandoMozo:
        color = EstadoColor.EsperandoMozo;
        break;
      case EstadoPedido.enPreparacion:
        color = EstadoColor.EnPreparacion;
        break;
      case EstadoPedido.pedidoListo:
        color = EstadoColor.PedidoListo;
        break;
      case EstadoPedido.aceptoPedido:
        color = EstadoColor.Aceptado;
        break;
      case EstadoPedido.pagado:
        color = EstadoColor.Pagado;
        break;
      case EstadoPedido.pagoConfirmado:
        color = EstadoColor.pagoConfirmado
        break;
    }
    return color;
  }

  obtenerEstado(estadoPedido: string): string {
    let estadoAMostrar = "";
    if (estadoPedido === EstadoPedido.esperandoMozo) {
      estadoAMostrar = "Confirmar pedido";
    } else if (estadoPedido === EstadoPedido.pedidoListo) {
      estadoAMostrar = "Listo para entregar";
    } else if (estadoPedido === EstadoPedido.pagado) {
      estadoAMostrar = "Verificar Pago";
    } else {
      estadoAMostrar = estadoPedido;
    }
    return estadoAMostrar;
  }
}