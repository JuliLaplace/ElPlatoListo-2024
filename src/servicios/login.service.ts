import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
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
