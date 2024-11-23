import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TabsComponent } from 'src/app/componentes/tabs/tabs.component';
import { SesionService } from 'src/servicios/sesion.service';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { FormViewerService } from 'src/servicios/form-viewer.service';
import { StorageService } from 'src/servicios/storage.service';
import { CamaraService } from 'src/servicios/camara.service';
import { MenuService, Producto } from 'src/servicios/menu.service';
@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.page.html',
  styleUrls: ['./alta-productos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabsComponent,  ReactiveFormsModule, RouterLink]
})
export class AltaProductosPage implements OnInit {

  formAltaProducto!: FormGroup;
  errorFlag: boolean = false;
  errorMsj: string = "";
  private readonly url_defecto = "https://ionicframework.com/docs/img/demos/thumbnail.svg";
  urlFotos : string[] = [this.url_defecto, this.url_defecto, this.url_defecto];
  fotos: File [] = [];


  constructor(public formViewer: FormViewerService, private servicioStorage: StorageService,  private camaraService : CamaraService, public sesion : SesionService, private menu : MenuService) { }

  ngOnInit() {

    this.formAltaProducto = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern(this.formViewer.nombresRegex), Validators.minLength(3)]),
      descripcion: new FormControl('', [Validators.required, Validators.pattern(this.formViewer.nombresRegex), Validators.minLength(3), Validators.maxLength(20)]),
      precio: new FormControl('', [Validators.required, Validators.pattern(this.formViewer.numeroRegex), Validators.minLength(3), Validators.maxLength(6)]),
      tiempo: new FormControl('', [Validators.required, Validators.pattern(this.formViewer.numeroRegex), Validators.minLength(1), Validators.maxLength(2)]),
    });
  }

  obtenerMensajeErrorControl(control: string) {
    return this.formViewer.errorEnControl(this.formAltaProducto, control);
  }

  limpiarDatos() {
    this.errorFlag=false;
    this.urlFotos = [this.url_defecto, this.url_defecto, this.url_defecto];
    this.formAltaProducto.reset();
  }
/////////////
  cargarProducto(){
    if (this.formAltaProducto.valid) {
      this.cargarProductoBD()
      .then(()=>{
        console.log("Cargue!");
      })
    } 
  }

  async cargarProductoBD() {
    if(this.formAltaProducto.valid){
      let nombreProducto = this.formAltaProducto.get('nombre')?.value;
      let sectorProducto = '';
      if(this.sesion.esBartender()){
        sectorProducto = 'barra'
      }else{
        sectorProducto = 'cocina'
      }
      const producto : Producto = {
        id: '',
        nombre : nombreProducto,
        descripcion: this.formAltaProducto.get('descripcion')?.value,
        precio: parseInt(this.formAltaProducto.get('precio')?.value),
        tiempo_preparacion: parseInt(this.formAltaProducto.get('tiempo')?.value),
        imagenUno: this.fotos[0] ? await this.subirFoto(0, nombreProducto) : '',
        imagenDos: this.fotos[1] ? await this.subirFoto(1, nombreProducto) : '',
        imagenTres: this.fotos[2] ? await this.subirFoto(2, nombreProducto) : '',
        sector : sectorProducto,

      };
      this.menu.crearRegistro(producto)
      .then((id)=>{
        producto.id =  id;
        this.limpiarDatos();  
      });
      
    }

  }


///////////////

  subirFotoClick(numeroFoto : number) {
    this.camaraService.sacarFoto()
    .then((foto)=>{
      if(foto){
        this.fotos[numeroFoto] = this.camaraService.convertPhotoToFile(foto, 'foto');
        this.urlFotos[numeroFoto] = URL.createObjectURL(this.fotos[numeroFoto]);
      }
    });
  }


 async  subirFoto(number: number, nombre: string)  {
    let respuesta = '';
    let email = this.sesion.usuarioActual?.email;
    if (this.fotos) {

    respuesta = await this.servicioStorage.upload("/menu/" + nombre + number + ".png" , this.fotos[number])
        .then((url) => {
          return url;
        });
    } 
    return respuesta;
  }

}
