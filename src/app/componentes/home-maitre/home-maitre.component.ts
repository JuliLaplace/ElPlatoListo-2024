import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DataUsuariosService,
  Usuario,
} from 'src/servicios/data-usuarios.service';
import { MesaService } from 'src/servicios/mesa.service';
import { Pedido, PedidoService } from 'src/servicios/pedido.service';

@Component({
  selector: 'app-home-maitre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-maitre.component.html',
  styleUrls: ['./home-maitre.component.scss'],
})
export class HomeMaitreComponent implements OnInit {
  @Input() usuario!: Usuario | null;
  mesasSeleccionadas: { [key: number]: number } = {};

  constructor(
    public pedidosService: PedidoService,
    public mesasService: MesaService,
    private dataUsuarioService: DataUsuariosService
  ) {}

  ngOnInit() {}

  asignarMesa(pedido: Pedido, numeroMesa: number) {
    if (numeroMesa) {
      this.pedidosService.esperandoMozo(pedido, numeroMesa); //en esa funcion se cambia el estado de la mesa y el estado del pedido al mismo tiempo
    } else {
      console.log('No se seleccionó ninguna mesa.');
    }
  }
}
