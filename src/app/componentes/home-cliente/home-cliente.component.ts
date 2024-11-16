import { Component, Input } from '@angular/core';
import { Usuario } from 'src/servicios/data-usuarios.service';
import { IonicModule } from '@ionic/angular';
import { QrScannerService } from 'src/servicios/qr-scanner.service';
import { Router } from '@angular/router';
import { PedidoService } from 'src/servicios/pedido.service';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomeClienteComponent  {

  @Input() usuario!: Usuario | null;
  
  constructor(private scanner : QrScannerService, private router: Router, private pedidoService: PedidoService) { }
  // codigoQr: string ='';

  escanear() {
    this.scanner.scanQRcode()
    .then((res)=>{
      let codigoQr = res;
      if (this.usuario) {
        switch(codigoQr){
          case "listaEspera":
            this.gestionarQrListaEspera();
            break; 
   
          default:
            break;
        }
        
      }
    })
  }

  gestionarQrListaEspera(){
    if(this.pedidoService.pedidoUsuario== null){
      this.router.navigate(['/pagina-mensajes']);
      this.pedidoService.nuevoPedido(this.usuario!.email);
    }else{
      this.router.navigate(['/encuestas']);
    }
  }
  
  gestionarQrMesas(){
    // if(this.pedidoService.pedidoUsuario == null){
    //   this.router.navigate(['/pagina-mensajes']);
    //   this.pedidoService.nuevoPedido(this.usuario!.email);
    // }else{
    //   this.router.navigate(['/encuestas']);
    // }
  }

}
