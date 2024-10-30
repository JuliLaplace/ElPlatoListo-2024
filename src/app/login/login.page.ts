import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonFabButton, IonFabList, IonCard, IonCardContent, IonNote, IonCardHeader, IonItem, IonButton, IonFab, IonInput } from '@ionic/angular/standalone';
import { LoginService } from 'src/servicios/login.service';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/servicios/spinner.service';
import { FormViewerService } from 'src/servicios/form-viewer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonNote, IonFabButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonFabList, IonFabButton, IonCard, IonCardContent, IonCardHeader, IonItem, IonButton, IonFab, IonInput]
})
export class LoginPage implements OnInit {

  formLogin!: FormGroup;
  type: string = 'password';
  isPassword!: boolean;
  hide: boolean = false;
  cargando: boolean = false;

  ngOnInit(): void {

    if (this.type == 'password') this.isPassword = true;
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
      ]),
      passwordLogin: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),
    });
  }

  constructor(private loginService: LoginService, private spinnerService: SpinnerService, private formViewer: FormViewerService, private router: Router) {}

  async iniciarSesion() {

    this.cargando = true;
    if (this.formLogin.valid) {
      const { email, passwordLogin } = this.formLogin.value;
      this.loginService.login(email!, passwordLogin!).then((error) => {
        
        if (!error.errorFlag) {
          this.spinnerService.mostrarMensaje({
            message: `${error.errorMsj}`,
            duration: 1500,
            color: 'success',
            position: 'middle',
            icon: 'person-circle-outline',
          })
          this.formLogin.reset();
          this.cargando = false;
          this.router.navigateByUrl('/home');
        } else {
          this.cargando = false;
          this.spinnerService.mostrarMensaje({
            message: `${error.errorMsj}`,
            duration: 1500,
            color: 'danger',
            position: 'middle',
            icon: 'person-circle-outline',
          })
          
        }
    
      });
    } 
    
  }

  registrarse(){
    this.formLogin.reset();
    this.router.navigate(['/registro']);
  }

  accesoAutomatico(perfil: string) {
    switch (perfil) {
      case 'duenio':
        this.formLogin.setValue({
          email: 'admin@gmail.com', //Dueño
          passwordLogin: '111111',
        });
        break;
      case 'cliente':
        this.formLogin.setValue({
          email: 'supervisor@gmail.com', //Supervisor
          passwordLogin: '222222',
        });
        break;
      case 'maitre':
        this.formLogin.setValue({
          email: 'maitre@gmail.com', //Maitre
          passwordLogin: '111111',
        });
        break;
      case 'mozo':
        this.formLogin.setValue({
          email: 'mozo@gmail.com', //Mozo
          passwordLogin: '333333',
        });
        break;
      case 'cocinero':
        this.formLogin.setValue({
          email: 'cocinero@gmail.com', //Cocinero
          passwordLogin: '123123',
        });
        break;
      case 'barman':
        this.formLogin.setValue({
          email: 'barman@gmail.com', //Barman
          passwordLogin: '111111',
        });
        break;
    }
  }

  controlError(control: string){
    return this.formViewer.controlConError(this.formLogin, control);
  }

  obtenerControlMensajeError(control: string){
    return this.formViewer.mensajeError(this.formLogin, control);
  }

  mostrarOcultarPassword() {
    this.hide = !this.hide;
    if (this.hide) this.type = 'password';
    else this.type = 'text';
  }
}
