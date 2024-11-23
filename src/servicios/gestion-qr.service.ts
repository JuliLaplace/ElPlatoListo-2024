import { Injectable } from '@angular/core';
import { QrScannerService } from './qr-scanner.service';
import { Router } from '@angular/router';
import { PedidoService } from './pedido.service';
import { SesionService } from './sesion.service';
import { EstadoPedido } from 'src/app/enumerados/estado-pedido';

@Injectable({
  providedIn: 'root'
})
export class GestionQrService {

  constructor(
    private scanner: QrScannerService,
    private router: Router,
    private pedidoService: PedidoService,
    private sesion: SesionService) 
    { }

  escanear() {
    this.scanner.scanQRcode().then((res) => {
      let codigoQr = res;
      if (this.sesion.usuarioBD) {
        switch (codigoQr) {
          case 'listaEspera':
            this.gestionarQrListaEspera();
            break;
          case 'Mesa1':
            this.gestionarQrMesas(1);
            break;
          case 'Mesa2':
            this.gestionarQrMesas(2);
            break;
          case 'Mesa3':
            this.gestionarQrMesas(3);
            break;
          case 'Mesa4':
            this.gestionarQrMesas(4);
            break;
          case 'Mesa5':
            this.gestionarQrMesas(5);
            break;
          case 'Mesa6':
            this.gestionarQrMesas(6);
            break;
          case '5':
              this.aplicarPropina(5);
              break;
            case '10':
              this.aplicarPropina(10);
              break;
            case '15':
              this.aplicarPropina(15);
              break;
            case '20':
              this.aplicarPropina(20);
              break;
          default:
            break;
        }
      }
    });
  }

  gestionarQrListaEspera() {
    if (this.pedidoService.pedidoUsuario == null && this.sesion.usuarioBD) {
      this.router.navigate(['/pagina-mensajes/listaEspera']);
      this.pedidoService.nuevoPedido(this.sesion.usuarioBD.email);
    } else if (this.pedidoService.pedidoUsuario?.mesa && this.pedidoService.pedidoUsuario?.estadoPedido == EstadoPedido.sinPedido) { 
      this.router.navigate(['/pagina-mensajes/yaTenesMesaAsignada']);
    } else if(this.pedidoService.pedidoUsuario?.estadoPedido == EstadoPedido.sinMesa && this.sesion.usuarioBD) {
      this.router.navigate(['/pagina-mensajes/yaEstasEnListaEspera']);
    }else if(this.pedidoService.pedidoUsuario?.estadoPedido == EstadoPedido.pagoConfirmado && this.sesion.usuarioBD){
      this.router.navigate(['pagina-resultados-encuestas']);
    }
  }

  gestionarQrMesas(nroMesa: number) {
    if (this.pedidoService.pedidoUsuario?.mesa == null) {
      this.router.navigate(['/pagina-mensajes/mesaNoAsignada']);
    } else if (this.pedidoService.pedidoUsuario?.mesa !== nroMesa) {
      this.router.navigate(['/pagina-mensajes/mesaIncorrecta']);
    }else if(this.pedidoService.pedidoUsuario?.mesa == nroMesa && this.pedidoService.pedidoUsuario?.estadoPedido == EstadoPedido.pagado){
      this.router.navigate(['pagina-resultados-encuestas']);
    }else if(this.pedidoService.pedidoUsuario.estadoPedido === EstadoPedido.enPreparacion || this.pedidoService.pedidoUsuario.estadoPedido === EstadoPedido.pedidoListo){
      this.router.navigate(['/pagina-mensajes/estadoPedido']);
    }
    else {
      this.router.navigate(['/cliente-pedido-en-curso']);
    }
  }
  async aplicarPropina(propina: number) {
    await this.pedidoService.aplicarPropina(
      this.pedidoService.pedidoUsuario!,
      propina
    );
  }



 
}
