import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DataUsuariosService } from 'src/servicios/data-usuarios.service';
import { SesionService } from 'src/servicios/sesion.service';
import { TabsComponent } from '../tabs/tabs.component';
import { PedidoService } from 'src/servicios/pedido.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MenuService } from 'src/servicios/menu.service';
import { ProductoEnPedidoService } from 'src/servicios/productos-en-pedido.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TabsComponent, RouterModule]
})
export class MenuComponent  implements OnInit {
  idPedido?: string;
  cantidadesPedido: { [idProducto: string]: number } = {};
  // cantidad: number = 0; // Variable para almacenar el valor del contador

  constructor(
    public sesion: SesionService,
    public dataUsuario : DataUsuariosService,
    public pedidoService: PedidoService,
    public menuService: MenuService,
    private route: ActivatedRoute,
    private productosEnPedidoService: ProductoEnPedidoService
  ) { }

  ngOnInit() {
    this.idPedido = this.route.snapshot.paramMap.get('pedidoId') || '';
  }

  agregarProducto (idProducto: string) {
    const cantidad = this.cantidadesPedido[idProducto] || 0;
    console.log(`Producto agregado: ${idProducto}, cantidad: ${cantidad}`);
    // Aquí procesas el producto y la cantidad, guardándolo en el pedido
    if (this.idPedido) {
      this.productosEnPedidoService.agregarProductoEnPedido(this.idPedido, idProducto, this.cantidadesPedido[idProducto]);
    }
  }


  incrementarCantidad(productoId: string) {
    if (!this.cantidadesPedido[productoId]) {
      this.cantidadesPedido[productoId] = 0;
    }
    this.cantidadesPedido[productoId]++;
  }
  
  decrementarCantidad(productoId: string) {
    if (this.cantidadesPedido[productoId] && this.cantidadesPedido[productoId] > 0) {
      this.cantidadesPedido[productoId]--;
    }
  }

}
