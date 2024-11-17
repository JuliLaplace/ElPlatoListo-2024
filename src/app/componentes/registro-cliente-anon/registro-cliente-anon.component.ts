import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { camera} from 'ionicons/icons';
import { FormViewerService } from 'src/servicios/form-viewer.service';
import { LoginService } from 'src/servicios/login.service';
import { StorageService } from 'src/servicios/storage.service';
import { IonicModule } from '@ionic/angular';
import { DataUsuariosService, Usuario } from 'src/servicios/data-usuarios.service';
import { TipoUsuario } from 'src/app/enumerados/tipo-usuario';
import { EstadoCliente } from 'src/app/enumerados/estado-cliente';
import { CamaraService } from 'src/servicios/camara.service';

@Component({
  selector: 'app-registro-cliente-anon',
  templateUrl: './registro-cliente-anon.component.html',
  styleUrls: ['./registro-cliente-anon.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class RegistroClienteAnonComponent  implements OnInit {

  formRegistro!: FormGroup;
  foto!: File;
  cargando: boolean = true;
  contrasenaValida:boolean=false;
  errorFlag: boolean = false;
  errorMsj: string = "";
  urlFoto : string = '../../../assets/imagenes/icono-anonimo.png';
  @Output() spinnerActivo = new EventEmitter<any>();


  constructor(private loginService: LoginService, public formViewer: FormViewerService, private router: Router, private servicioStorage: StorageService, private dataUsuarios: DataUsuariosService, private camaraService: CamaraService) {

    addIcons({ camera})
  }

  ngOnInit(): void {

    this.formRegistro = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern(this.formViewer.nombresRegex), Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.formViewer.emailRegex)]),
      passwordLogin: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordLogin2: new FormControl('', [Validators.required, Validators.minLength(6)]),
      // perfilImagen: new FormControl(null, [Validators.required]),
    });
    this.formRegistro.get('passwordLogin')?.valueChanges.subscribe(() => this.validarPwd());
    this.formRegistro.get('passwordLogin2')?.valueChanges.subscribe(() => this.validarPwd());
  }

  obtenerMensajeErrorControl(control: string) {
    return this.formViewer.errorEnControl(this.formRegistro, control);
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
    this.spinnerActivo.emit(true);
    let emailIngresado= this.formRegistro.get('email')?.value;
    let password = this.formRegistro.get('passwordLogin')?.value;
    this.loginService.registrar(emailIngresado, password)
    .then((respuesta)=>{
      this.errorFlag = respuesta.errorFlag;
      this.errorMsj = respuesta.errorMsj;
      if(!this.errorFlag){
        this.cargarUsuarioBD();
        this.limpiarDatos();
        this.spinnerActivo.emit(false);
        this.router.navigate(['/login']);
      }
      this.spinnerActivo.emit(false);
    })
    // this.cargando = false;
  }


  async cargarUsuarioBD() {
    if(this.formRegistro.valid){
      const cliente : Usuario = {
        id: '',
        nombre : this.formRegistro.get('nombre')?.value,
        apellido : null,
        dni: null,
        cuil: null,
        email : this.formRegistro.get('email')?.value,
        tipo : TipoUsuario.clienteAnon,
        fotoPerfil : await this.subirFoto(),
        estado : EstadoCliente.aceptado,
      }
     
      
      this.dataUsuarios.crearRegistro(cliente)
      .then((id)=>{
        cliente.id =  id;
        this.limpiarDatos();
      });

    }

  }



  limpiarDatos() {
    this.errorFlag=false;
    this.formRegistro.reset();
  }

  subirFotoClick() {
    this.camaraService.sacarFoto()
    .then((foto)=>{
      if(foto){
        this.foto = this.camaraService.convertPhotoToFile(foto, 'foto');
        this.urlFoto = URL.createObjectURL(this.foto);
      }
    })
    
    
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
