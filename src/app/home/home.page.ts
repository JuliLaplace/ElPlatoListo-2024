import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DataUsuariosService, Usuario } from 'src/servicios/data-usuarios.service';
import { FormsModule } from '@angular/forms';
import { SesionService } from 'src/servicios/sesion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,FormsModule],
})
export class HomePage implements OnInit {

  // usuario! : Usuario;
  constructor(public sesion: SesionService, public dataUsuario : DataUsuariosService) {

  }

  ngOnInit() {
    
  }
}
