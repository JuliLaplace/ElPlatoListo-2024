import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { doc, getDoc, getFirestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

export interface LoginError {
  errorFlag: boolean,
  errorMsj:string;
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth: Auth, private router: Router) { }

  async registrar(email: string, pwd: string): Promise<LoginError> {
    
    let error: LoginError = {
      errorFlag: false,
      errorMsj: ""
    }

    return createUserWithEmailAndPassword(this.auth, email, pwd)
      .then((res) => {
        this.router.navigate(['/menu']);

        error.errorFlag = false;
        return error;
      })
      .catch((e) => {
        error.errorFlag = true;
        switch (e.code) {
          case "auth/invalid-email":
            error.errorMsj = "Ingrese un email válido";
            break;
          case "auth/email-already-in-use":
            error.errorMsj = "Email ya registrado";
            break;
          case "auth/weak-password":
            error.errorMsj = "La contraseña debe tener más de 6 caracteres";
            break;
          case "auth/missing-password":
            error.errorMsj = "Debe ingresar una contraseña";
            break;
          case "auth/missing-email":
            error.errorMsj = "Debe ingresar un email para registrarse";
            break;
          default:
            error.errorMsj = e.code
            break;
        }
        return error;
      });
  }

  async login (email: string, password: string): Promise <LoginError>{

    let error : LoginError = {
      errorFlag: false,
      errorMsj :""
    }

    return signInWithEmailAndPassword(this.auth, email, password)
    .then((resultado)=>
    {
      error.errorMsj=`Bienvenido ${resultado.user.email}`;
      error.errorFlag=false;
      return error;
      
    })
    .catch((e)=>
    {
      error.errorFlag = true;
      switch(e.code){
        default:
          error.errorMsj = "Usuario o contraseña incorrecta. Reintente."
          break;
      }
      return error;
    })
  }

  async logout(): Promise<void> {
    console.log(this.auth.currentUser?.email)
    return signOut(this.auth)
      .then(() => {
        this.router.navigate(['/home']);
      });
  }

}
