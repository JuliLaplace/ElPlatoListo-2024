import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SesionService } from 'src/servicios/sesion.service';
import { TabsComponent } from 'src/app/componentes/tabs/tabs.component';
import { FormViewerService } from 'src/servicios/form-viewer.service';
import { CamaraService } from 'src/servicios/camara.service';
import { StorageService } from 'src/servicios/storage.service';
import { Encuesta, EncuestaService, ServiciosAdicionales } from 'src/servicios/encuesta.service';
import { addIcons } from 'ionicons';
import { happyOutline, sadOutline } from 'ionicons/icons';
import { PedidoService } from 'src/servicios/pedido.service';

@Component({
  selector: 'app-pagina-formulario-encuesta',
  templateUrl: './pagina-formulario-encuesta.page.html',
  styleUrls: ['./pagina-formulario-encuesta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabsComponent, ReactiveFormsModule]
})
export class PaginaFormularioEncuestaPage implements OnInit {

  formEncuesta!: FormGroup;
  fotos: File [] = [];
  private readonly url_defecto = "https://ionicframework.com/docs/img/demos/thumbnail.svg";
  urlFotos : string[] = [this.url_defecto, this.url_defecto, this.url_defecto];


  constructor( public sesion : SesionService, public formViewer : FormViewerService, private camaraService : CamaraService, private servicioStorage: StorageService, private encuestaService : EncuestaService, private pedidoService: PedidoService) { 
    addIcons({ happyOutline, sadOutline });
  }

  
  ngOnInit(): void {
    this.formEncuesta = new FormGroup({
      mensaje: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
      calidadServicio: new FormControl(null, Validators.required),
      calificacionLimpieza: new FormControl(null, Validators.required),
      aspectoMasValorado: new FormControl(null, Validators.required),
      serviciosAdicionales1: new FormControl(false),
      serviciosAdicionales2: new FormControl(false),
      serviciosAdicionales3: new FormControl(false),
      serviciosAdicionales4: new FormControl(false),
    });
  }

  


  subirEncuesta(){
    if (this.formEncuesta.valid) {
      this.cargarEncuestaBD();
      
    } else {
      console.log("Formulario inválido");
    }
  }

  async cargarEncuestaBD() {
    if(this.formEncuesta.valid){

      const servicios: ServiciosAdicionales ={
        wifi : this.formEncuesta.get('serviciosAdicionales1')?.value,
        juegos: this.formEncuesta.get('serviciosAdicionales2')?.value,
        musica: this.formEncuesta.get('serviciosAdicionales3')?.value,
        aireLibre: this.formEncuesta.get('serviciosAdicionales4')?.value,
      }
      const encuesta : Encuesta = {
        id: '',
        mensaje : this.formEncuesta.get('mensaje')?.value,
        calidadServicio: this.formEncuesta.get('calidadServicio')?.value,
        calificacionLimpieza: this.formEncuesta.get('calificacionLimpieza')?.value,
        aspectoMasValorado: this.formEncuesta.get('aspectoMasValorado')?.value,
        serviciosAdicionales: servicios,
        email: this.sesion.usuarioBD!.email,
        foto1: this.fotos[0] ? await this.subirFoto(0) : '',
        foto2: this.fotos[1] ? await this.subirFoto(1) : '',
        foto3: this.fotos[2] ? await this.subirFoto(2) : '',

        
      };
      this.encuestaService.crearRegistro(encuesta)
      .then((id)=>{
        encuesta.id =  id;
        this.pedidoService.cargarEncuesta(encuesta.id);
        this.limpiarDatos();
      });

    }

  }

  limpiarDatos() {
    this.formEncuesta.reset();
  }

  subirFotoClick(numeroFoto : number) {
    this.camaraService.sacarFoto()
    .then((foto)=>{
      if(foto){
        this.fotos[numeroFoto] = this.camaraService.convertPhotoToFile(foto, 'foto');
        this.urlFotos[numeroFoto] = URL.createObjectURL(this.fotos[numeroFoto]);
      }
    });
  }


 async  subirFoto(number: number)  {
    let respuesta = '';
    let email = this.sesion.usuarioActual?.email;
    if (this.fotos) {

    respuesta = await this.servicioStorage.upload("/encuesta/" + email + number + ".png" , this.fotos[number])
        .then((url) => {
          return url;
        });
    } 
    return respuesta;
  }

  boton(){
     console.log(this.formEncuesta.get('serviciosAdicionales2')?.value)
  }
}
