import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SesionService } from 'src/servicios/sesion.service';
import { FormViewerService } from 'src/servicios/form-viewer.service';
import { StorageService } from 'src/servicios/storage.service';
import { CamaraService } from 'src/servicios/camara.service';
import { Mesa, MesaService } from 'src/servicios/mesa.service';
import { RouterLink } from '@angular/router';
import { TabsComponent } from 'src/app/componentes/tabs/tabs.component';
import { EstadoMesa } from 'src/app/enumerados/estado-mesa';
import { QrCodeModule } from 'ng-qrcode';

@Component({
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.page.html',
  styleUrls: ['./alta-mesa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, TabsComponent, QrCodeModule]
})
export class AltaMesaPage implements OnInit {

  formAltaMesa!: FormGroup;
  errorFlag: boolean = false;
  errorMsj: string = "";
  private readonly url_defecto = "https://ionicframework.com/docs/img/demos/thumbnail.svg";
  urlFoto : string= "https://ionicframework.com/docs/img/demos/thumbnail.svg";
  foto!: File;

  constructor(public sesion: SesionService, public formViewer: FormViewerService, private servicioStorage: StorageService,  private camaraService : CamaraService, private dataMesa : MesaService) { }

  ngOnInit() {
    this.formAltaMesa = new FormGroup({
      numero: new FormControl('', [Validators.required, Validators.pattern(this.formViewer.numeroRegex), Validators.minLength(1), Validators.maxLength(2)]),
      tipo: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required, Validators.pattern(this.formViewer.numeroRegex), Validators.minLength(1), Validators.maxLength(2)]),
      
    });
  }
  obtenerMensajeErrorControl(control: string) {
    return this.formViewer.errorEnControl(this.formAltaMesa, control);
  }

  limpiarDatos() {
    this.errorFlag=false;
    this.urlFoto = this.url_defecto;
    this.formAltaMesa.reset();
  }

  cargarMesa(){
    if (this.formAltaMesa.valid) {
      this.cargarMesaBD()
      .then(()=>{
        console.log("Cargue!");
      })
    } 
  }

  async cargarMesaBD() {
    if(this.formAltaMesa.valid){
      let canvas: HTMLCanvasElement = document.getElementsByClassName('qrCanvas')[0] as HTMLCanvasElement;
      let qr: File;
      canvas.toBlob(async (blob) => {
        qr = new File([blob!], "fileName.jpg", { type: "image/jpeg" })
      }, 'image/jpeg');

      let numeroMesa = this.formAltaMesa.get('numero')?.value;
      await this.subirFotoQr(numeroMesa, qr!);

      const mesa : Mesa = {
        id: '',
        numero : parseInt(this.formAltaMesa.get('numero')?.value),
        cantidad : parseInt(this.formAltaMesa.get('cantidad')?.value),
        estado : EstadoMesa.libre,
        foto: this.foto ? await this.subirFoto(numeroMesa) : '', 
        tipo: this.formAltaMesa.get('tipo')?.value,
      };
      this.dataMesa.crearRegistro(mesa)
      .then((id)=>{
        mesa.id =  id;
        this.limpiarDatos();  
      });
      
    }

  }

  subirFotoClick() {
    this.camaraService.sacarFoto()
    .then((foto)=>{
      if(foto){
        this.foto = this.camaraService.convertPhotoToFile(foto, 'foto');
        this.urlFoto = URL.createObjectURL(this.foto);
      }
    });
  }


 async  subirFoto(number: number)  {
    let respuesta = '';
    if (this.foto) {

    respuesta = await this.servicioStorage.upload("/mesas/Mesa_" + number + ".png" , this.foto)
        .then((url) => {
          return url;
        });
    } 
    return respuesta;
  }

  async  subirFotoQr(number: number, qr: File)  {
    let respuesta = '';
    if (qr) {

    respuesta = await this.servicioStorage.upload("/qr/QR_" + number + ".png" , qr)
        .then((url) => {
          return url;
        });
    } 
    return respuesta;
  }

  obtenerNumero(){
    return this.formAltaMesa.get('numero')?.value;
  }

}
