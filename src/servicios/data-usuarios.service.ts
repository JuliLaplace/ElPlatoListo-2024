import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { EstadoCliente } from 'src/app/enumerados/estado-cliente';
import { TipoUsuario } from 'src/app/enumerados/tipo-usuario';

export interface Usuario{
  id: string,
  nombre: string,
  apellido: string | null,
  dni : number | null,
  cuil : number | null,
  email: string,
  tipo : TipoUsuario, 
  fotoPerfil: string,
  estado : EstadoCliente,

}
@Injectable({
  providedIn: 'root'
})
export class DataUsuariosService {

  public coleccionUsuarios:Usuario[] = [];
  
  constructor(private firestore : Firestore) { 

  }

  async crearRegistro(cliente : Usuario): Promise<string> {
    let col = collection(this.firestore, 'usuarios');
    return await addDoc(col, cliente)
    .then((ref)=>{
      return ref.id;
    });
  }
}
