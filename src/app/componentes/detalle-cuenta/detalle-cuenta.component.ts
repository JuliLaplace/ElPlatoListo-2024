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
import { QrScannerService } from 'src/servicios/qr-scanner.service';

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
  propina: number = 0;

  constructor(
    public pedidoService: PedidoService,
    private productosServicio: ProductoEnPedidoService,
    private menuServicio: MenuService,
    public sesion: SesionService,
    private spinnerServicio: SpinnerService,
    private audioServicio: AudioService,
    private scanner: QrScannerService,
    private router: Router
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

  // agregarPropina() {
  //   this.scanner.scanQRcode().then((res) => {
  //     let codigoQr = res;
  //     if (this.sesion.usuarioActual) {
  //       switch (codigoQr) {
  //         case '5':
  //           this.propina = 5;
  //           this.aplicarPropina(5);
  //           break;
  //         case '10':
  //           this.propina = 10;
  //           this.aplicarPropina(10);
  //           break;
  //         case '15':
  //           this.propina = 15;
  //           this.aplicarPropina(15);
  //           break;
  //         case '20':
  //           this.propina = 20;
  //           this.aplicarPropina(20);
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //   });
  // }

  // // Método para aplicar la propina
  // async aplicarPropina(propina: number) {
  //   await this.pedidoService.aplicarPropina(
  //     this.pedidoService.pedidoUsuario!,
  //     propina
  //   );
  //   // Aquí puedes agregar lógica adicional si es necesario
  //   console.log(`Propina de ${propina}% aplicada al pedido.`);
  // }
}
