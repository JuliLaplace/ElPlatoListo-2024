import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DataUsuariosService, Usuario } from 'src/servicios/data-usuarios.service';
import { Pedido, PedidoService } from 'src/servicios/pedido.service';

@Component({
  selector: 'app-home-maitre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-maitre.component.html',
  styleUrls: ['./home-maitre.component.scss'],
})
export class HomeMaitreComponent  implements OnInit {
  @Input() usuario!: Usuario | null;

  constructor(
    public pedidosService: PedidoService,
    private dataUsuarioService: DataUsuariosService
  ) { }

  ngOnInit() {

  }

  asignarMesa (pedido: Pedido, numeroMesa: number) {
    //Actualiza el pedido con el número de mesa asignada
  }

}
