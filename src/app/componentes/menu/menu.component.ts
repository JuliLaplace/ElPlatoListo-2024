import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DataUsuariosService } from 'src/servicios/data-usuarios.service';
import { SesionService } from 'src/servicios/sesion.service';
import { TabsComponent } from '../tabs/tabs.component';
import { PedidoService } from 'src/servicios/pedido.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MenuService } from 'src/servicios/menu.service';
import { ProductoEnPedidoService } from 'src/servicios/productos-en-pedido.service';
import { addIcons } from 'ionicons';
import { checkbox } from 'ionicons/icons';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TabsComponent, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuComponent  implements OnInit {
  idPedido?: string;
  cantidadesPedido: { [idProducto: string]: number } = {};
  precioAcumulado: number = 0;
  tiempoDeEspera: number = 0;

  constructor(
    public sesion: SesionService,
    public dataUsuario : DataUsuariosService,
    public pedidoService: PedidoService,
    public menuService: MenuService,
    private route: ActivatedRoute,
    private productosEnPedidoService: ProductoEnPedidoService,
    private router: Router
  ) {
    addIcons({
      'checkbox': checkbox,
    });
   }

  ngOnInit() {
    this.idPedido = this.route.snapshot.paramMap.get('pedidoId') || '';
    register();
  }

  finalizarPedido () {
    //guardar en la db el precio del pedido
    if (this.idPedido) {
      this.pedidoService.modificarPrecioYTiempoPedido(this.idPedido, this.precioAcumulado, this.tiempoDeEspera);
    }
    //redirigir a la página anterior
    this.router.navigateByUrl('/cliente-pedido-en-curso');
  }

  agregarProducto (idProducto: string, precioProducto: number, nombreProducto: string, sector: string, tiempoPreparacion: number) {
    const cantidad = this.cantidadesPedido[idProducto] || 0;
    //Calculo precio acumulado
    this.precioAcumulado += (precioProducto * cantidad);
    //Calculo tiempo de espera
    if (this.tiempoDeEspera == 0 || this.tiempoDeEspera < tiempoPreparacion) {
      this.tiempoDeEspera = tiempoPreparacion;
    }

    // Aquí procesas el producto y la cantidad, guardándolo en el pedido
    if (this.idPedido) {
      this.productosEnPedidoService.agregarProductoEnPedido(this.idPedido, idProducto, this.cantidadesPedido[idProducto], nombreProducto, sector);
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
