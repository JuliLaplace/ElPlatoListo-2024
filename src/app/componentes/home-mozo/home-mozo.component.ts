import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { EstadoPedido } from 'src/app/enumerados/estado-pedido';
import { Usuario } from 'src/servicios/data-usuarios.service';
import { Pedido, PedidoService } from 'src/servicios/pedido.service';
import { SesionService } from 'src/servicios/sesion.service';
import { addIcons } from 'ionicons';
import { restaurant } from 'ionicons/icons';
import { ProductoEnPedido } from 'src/servicios/productos-en-pedido.service';

@Component({
  selector: 'app-home-mozo',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home-mozo.component.html',
  styleUrls: ['./home-mozo.component.scss'],
})
export class HomeMozoComponent implements OnInit {
  @Input() usuario!: Usuario | null;
  opcionSeleccionada: string = 'Pendientes';
  estadoPedido: string = 'PREPARACIÓN'; // Cambia a LISTO -> cuando finalize la preparación

  listaPedidosPendientes: any[] = [
    {
      id: '123',
      mesa: 1,
      fechaIngreso: new Date('2024-11-15'),
      emailUsuario: 'Camila Roman',
      estadoPedido: EstadoPedido.enPreparacion,
      total: 6000,
    },
    {
      id: '124',
      mesa: 2,
      fechaIngreso: new Date('2024-11-16'),
      emailUsuario: 'Camila Roman',
      estadoPedido: EstadoPedido.finalizado,
      total: 4000,
    },
  ];
  listaMisPedidos: any[] = [];
  productosPendientes: any[] = [];

  constructor(
    private pedidoServicio: PedidoService,
    public sesionServicio: SesionService
  ) {
    addIcons({
      restaurant,
    });
  }

  ngOnInit() {}

  cambiarVista(event: any) {
    this.opcionSeleccionada = event.detail.value;
  }

  //Filtrar Pedidos -> Mesa activas

  aceptarPedido(unPedido: Pedido) {
    // this.pedidoServicio.asignarPedidoMozo(
    //   unPedido,
    //   this.sesionServicio.usuarioBD?.id
    // );
    this.listaMisPedidos.push();
  }

  enPreparacion(unProducto: ProductoEnPedido) {
  }

  confirmarPedido(pedido: Pedido) {
  }

  finalizarPedido(pedido: Pedido){
  }
}
