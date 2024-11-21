import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, menu, qrCodeOutline, exitSharp, qrCode } from 'ionicons/icons';
import { Usuario } from 'src/servicios/data-usuarios.service';
import { GestionQrService } from 'src/servicios/gestion-qr.service';
import { LoginService } from 'src/servicios/login.service';
import { SesionService } from 'src/servicios/sesion.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() usuario!: Usuario | null;

  constructor(private loginService: LoginService, public sesion: SesionService, public qrServicio : GestionQrService) {
    addIcons({
      menu,
      home,
      qrCodeOutline,
      exitSharp,
      qrCode
    });
  }

  cerrarSesion() {
    this.loginService.logout();
  }


  escanearQr(){
    this.qrServicio.escanear();
  }
}
