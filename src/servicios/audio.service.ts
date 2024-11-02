import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {

  public inicioSesion!: string;
  public cierreSesion!: string;
  public error!: string;
  public cambioPagina!: string;
  public sonidoActivo: boolean = true;

  constructor() {}
}
