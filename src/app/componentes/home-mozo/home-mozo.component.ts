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
    this.pedidoServicio.pedidoAceptado(unPedido);
    this.productosServicio.cambiarEstadoPorIdPedido(
      unPedido.id,
      EstadoProductoEnPedido.pendiente
    );
  }
}