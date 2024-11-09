import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataUsuariosService, Usuario } from './data-usuarios.service';
import { EstadoCliente } from 'src/app/enumerados/estado-cliente';

export interface LoginError {
  errorFlag: boolean,
  errorMsj:string;
}


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public usuarioActual?: Usuario;
  constructor(private auth: Auth, private router: Router, private dataUsuario: DataUsuariosService) {
  }

  async registrar(email: string, pwd: string): Promise<LoginError> {
    let error: LoginError = {
      errorFlag: false,
      errorMsj: '',
    };

    return createUserWithEmailAndPassword(this.auth, email, pwd)
      .then((res) => {
        error.errorFlag = false;
        return error;
      })
      .catch((e) => {
        error.errorFlag = true;
        switch (e.code) {
          case 'auth/invalid-email':
            error.errorMsj = 'Ingrese un email válido';
            break;
          case 'auth/email-already-in-use':
            error.errorMsj = 'Email ya registrado';
            break;
          case 'auth/weak-password':
            error.errorMsj = 'La contraseña debe tener más de 6 caracteres';
            break;
          case 'auth/missing-password':
            error.errorMsj = 'Debe ingresar una contraseña';
            break;
          case 'auth/missing-email':
            error.errorMsj = 'Debe ingresar un email para registrarse';
            break;
          default:
            error.errorMsj = e.code;
            break;
        }
        return error;
      });
  }

  async login(email: string, password: string): Promise<LoginError> {
    let error: LoginError = {
      errorFlag: false,
      errorMsj: '',
    };

    return signInWithEmailAndPassword(this.auth, email, password)
      .then( async (resultado) => {
        const usuario = await this.dataUsuario.obtenerUsuario(
          email
        );
        if (usuario) {
          this.usuarioActual = usuario
          // console.log(
          //   `Bienvenido ${usuario.nombre}. Estado: ${usuario.estado}. Usuario: ${this.usuarioActual}`
          // );
          error.errorMsj = `Bienvenido ${resultado.user.email}`;
          
          if (usuario.estado == EstadoCliente.pendiente) {
            error.errorFlag = true;
            error.errorMsj =
              'Su usuario aún no ha sido aprobado.\nPor favor, revisa tu correo para ver el estado de tu registro.';
            return error;
          } else if (usuario.estado == EstadoCliente.rechazado) {
            error.errorFlag = true;
            error.errorMsj =
              'Su usuario ha sido rechazado por el Dueño o Supervisor.';
            return error;
          }
        } else {
          error.errorFlag = true;
          error.errorMsj = 'Usuario no encontrado en la base de datos.';
        }
        return error;
      })
      .catch((e) => {
        error.errorFlag = true;
        switch (e.code) {
          default:
            error.errorMsj = 'Usuario o contraseña incorrecta. Reintente nuevamente.';
            break;
        }
        return error;
      });
  }

  async logout(): Promise<void> {
    console.log(this.auth.currentUser?.email);
    return signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }
}
