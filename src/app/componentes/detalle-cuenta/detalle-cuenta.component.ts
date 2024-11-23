import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pedido, PedidoService } from 'src/servicios/pedido.service';
import { ProductoEnPedidoService } from 'src/servicios/productos-en-pedido.service';
import { SesionService } from 'src/servicios/sesion.service';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TabsComponent } from '../tabs/tabs.component';
import { MenuService } from 'src/servicios/menu.service';
import { EstadoPedido } from 'src/app/enumerados/estado-pedido';
import { SpinnerService } from 'src/servicios/spinner.service';
import { AudioService } from 'src/servicios/audio.service';
import { addIcons } from 'ionicons';
import { qrCodeOutline } from 'ionicons/icons';
import { GestionQrService } from 'src/servicios/gestion-qr.service';

@Component({
  selector: 'app-detalle-cuenta',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, TabsComponent],
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.scss'],
})
export class DetalleCuentaComponent implements OnInit {
  listaPedidos: any[] = [];
  cantidad: number = 0;
  precioUnitario: number = 0;
  nombre: string = '';
  // propina: number = 0;

  constructor(
    public pedidoService: PedidoService,
    private productosServicio: ProductoEnPedidoService,
    private menuServicio: MenuService,
    public sesion: SesionService,
    private spinnerServicio: SpinnerService,
    private audioServicio: AudioService,
    private router: Router,
    public qrService: GestionQrService
  ) {
    addIcons({
      qrCodeOutline,
    });
  }

  ngOnInit() {
    this.productosServicio
      .obtenerProductosPorPedido(this.pedidoService.pedidoUsuario?.id)
      .then(async (detalle) => {
        this.listaPedidos = detalle;
        // Iteraro sobre cada producto para obtener su precio unitario desde la colección 'menu'
        for (const producto of this.listaPedidos) {
          const precio = await this.menuServicio.obtenerPrecioProducto(
            producto.idProducto
          );

          // Agregar el precio unitario al objeto del producto de MI LISTA LOCAL y calculo el subtotal
          if (precio !== null) {
            producto.precioUnitario = precio;
            producto.subtotal = producto.cantidad * precio; // Cantidad * Precio Unitario
          }
        }
      });
      console.log(this.listaPedidos)
  }

  pagarCuenta(unPedido: Pedido) {
    console.log('Pedidosss', unPedido);
    this.pedidoService.pagarPedido(unPedido, unPedido.mesa);
    this.audioServicio.reporoduccionPago();
    this.spinnerServicio.mostrarMensaje({
      message: 'Pago exitoso',
      duration: 1500,
      color: 'success',
      position: 'middle',
    });
    this.router.navigate(['/home']);
  }
}
