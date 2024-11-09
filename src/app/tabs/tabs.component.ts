import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, menu, qrCodeOutline, exitSharp } from 'ionicons/icons';
import { LoginService } from 'src/servicios/login.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  constructor(private loginService: LoginService) {
    addIcons({
      menu,
      home,
      qrCodeOutline,
      exitSharp
    });
  }

  cerrarSesion(){
    this.loginService.logout();
  }
}
