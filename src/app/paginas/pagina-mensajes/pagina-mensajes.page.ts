import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SesionService } from 'src/servicios/sesion.service';
import { LoginService } from 'src/servicios/login.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagina-mensajes',
  templateUrl: './pagina-mensajes.page.html',
  styleUrls: ['./pagina-mensajes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class PaginaMensajesPage implements OnInit {
  mensajeAMostrar?: string;

  constructor(
    public sesion: SesionService,
    private login: LoginService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.mensajeAMostrar = this.route.snapshot.paramMap.get('mensajeId') || '';
  }
  cerrarSesion() {
    this.login.logout().then(() => { });
  }
}
