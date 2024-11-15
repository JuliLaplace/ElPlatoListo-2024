import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SesionService } from 'src/servicios/sesion.service';
import { LoginService } from 'src/servicios/login.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagina-mensajes',
  templateUrl: './pagina-mensajes.page.html',
  styleUrls: ['./pagina-mensajes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class PaginaMensajesPage implements OnInit {

  constructor(public sesion: SesionService, private login: LoginService) { }

  ngOnInit() {
  }
  cerrarSesion() {
    this.login.logout().then(() => { });
  }
}
