import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from 'src/servicios/login.service';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/servicios/spinner.service';
import { FormViewerService } from 'src/servicios/form-viewer.service';
import { addIcons } from 'ionicons';
import { barcodeOutline, camera, eyeOffOutline, eyeOutline, key } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class RegistroPage implements OnInit {

  formRegistro!: FormGroup;
  escaneo : string ="";
  foto!: File;
  ingresarAnonimo: boolean = false;
  cargando: boolean = false;

  
  constructor(private loginService: LoginService, private spinnerService: SpinnerService, public formViewer: FormViewerService, private router: Router) {

    addIcons({camera, barcodeOutline, key, eyeOutline, eyeOffOutline})
  }
  
  ngOnInit(): void {

    this.formRegistro = new FormGroup({
      nombre: new FormControl('', [ Validators.required, Validators.pattern(this.formViewer.nombresRegex), Validators.minLength(3)]),
      apellido: new FormControl('', [Validators.required,  Validators.pattern(this.formViewer.nombresRegex), Validators.minLength(3)]),
      dni: new FormControl('', [Validators.required, Validators.pattern(this.formViewer.numeroRegex), Validators.minLength(6), Validators.maxLength(9)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.formViewer.emailRegex)]),
      passwordLogin: new FormControl('', [Validators.required, Validators.minLength(10)]),
      perfilImagen: new FormControl('', [Validators.required]),
    });
  }

  obtenerMensajeErrorControl(control: string){
    return this.formViewer.errorEnControl(this.formRegistro, control);
  }

  escanear(){
   
  }


  registrarse(){
    
    this.limpiarDatos();
  }



  limpiarDatos(){
    this.formRegistro.reset();
  }


  tomarFotoPerfil(){

  }
}
