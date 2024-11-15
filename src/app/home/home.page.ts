import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DataUsuariosService, Usuario } from 'src/servicios/data-usuarios.service';
import { FormsModule } from '@angular/forms';
import { SesionService } from 'src/servicios/sesion.service';
import { HomeAdminComponent } from '../componentes/home-admin/home-admin.component';
import { TabsComponent } from "../componentes/tabs/tabs.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HomeAdminComponent, TabsComponent],
})
export class HomePage {

  // usuario! : Usuario;
  constructor(public sesion: SesionService, public dataUsuario : DataUsuariosService) {

  }

}
