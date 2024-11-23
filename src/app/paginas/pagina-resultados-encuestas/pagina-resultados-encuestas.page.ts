import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { SesionService } from 'src/servicios/sesion.service';
import { TabsComponent } from 'src/app/componentes/tabs/tabs.component';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { EncuestaService } from 'src/servicios/encuesta.service';
import { RouterLink } from '@angular/router';
import { PedidoService } from 'src/servicios/pedido.service';
import { LoginService } from 'src/servicios/login.service';

export interface DataSet{
  name:string,
  value: number,
}

@Component({
  selector: 'app-pagina-resultados-encuestas',
  templateUrl: './pagina-resultados-encuestas.page.html',
  styleUrls: ['./pagina-resultados-encuestas.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TabsComponent, NgxChartsModule, RouterLink]
})
export class PaginaResultadosEncuestasPage {

  
  data: DataSet[] = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
      {
      "name": "UK",
      "value": 6200000
    }
  ];

  constructor(public sesion: SesionService, public encuesta: EncuestaService, private pedido: PedidoService, private login : LoginService) { 
   
  }



  //options
  legendPosition: LegendPosition = LegendPosition.Below;


  finalizarEstadia(){
    this.pedido.finalizarPedido();
    this.login.logout();
  }
}
