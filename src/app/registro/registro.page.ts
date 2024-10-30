import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonAvatar,IonHeader, IonTitle, IonToolbar, IonIcon, IonFabButton, IonFabList, IonCard, IonCardContent, IonNote, IonCardHeader, IonItem, IonButton, IonFab, IonInput } from '@ionic/angular/standalone';
import { LoginService } from 'src/servicios/login.service';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/servicios/spinner.service';
import { FormViewerService } from 'src/servicios/form-viewer.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonNote, IonAvatar, IonFabButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonFabList, IonFabButton, IonCard, IonCardContent, IonCardHeader, IonItem, IonButton, IonFab, IonInput]
})
export class RegistroPage implements OnInit {

  formRegistro!: FormGroup;
  type: string = 'password';
  isPassword!: boolean;
  hide: boolean = false;
  cargando: boolean = false;

  ngOnInit(): void {

    if (this.type == 'password') this.isPassword = true;
    this.formRegistro = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      dni: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{8}$'),
      ]),
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
      perfilImagen: new FormControl('', [Validators.required]),
    });
  }

  constructor(private loginService: LoginService, private spinnerService: SpinnerService, private formViewer: FormViewerService, private router: Router) {}


  registrarse(){
    this.formRegistro.reset();
  }

  controlError(control: string){
    return this.formViewer.controlConError(this.formRegistro, control);
  }

  obtenerControlMensajeError(control: string){
    return this.formViewer.mensajeError(this.formRegistro, control);
  }

  mostrarOcultarPassword() {
    this.hide = !this.hide;
    if (this.hide) this.type = 'password';
    else this.type = 'text';
  }

  tomarFotoPefil(){

  }
}
