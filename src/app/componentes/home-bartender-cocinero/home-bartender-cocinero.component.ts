import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/servicios/data-usuarios.service';
import { IonicModule } from '@ionic/angular';
import { SesionService } from 'src/servicios/sesion.service';
import { MenuService, Producto } from 'src/servicios/menu.service';
import {
  ProductoEnPedido,
  ProductoEnPedidoService,
} from 'src/servicios/productos-en-pedido.service';
import { EstadoProductoEnPedido } from 'src/app/enumerados/estado-producto-en-pedido';

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
  listaProductos: ProductoEnPedido[] = [];
  listaFiltradaPorTipoUsuario: ProductoEnPedido[] = [];

  constructor(
    public sesionServicio: SesionService,
    private productoServicio: ProductoEnPedidoService,
    private menuServicio: MenuService
  ) {}

  ngOnInit() {
    this.productoServicio
      .obtenerTodosLosProductosPendientes()
      .subscribe((productos) => {
        this.listaFiltradaPorTipoUsuario = [];
        this.listaProductos = productos;
        if (this.sesionServicio.usuarioBD?.tipo === 'Cocinero') {
          this.listaProductos.filter((producto) => {
            if (producto.sector !== 'barra') {
              this.listaFiltradaPorTipoUsuario.push(producto);
            }
          });
        } else if (this.sesionServicio.usuarioBD?.tipo === 'Bartender') {
          this.listaProductos.filter((producto) => {
            if (producto.sector === 'barra') {
              this.listaFiltradaPorTipoUsuario.push(producto);
            }
          });
        }
      });
  }

  cambiarVista(event: any) {
    this.opcionSeleccionada = event.detail.value;
  }

  async cambiarEstadoProducto(
    idProducto: string,
    idPedido: string,
    estado: string
  ) {
    console.log(idProducto, idPedido, estado);
    let nuevoEstado = '';
    switch (estado) {
      case EstadoProductoEnPedido.pendiente:
        nuevoEstado = EstadoProductoEnPedido.enPreparacion;
        break;
      case EstadoProductoEnPedido.enPreparacion:
        nuevoEstado = EstadoProductoEnPedido.listoParaEntregar;
        break;
    }

    await this.productoServicio.modificarEstadoProducto(
      idProducto,
      idPedido,
      nuevoEstado
    );
  }
}
