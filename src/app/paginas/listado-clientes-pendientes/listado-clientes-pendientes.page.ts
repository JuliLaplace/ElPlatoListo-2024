import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SesionService } from 'src/servicios/sesion.service';
import { DataUsuariosService, Usuario } from 'src/servicios/data-usuarios.service';
import { TabsComponent } from 'src/app/componentes/tabs/tabs.component';
import { EstadoCliente } from 'src/app/enumerados/estado-cliente';

@Component({
  selector: 'app-listado-clientes-pendientes',
  templateUrl: './listado-clientes-pendientes.page.html',
  styleUrls: ['./listado-clientes-pendientes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabsComponent]
})
export class ListadoClientesPendientesPage implements OnInit {

  constructor(public sesion: SesionService, public dataUsuario : DataUsuariosService) { }

  ngOnInit() {
  }

  aceptarCliente(usuario: Usuario){
    this.dataUsuario.aceptarCliente(usuario);
    console.log("entre");
  }

  rechazarCliente(usuario: Usuario){
    this.dataUsuario.rechazarCliente(usuario);
  }

}
