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
  public dataSetAspectoMasValorado: DataSet[] = [];
  public dataSetServiciosAdicionales: DataSet[] = [];

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
        name : 'Excelente',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.calificacionLimpieza == 'Excelente' ? 1 : 0)},0)
      },
      {
        name : 'Buena',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.calificacionLimpieza == 'Buena' ? 1 : 0)},0)
      },
      {
        name : 'Regular',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.calificacionLimpieza == 'Regular' ? 1 : 0)},0)
      },
      {
        name : 'Mala',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.calificacionLimpieza == 'Mala' ? 1 : 0)},0)
      },
    ]

    this.dataSetCalificacionLimpieza = dataSet;
  }

  crearDataSetAspectoMasValorado(){
    let dataSet : DataSet[]= [
      
      {
        name : 'Limpieza',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.aspectoMasValorado == 'limpieza' ? 1 : 0)},0)
      },
      {
        name : 'Precio',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.aspectoMasValorado == 'precio' ? 1 : 0)},0)
      },
      {
        name : 'Calidad comida',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.aspectoMasValorado == 'calidad_comida' ? 1 : 0)},0)
      },
      {
        name : 'Rapidez servicio',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.aspectoMasValorado == 'rapidez_servicio' ? 1 : 0)},0)
      },
    ]

    this.dataSetAspectoMasValorado = dataSet;
  }

  crearDataSetServiciosAdicionales(){
    let dataSet : DataSet[]= [
      {
        name : 'wifi',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.serviciosAdicionales.wifi ? 1 : 0)},0)
      },
      {
        name : 'juegos',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.serviciosAdicionales.juegos ? 1 : 0)},0)
      },
      {
        name : 'música',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.serviciosAdicionales.musica ? 1 : 0)},0)
      },
      {
        name : 'aire libre',
        value : this.coleccionEncuestas.reduce((acc, e)=>{return acc+ (e.serviciosAdicionales.aireLibre ? 1 : 0)},0)
      },
    ]

    this.dataSetServiciosAdicionales = dataSet;
  }


  ////////////
  public subirEncuestas(cantidad: number) {
    let encuestas: Encuesta[] = this.generarEncuestas(cantidad);
    encuestas.forEach((e) => {
      this.crearRegistro(e);
    });
  }

  private generarEncuestas(n: number): Encuesta[] {
    const emails = [
      "usuario1@example.com",
      "usuario2@example.com",
      "usuario3@example.com",
      "usuario4@example.com",
      "usuario5@example.com",
    ]; // Lista de emails para elegir aleatoriamente.
  
    const calificacionesLimpieza = ["Excelente", "Buena", "Regular", "Mala"];
    const aspectosValorados = ["calidad_comida", "rapidez_servicio", "limpieza", "precio"];
    const mensajesOpiniones = [
      "La comida fue deliciosa y el ambiente agradable.",
      "El servicio fue rápido y el personal muy amable.",
      "La limpieza podría mejorar un poco.",
      "Excelentes precios para la calidad que ofrecen.",
      "El wifi es lento, pero la comida compensa.",
      "El restaurante es muy acogedor y la música es perfecta.",
      "El área de juegos para niños es fantástica.",
      "Faltaban algunos servicios adicionales como aire libre.",
      "Buena experiencia en general, volvería sin duda.",
      "El menú tiene muchas opciones interesantes.",
    ]; // Lista de opiniones aleatorias.
  
    const randomDate = (start: Date, end: Date): string => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString();
    };
  
    const start = new Date("2024-11-01");
    const end = new Date("2024-11-22");

    const encuestas: Encuesta[] = [];
  
    for (let i = 1; i <= n; i++) {
      const encuesta: Encuesta = {
        id: `encuestaRandom${i}`,
        email: emails[Math.floor(Math.random() * emails.length)] || null,
        foto1: '',
        foto2: '',
        foto3: '',
        calidadServicio: Math.floor(Math.random() * 10) + 1,
        calificacionLimpieza: calificacionesLimpieza[Math.floor(Math.random() * calificacionesLimpieza.length)],
        aspectoMasValorado: aspectosValorados[Math.floor(Math.random() * aspectosValorados.length)],
        serviciosAdicionales: {
          wifi: Math.random() < 0.5,
          musica: Math.random() < 0.5,
          juegos: Math.random() < 0.5,
          aireLibre: Math.random() < 0.5,
        },
        mensaje: mensajesOpiniones[Math.floor(Math.random() * mensajesOpiniones.length)],
        fecha: Timestamp.fromDate(new Date(randomDate(start, end))),
      };
      encuestas.push(encuesta);
    }
    return encuestas;
  }
}
