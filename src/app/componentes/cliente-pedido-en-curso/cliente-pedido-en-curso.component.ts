import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DataUsuariosService } from 'src/servicios/data-usuarios.service';
import { SesionService } from 'src/servicios/sesion.service';
import { TabsComponent } from '../tabs/tabs.component';
import { PedidoService, Pedido } from 'src/servicios/pedido.service';
import { RouterModule } from '@angular/router';
import { ProductoEnPedidoService } from 'src/servicios/productos-en-pedido.service';
import { EstadoProductoEnPedido } from 'src/app/enumerados/estado-producto-en-pedido';
import { EstadoPedido } from 'src/app/enumerados/estado-pedido';
import { NotificadorPushService } from 'src/servicios/notificador-push.service';

@Component({
  selector: 'app-cliente-pedido-en-curso',
  templateUrl: './cliente-pedido-en-curso.component.html',
  styleUrls: ['./cliente-pedido-en-curso.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TabsComponent, RouterModule],
})
export class ClientePedidoEnCursoComponent implements OnInit {
  constructor(
    public sesion: SesionService,
    public dataUsuario: DataUsuariosService,
    public pedidoService: PedidoService,
    private productosServicio: ProductoEnPedidoService,
    private pushNotification: NotificadorPushService
  ) {}

  ngOnInit() {}

  confirmarPedido(unPedido: Pedido | null) {
    if (unPedido?.estadoPedido === EstadoPedido.entregandoPedido) {
      this.pedidoService.pedidoAceptadoPorCliente(unPedido);
      this.productosServicio.cambiarEstadoPorIdPedido(
        unPedido.id,
        EstadoProductoEnPedido.entregado
      );
    } else if (unPedido?.estadoPedido === EstadoPedido.aceptoPedido) {
      this.pedidoService.clientePideLaCuenta(unPedido);
      this.pushNotification.notificarMozoPedidoDeCuenta(unPedido.mesa);
    }
  }
}
