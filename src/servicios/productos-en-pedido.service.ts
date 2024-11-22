import { Injectable } from '@angular/core';
import { EstadoProductoEnPedido } from 'src/app/enumerados/estado-producto-en-pedido';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
  getDoc
} from '@angular/fire/firestore';
import { Pedido, PedidoService } from './pedido.service';
import { map, Observable } from 'rxjs';

export interface ProductoEnPedido {
  id: string;
  idPedido: string;
  idProducto: string;
  cantidad: number;
  estado: EstadoProductoEnPedido;
  nombreProducto: string;
  sector: string;
  tiempoPreparacion: number | undefined,
  nroMesa: number | undefined
}

@Injectable({
  providedIn: 'root',
})
export class ProductoEnPedidoService {
  public coleccionProductosEnPedido: ProductoEnPedido[] = [];

  constructor(
    private firestore: Firestore,
    private pedidoService: PedidoService
  ) {
    // this.obtenerDatos();
  }

  async agregarProductoEnPedido(
    idPedido: string,
    idProducto: string,
    cantidad: number,
    nombreProducto: string,
    sector: string,
    tiempoPreparacion: number | undefined,
    nroMesa: number | undefined
  ): Promise<string> {
    let productoEnPedido: ProductoEnPedido = {
      id: '',
      idPedido: idPedido,
      idProducto: idProducto,
      cantidad: cantidad,
      estado: EstadoProductoEnPedido.sinConfirmar,
      nombreProducto: nombreProducto,
      sector: sector,
      tiempoPreparacion: tiempoPreparacion,
      nroMesa: nroMesa
    };
    let col = collection(this.firestore, 'productosEnPedido');
    return await addDoc(col, productoEnPedido).then((ref) => {
      return ref.id;
    });
  }

  async cambiarEstadoPorIdPedido(
    idPedido: string,
    nuevoEstado: EstadoProductoEnPedido
  ): Promise<void> {
    try {
      // Referencia a la colección 'productosEnPedido'
      const productosCollection = collection(
        this.firestore,
        'productosEnPedido'
      );

      // Crear una query para filtrar los productos con el idPedido
      const q = query(productosCollection, where('idPedido', '==', idPedido));
      // Obtener los documentos que coinciden con la query
      const querySnapshot = await getDocs(q);

      // Recorrer los documentos y actualizar el campo 'estado'
      const batchUpdates = querySnapshot.docs.map((docSnapshot) => {
        const productoRef = doc(
          this.firestore,
          'productosEnPedido',
          docSnapshot.id
        );
        return updateDoc(productoRef, { estado: nuevoEstado });
      });
      // Esperar a que todas las actualizaciones se completen
      await Promise.all(batchUpdates);

      console.log(
        `Se han actualizado los estados de los productos con idPedido: ${idPedido}`
      );
    } catch (error) {
      console.error('Error al cambiar el estado de los productos:', error);
    }
  }

  async modificarEstadoProducto(
    idProducto: string,
    idPedido: string,
    nuevoEstado: string,
    tiempoPreparacion: number | undefined
  ): Promise<void> {
    try {
      // Referencia a la colección
      const productosCollection = collection(
        this.firestore,
        'productosEnPedido'
      );

      // Crear una query para buscar por idProducto y idPedido
      const q = query(
        productosCollection,
        where('idProducto', '==', idProducto),
        where('idPedido', '==', idPedido)
      );

      // Obtener los documentos que cumplen con los criterios
      const querySnapshot = await getDocs(q);

      // Verificar que existe un único documento
      if (!querySnapshot.empty) {
        // Actualizar el estado del producto
        const docSnapshot = querySnapshot.docs[0]; // Suponiendo que solo hay un producto con este idProducto e idPedido
        const productoRef = doc(
          this.firestore,
          'productosEnPedido',
          docSnapshot.id
        );
        await updateDoc(productoRef, { estado: nuevoEstado, tiempoPreparacion: tiempoPreparacion });

        // Chequear si hay que modificar el tiempo de preparación del pedido general
        if (nuevoEstado === EstadoProductoEnPedido.enPreparacion) {
          await this.confirmarSiModificaTiempoPreparacionPedido(idPedido, tiempoPreparacion);
        } else if (nuevoEstado === EstadoProductoEnPedido.listoParaEntregar) {
          // Chequear si todos los productos del pedido están en el estado listoParaEntregar
          await this.verificarEstadoPedido(idPedido);
        }

        console.log(
          `El estado del producto con idProducto: ${idProducto} e idPedido: ${idPedido} fue actualizado a: ${nuevoEstado}`
        );
      } else {
        console.warn(
          `No se encontró un producto con idProducto: ${idProducto} e idPedido: ${idPedido}`
        );
      }
    } catch (error) {
      console.error('Error al modificar el estado del producto:', error);
    }
  }

  private async confirmarSiModificaTiempoPreparacionPedido(
    idPedido: string,
    tiempoPreparacion: number | undefined
  ): Promise<void> {
    try {
       // Referencia al documento específico usando su ID
    const pedidoDocRef = doc(this.firestore, 'pedidos', idPedido);

    // Obtener los datos del documento
    const pedidoSnapshot = await getDoc(pedidoDocRef);

    if (pedidoSnapshot.exists()) {
      const pedidoData = pedidoSnapshot.data();

      if (tiempoPreparacion) {
        // Verificar si el tiempoPreparacion actual es menor al recibido por parámetro
        if (pedidoData['tiempoPreparacion'] < tiempoPreparacion) {
          // Actualizar el tiempoPreparacion en el documento
          await updateDoc(pedidoDocRef, { tiempoPreparacion });
          console.log(`Tiempo de preparación actualizado para pedido ${idPedido}`);
        } else {
          console.log(`No se requiere actualización para pedido ${idPedido}`);
        }
      }
    } else {
      console.log(`No se encontró el pedido con ID ${idPedido}`);
    }
    } catch (error) {
      console.error('Error al verificar o actualizar el tiempo de preparación:', error);
    }
  }

  private async verificarEstadoPedido(idPedido: string): Promise<void> {
    try {
      // Referencia a la colección
      const productosCollection = collection(
        this.firestore,
        'productosEnPedido'
      );

      // Crear una query para obtener todos los productos del pedido
      const q = query(productosCollection, where('idPedido', '==', idPedido));
      const querySnapshot = await getDocs(q);

      // Verificar si todos los productos están en estado listoParaEntregar
      const todosListos = querySnapshot.docs.every(
        (doc) =>
          doc.data()['estado'] === EstadoProductoEnPedido.listoParaEntregar
      );

      if (todosListos) {
        await this.pedidoService.modificarEstadoPedidoPorID(
          idPedido,
          'Pedido Listo'
        );
        console.log(
          `Todos los productos del pedido ${idPedido} están listos para entregar.`
        );
        // Aquí puedes agregar lógica adicional, como actualizar el estado del pedido principal
      } else {
        console.log(
          `Aún hay productos en el pedido ${idPedido} que no están listos para entregar.`
        );
      }
    } catch (error) {
      console.error('Error al verificar el estado del pedido:', error);
    }
  }

  obtenerTodosLosProductosPendientes(): Observable<any[]> {
    // Referencia a la colección
    const productosCollection = collection(
      this.firestore,
      'productosEnPedido'
    );

    // Crear una query para obtener todos los productos del pedido
    const q = query(productosCollection, orderBy('nroMesa'));
    // let col = collection(this.firestore, 'productosEnPedido');

    return collectionData(q, { idField: 'id' }).pipe(
      map((pedidos: any[]) =>
        pedidos.filter(
          (pedido) =>
            pedido.estado === EstadoProductoEnPedido.pendiente ||
            pedido.estado === EstadoProductoEnPedido.enPreparacion
        )
      )
    );
  }

  async obtenerProductosPorPedido(idPedido: string | undefined): Promise<any[]> {
    try {
      // Referencia a la colección
      const productosCollection = collection(
        this.firestore,
        'productosEnPedido'
      );

      // Crear una query para buscar los productos con el idPedido especificado
      const q = query(productosCollection, where('idPedido', '==', idPedido));

      // Obtener los documentos que cumplen con el criterio
      const querySnapshot = await getDocs(q);

      // Convertir los documentos en un array de datos
      const productos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Productos obtenidos:', productos);
      return productos;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      return [];
    }
  }
}
