import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SesionService } from 'src/servicios/sesion.service';
import { LoginService } from 'src/servicios/login.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PedidoService } from 'src/servicios/pedido.service';
import { EstadoPedido } from 'src/app/enumerados/estado-pedido';
@Component({
  selector: 'app-pagina-mensajes',
  templateUrl: './pagina-mensajes.page.html',
  styleUrls: ['./pagina-mensajes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class PaginaMensajesPage implements OnInit {
  mensajeAMostrar?: string;
  estadoPedido = EstadoPedido;
  constructor(
    public sesion: SesionService,
    private login: LoginService,
    private route: ActivatedRoute, 
    public pedido: PedidoService) { }

  ngOnInit() {
    this.mensajeAMostrar = this.route.snapshot.paramMap.get('mensajeId') || '';
  }
  cerrarSesion() {
    this.login.logout().then(() => { });
  }
}
