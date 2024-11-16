import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { EstadoMesa } from 'src/app/enumerados/estado-mesa';

export interface Mesa {
  id: string,
  numero: number | null,
  estado: EstadoMesa,
}
@Injectable({
  providedIn: 'root'
})
export class MesaService {

  public coleccionMesas: Mesa[] = [];
  public coleccionMesasLibres: Mesa[] = [];

  constructor(private firestore: Firestore) {

    this.obtenerDatos();
   }

  async crearRegistro(mesa: Mesa): Promise<string> {
    let col = collection(this.firestore, 'mesas');
    return await addDoc(col, mesa).then((ref) => {
      return ref.id;
    });
  }

  async obtenerMesa(numeroMesa: number) {
    const col = collection(this.firestore, 'mesas');
    const mesaQuery = query(col, where('numero', '==', numeroMesa));
    const mesaSnapshot = await getDocs(mesaQuery);

    if (!mesaSnapshot.empty) {
      // Devuelve el primer usuario encontrado, si coindice con el numero de mesa
      // return mesaSnapshot.docs[0].data() as Mesa;
      let doc = mesaSnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Mesa;
    }

    // Si no encuentra el usuario
    return null;
  }

  obtenerDatos() {
    let col = collection(this.firestore, 'mesas');
    const observable = collectionData(col, { idField: 'id' });
    observable.subscribe((respuesta: any) => {
      this.coleccionMesas = respuesta;
      this.coleccionMesasLibres = this.coleccionMesas.filter((mesa) => { return (mesa.estado == EstadoMesa.libre) });
      
    })

  }

  private modificarRegistro(mesa: Mesa, data: any) {
    
    let col = collection(this.firestore, 'mesas');
    const docRef = doc(col, mesa.id);

    updateDoc(docRef, data);
  }

  private async cambiarEstadoMesa(numero: number, estado: EstadoMesa) {
    let mesa: Mesa | null = await this.obtenerMesa(numero);
    
    if (mesa) {
      this.modificarRegistro(mesa, { estado: estado });
    }
  }

  public cambiarMesaOcupada(numero: number) {
    this.cambiarEstadoMesa(numero, EstadoMesa.ocupado);
  }

  public cambiarMesaLibre(numero: number) {
    this.cambiarEstadoMesa(numero, EstadoMesa.libre);
  }


}
