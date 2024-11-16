import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { DataUsuariosService, Usuario } from './data-usuarios.service';
import { TipoUsuario } from 'src/app/enumerados/tipo-usuario';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  
  public usuarioActual : User | null = null;  //guardo el usuario
  public usuarioBD : Usuario | null = null;

  constructor(private auth: Auth, private datosUsuario: DataUsuariosService) {

    onAuthStateChanged(auth, async(usuario)=>{
      this.usuarioActual = usuario;  //es como un listener para escuchar el estado del usuario (si sigue logueado o no)
      if(usuario && usuario.email){
        this.usuarioBD = await datosUsuario.obtenerUsuario(usuario.email);
      }else{
        this.usuarioBD = null;
      }
    });
   }

   getUsuario(): string{
    return this.usuarioActual?.email ? this.usuarioActual?.email : "";
  }

  sesionActiva(): boolean{
    return this.usuarioActual !=null;
  }
  esCliente(): boolean{
    return ((this.usuarioBD && this.usuarioBD.tipo == TipoUsuario.cliente) ||(this.usuarioBD && this.usuarioBD.tipo == TipoUsuario.clienteAnon) ) ? true :  false;
  }
  esMozo(): boolean{
    return (this.usuarioBD && this.usuarioBD.tipo == TipoUsuario.mozo) ? true :  false;
  }
  esMaitre(): boolean{
    return (this.usuarioBD && this.usuarioBD.tipo == TipoUsuario.maitre) ? true :  false;
  }
  esDueno(): boolean{
    return (this.usuarioBD && this.usuarioBD.tipo == TipoUsuario.dueno) ? true :  false;
  }

  esSupervisor(): boolean{
    return (this.usuarioBD && this.usuarioBD.tipo == TipoUsuario.supervisor) ? true :  false;
  }
  esBartender(): boolean{
    return (this.usuarioBD && this.usuarioBD.tipo == TipoUsuario.bartender) ? true :  false;
  }
  esCocinero(): boolean{
    return (this.usuarioBD && this.usuarioBD.tipo == TipoUsuario.cocinero) ? true :  false;
  }
}
