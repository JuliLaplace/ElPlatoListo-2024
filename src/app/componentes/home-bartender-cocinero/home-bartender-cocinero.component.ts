import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/servicios/data-usuarios.service';
import { IonicModule } from '@ionic/angular';
import { SesionService } from 'src/servicios/sesion.service';
import { Producto } from 'src/servicios/menu.service';

@Component({
  selector: 'app-home-bartender-cocinero',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home-bartender-cocinero.component.html',
  styleUrls: ['./home-bartender-cocinero.component.scss'],
})
export class HomeBartenderCocineroComponent implements OnInit {
  @Input() usuario!: Usuario | null;
  opcionSeleccionada: string = 'Pedidos';
  listaProductos: any[] = [];

  constructor(public sesionServicio: SesionService) {}

  ngOnInit() {}

  cambiarVista(event: any) {
    this.opcionSeleccionada = event.detail.value;
  }

  confirmarProducto(){}
}
