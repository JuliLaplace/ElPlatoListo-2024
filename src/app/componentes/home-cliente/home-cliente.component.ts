import { Component, Input } from '@angular/core';
import { Usuario } from 'src/servicios/data-usuarios.service';
import { IonicModule } from '@ionic/angular';
import { QrScannerService } from 'src/servicios/qr-scanner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomeClienteComponent  {

  @Input() usuario!: Usuario | null;
  
  constructor(private scanner : QrScannerService, private router: Router) { }
  codigoQr: string ='';

  escanear() {
    this.scanner.scanQRcode()
    .then((res)=>{
      let codigoQr = res;
      if (codigoQr === "ABRIR_LISTA_ESPERA") {
        this.router.navigate(['/pagina-mensajes']);
      }
    })
  }

}
