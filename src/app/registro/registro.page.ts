import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerService } from 'src/servicios/spinner.service';
import { IonicModule } from '@ionic/angular';
import { RegistroClienteAnonComponent } from '../componentes/registro-cliente-anon/registro-cliente-anon.component';
import { RegistroClienteComponent } from '../componentes/registro-cliente/registro-cliente.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RegistroClienteAnonComponent, RegistroClienteComponent]
})
export class RegistroPage  {

 
  ingresarAnonimo: boolean = false;
  cargando: boolean = false;


  constructor(private spinnerService: SpinnerService) {

    
  }

  


}
