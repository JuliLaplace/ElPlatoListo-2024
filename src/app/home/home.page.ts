import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DataUsuariosService, Usuario } from 'src/servicios/data-usuarios.service';
import { FormsModule } from '@angular/forms';
import { SesionService } from 'src/servicios/sesion.service';
import { HomeAdminComponent } from '../componentes/home-admin/home-admin.component';
import { TabsComponent } from "../componentes/tabs/tabs.component";
import { HomeClienteComponent } from '../componentes/home-cliente/home-cliente.component';
import { HomeMaitreComponent } from '../componentes/home-maitre/home-maitre.component';
import { chatbubbleEllipsesOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';
import { HomeMozoComponent } from '../componentes/home-mozo/home-mozo.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HomeAdminComponent, TabsComponent, HomeClienteComponent, HomeMaitreComponent, RouterLink, HomeMozoComponent],
})
export class HomePage {

  // usuario! : Usuario;
  constructor(public sesion: SesionService, public dataUsuario : DataUsuariosService) {
     addIcons({
       chatbubbleEllipsesOutline,
     });
  }

}
