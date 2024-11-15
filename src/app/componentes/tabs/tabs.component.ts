import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, menu, qrCodeOutline, exitSharp } from 'ionicons/icons';
import { Usuario } from 'src/servicios/data-usuarios.service';
import { LoginService } from 'src/servicios/login.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() usuario!: Usuario | null;

  constructor(private loginService: LoginService) {
    addIcons({
      menu,
      home,
      qrCodeOutline,
      exitSharp,
    });
  }

  cerrarSesion() {
    this.loginService.logout();
  }
}
