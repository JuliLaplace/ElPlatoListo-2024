import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { barcodeOutline, camera, eyeOffOutline, eyeOutline, key } from 'ionicons/icons';
import { FormViewerService } from 'src/servicios/form-viewer.service';
import { LoginService } from 'src/servicios/login.service';
import { SpinnerService } from 'src/servicios/spinner.service';
import { StorageService } from 'src/servicios/storage.service';
import { IonicModule } from '@ionic/angular';
import { TipoUsuario } from 'src/app/enumerados/tipo-usuario';
import { DataUsuariosService, Usuario } from 'src/servicios/data-usuarios.service';
import { QrScannerService } from 'src/servicios/qr-scanner.service';
import { EstadoCliente } from 'src/app/enumerados/estado-cliente';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class RegistroClienteComponent  implements OnInit {

  formRegistro!: FormGroup;
  escaneo: string = "";
  foto!: File;
  cargando: boolean = false;
  contrasenaValida:boolean=false;
  errorFlag: boolean = false;
  errorMsj: string = "";
  urlFoto : string = '../../../assets/imagenes/icono-anonimo.png';
 


  constructor(private loginService: LoginService, private spinnerService: SpinnerService, public formViewer: FormViewerService, private router: Router, private servicioStorage: StorageService, private dataUsuarios: DataUsuariosService, private scanner: QrScannerService) {

    addIcons({ camera, barcodeOutline })
  }

  ngOnInit(): void {

    this.formRegistro = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern(this.formViewer.nombresRegex), Validators.minLength(3)]),
      apellido: new FormControl('', [Validators.required, Validators.pattern(this.formViewer.nombresRegex), Validators.minLength(3)]),
      dni: new FormControl('', [Validators.required, Validators.pattern(this.formViewer.numeroRegex), Validators.minLength(6), Validators.maxLength(9)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.formViewer.emailRegex)]),
      passwordLogin: new FormControl('', [Validators.required, Validators.minLength(10)]),
      passwordLogin2: new FormControl('', [Validators.required, Validators.minLength(10)]),
      // perfilImagen: new FormControl(null, [Validators.required]),
    });
    this.formRegistro.get('passwordLogin')?.valueChanges.subscribe(() => this.validarPwd());
    this.formRegistro.get('passwordLogin2')?.valueChanges.subscribe(() => this.validarPwd());
  }

  obtenerMensajeErrorControl(control: string) {
    return this.formViewer.errorEnControl(this.formRegistro, control);
  }

  escanear() {
    this.scanner.scanQRcode()
    .then((res)=>{

      let partesRespuesta = res.split('@');
      this.formRegistro.patchValue({
        apellido: partesRespuesta[1].toLowerCase(),    
        nombre: partesRespuesta[2].toLowerCase(),  
        dni: partesRespuesta[4],
      });

    })
  }

  validarPwd(){
    if (this.formRegistro.get('passwordLogin')?.valid && this.formRegistro.get('passwordLogin2')?.valid){
      if (this.formRegistro.get('passwordLogin')?.value == this.formRegistro.get('passwordLogin2')?.value){
        this.contrasenaValida = true;
        this.errorFlag= false;
        this.errorMsj=""
      } else {
        this.contrasenaValida = false;
        this.errorFlag= true;
        this.errorMsj="Las contraseñas deben coincidir"
      }
    } else {
      this.contrasenaValida = true;
      this.errorFlag= false;
      this.errorMsj=""
    }
  }


  registrarse(){
    let emailIngresado = this.formRegistro.get('email')?.value;
    let password = this.formRegistro.get('passwordLogin')?.value;
    this.loginService.registrar(emailIngresado, password)
    .then((respuesta)=>{
      this.errorFlag = respuesta.errorFlag;
      this.errorMsj = respuesta.errorMsj;
      if(!this.errorFlag){
        this.cargarUsuarioBD();
        this.limpiarDatos();
        this.router.navigate(['/cliente-espera']);
      }
    })
  }


  async cargarUsuarioBD() {
    if(this.formRegistro.valid){
      const cliente : Usuario = {
        id: '',
        nombre : this.formRegistro.get('nombre')?.value,
        apellido : this.formRegistro.get('apellido')?.value,
        dni: this.formRegistro.get('dni')?.value,
        email : this.formRegistro.get('email')?.value,
        cuil : null,
        tipo : TipoUsuario.cliente,
        fotoPerfil : await this.subirFoto(),
        estado : EstadoCliente.pendiente
      }
     
      
      this.dataUsuarios.crearRegistro(cliente)
      .then((id)=>{
        cliente.id =  id;
        this.subirFoto();
        this.limpiarDatos();
      });

    }

  }




  limpiarDatos() {
    this.errorFlag=false;
    this.formRegistro.reset();
  }

  subirFotoClick() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.foto = input.files[0];
      this.urlFoto = URL.createObjectURL(this.foto);
    }

    
  }


 async  subirFoto()  {
    let respuesta = '';
    let email = this.formRegistro.get('email')?.value;
    if (this.foto) {

    respuesta = await this.servicioStorage.upload("/clientes/" + email + ".png" , this.foto)
        .then((url) => {
          return url;
          
        });
    } 
    return respuesta;
  }

}
