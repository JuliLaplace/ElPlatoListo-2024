import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/servicios/data-usuarios.service';
import { IonicModule } from '@ionic/angular';
import { SesionService } from 'src/servicios/sesion.service';
import { MenuService, Producto } from 'src/servicios/menu.service';
import { ProductoEnPedidoService } from 'src/servicios/productos-en-pedido.service';

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
  listaProductosBartender: Producto[] = [];
  listaProductosCocinero: Producto[] = [];

  constructor(
    public sesionServicio: SesionService,
    private productoServicio: ProductoEnPedidoService,
    private menuServicio: MenuService,
  ) {}

  ngOnInit() {
    this.productoServicio
      .obtenerTodosLosProductosPendientes()
      .subscribe((productos) => {
        this.listaProductos = productos;
        console.log("Productos en esatdo pendiente",this.listaProductos);
        //DESPUES DE OBTENER LA CONFIRMACIÓN DEL MOZO -> GUARDO EN LA LISTA QUE PRODUCTO PERTENECE A CADA SECTOR
        //this.derivarAsuSector();

      });
  }

  cambiarVista(event: any) {
    this.opcionSeleccionada = event.detail.value;
  }

  confirmarProducto() {}

  async derivarAsuSector() {
    //Recorrer mi lista de los prodcutos que estan pendientes
    console.log("Lista de Productos",this.listaProductos);
    //Obtener el id de cada producto
    //Recorro mi listaProductos para obtener el idProducto
    //Busco en mi collecion de Menu el idProducto
    //Verifico a que sector pertene: cocinero o bar

    for (let productoPendiente of this.listaProductos) {
      console.log(this.menuServicio.coleccionProductos);

      for (let menuProdcuto of this.menuServicio.coleccionProductos) {
        const producto = await this.menuServicio.obtenerMenuPorProducto(
          productoPendiente.idProducto
        );
        console.log('producto menu', producto);
        if (producto) {
          if (producto.sector === 'barra') {
            this.listaProductosBartender.push(producto);
          } else if (producto.sector === 'cocina') {
            this.listaProductosCocinero.push(producto);
          }
        }
      }
    }

    console.log('Productos Bartender:', this.listaProductosBartender);
    console.log('Productos Cocinero:', this.listaProductosCocinero);
  }
}
