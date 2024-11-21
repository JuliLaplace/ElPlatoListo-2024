import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDoc, Timestamp } from '@angular/fire/firestore';
import { PedidoService } from './pedido.service';

export interface DataSet{
  name:string,
  value: number,
}
export interface Encuesta{
  id: string,
  email: string | null,
  foto1: string,
  foto2: string,
  foto3: string,
  calidadServicio : number,
  calificacionLimpieza : string,
  aspectoMasValorado : string,
  serviciosAdicionales : ServiciosAdicionales,
  mensaje : string,
  fecha: Timestamp,
}

export interface ServiciosAdicionales{
  wifi: boolean,
  musica: boolean,
  juegos: boolean,
  aireLibre: boolean,
}


@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  public coleccionEncuestas: Encuesta[] = [];
  public dataSetCalificacionLimpieza: DataSet[] = [];

  constructor(private firestore: Firestore, private pedidoService : PedidoService) { 

    this.obtenerDatos();
  }

  async crearRegistro(encuesta: Encuesta): Promise<string> {
    let col = collection(this.firestore, 'encuestas');
    return await addDoc(col, encuesta).then((ref) => {
      return ref.id;
    });
  }

  obtenerEncuesta(idEncuesta : string){
    let col = collection(this.firestore, 'encuestas');
    return getDoc(doc(col, idEncuesta));
  }

  obtenerDatos(){
    let col = collection(this.firestore, 'encuestas');
    const observable = collectionData(col, {idField: 'id'});
    observable.subscribe((respuesta:any) => {
      this.coleccionEncuestas = respuesta;
      this.crearDataSetAspectoMasValorado();
      this.crearDataSetCalificacionLimpieza();
      this.crearDataSetServiciosAdicionales();
    })
    
  }

  async cargarEncuesta(encuesta : Encuesta){
    let idEncuesta = await this.crearRegistro(encuesta);
    this.pedidoService.cargarEncuesta(idEncuesta);
    
  }
  
  crearDataSetCalificacionLimpieza(){
    let dataSet : DataSet[]= [
      {
        name : 'excelente',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.calificacionLimpieza == 'excelente' ? 1 : 0)},0)
      },
      {
        name : 'buena',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.calificacionLimpieza == 'buena' ? 1 : 0)},0)
      },
      {
        name : 'regular',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.calificacionLimpieza == 'regular' ? 1 : 0)},0)
      },
      {
        name : 'mala',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.calificacionLimpieza == 'mala' ? 1 : 0)},0)
      },
    ]
  }

  crearDataSetAspectoMasValorado(){
    let dataSet : DataSet[]= [
      {
        name : 'calidad_comida',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.aspectoMasValorado == 'calidad_comida' ? 1 : 0)},0)
      },
      {
        name : 'rapidez_servicio',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.aspectoMasValorado == 'rapidez_servicio' ? 1 : 0)},0)
      },
      {
        name : 'limpieza',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.aspectoMasValorado == 'limpieza' ? 1 : 0)},0)
      },
      {
        name : 'precio',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.aspectoMasValorado == 'precio' ? 1 : 0)},0)
      },
    ]
  }

  crearDataSetServiciosAdicionales(){
    let dataSet : DataSet[]= [
      {
        name : 'wifi',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.serviciosAdicionales.wifi ? 1 : 0)},0)
      },
      {
        name : 'buena',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.serviciosAdicionales ? 1 : 0)},0)
      },
      {
        name : 'regular',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.serviciosAdicionales ? 1 : 0)},0)
      },
      {
        name : 'mala',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.serviciosAdicionales ? 1 : 0)},0)
      },
    ]
  }
}
