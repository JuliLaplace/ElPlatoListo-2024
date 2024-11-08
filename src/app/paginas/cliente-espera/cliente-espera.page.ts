import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SesionService } from 'src/servicios/sesion.service';
import { RouterLink } from '@angular/router';
import { LoginService } from 'src/servicios/login.service';

@Component({
  selector: 'app-cliente-espera',
  templateUrl: './cliente-espera.page.html',
  styleUrls: ['./cliente-espera.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class ClienteEsperaPage implements OnInit {

  constructor(public sesion: SesionService, private login: LoginService) { }

  ngOnInit() {
  }

  cerrarSesion() {

    this.login.logout().then(() => { });
  }


}
