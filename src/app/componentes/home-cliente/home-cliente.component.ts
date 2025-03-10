import { Component, Input } from '@angular/core';
import { Usuario } from 'src/servicios/data-usuarios.service';
import { IonicModule } from '@ionic/angular';
import { QrScannerService } from 'src/servicios/qr-scanner.service';
import { Router, RouterLink } from '@angular/router';
import { PedidoService } from 'src/servicios/pedido.service';
import { GestionQrService } from 'src/servicios/gestion-qr.service';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class HomeClienteComponent {
  @Input() usuario!: Usuario | null;

  constructor(
    // private scanner: QrScannerService,
    // private router: Router,
    // private pedidoService: PedidoService
    private qrServicio : GestionQrService
  ) {}


  escanear(){
    this.qrServicio.escanear();
  }
  // escanear() {
  //   this.scanner.scanQRcode().then((res) => {
  //     let codigoQr = res;
  //     if (this.usuario) {
  //       switch (codigoQr) {
  //         case 'listaEspera':
  //           this.gestionarQrListaEspera();
  //           break;
  //         case 'Mesa1':
  //           this.gestionarQrMesas(1);
  //           break;
  //         case 'Mesa2':
  //           this.gestionarQrMesas(2);
  //           break;
  //         case 'Mesa3':
  //           this.gestionarQrMesas(3);
  //           break;
  //         case 'Mesa4':
  //           this.gestionarQrMesas(4);
  //           break;
  //         case 'Mesa5':
  //           this.gestionarQrMesas(5);
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //   });
  // }

  // gestionarQrListaEspera() {
  //   if (this.pedidoService.pedidoUsuario == null) {
  //     this.router.navigate(['/pagina-mensajes/listaEspera']);
  //     this.pedidoService.nuevoPedido(this.usuario!.email);
  //   } else if (this.pedidoService.pedidoUsuario?.mesa) { 
  //     this.router.navigate(['/pagina-mensajes/yaTenesMesaAsignada']);
  //   } else {
  //     this.router.navigate(['/pagina-mensajes/yaEstasEnListaEspera']);
  //   }
  // }

  // gestionarQrMesas(nroMesa: number) {
  //   if (this.pedidoService.pedidoUsuario?.mesa == null) {
  //     this.router.navigate(['/pagina-mensajes/mesaNoAsignada']);
  //   } else if (this.pedidoService.pedidoUsuario?.mesa !== nroMesa) {
  //     this.router.navigate(['/pagina-mensajes/mesaIncorrecta']);
  //   } else {
  //     this.router.navigate(['/cliente-pedido-en-curso']);
  //   }
  // }
}
