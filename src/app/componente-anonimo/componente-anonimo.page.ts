import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-componente-anonimo',
  templateUrl: './componente-anonimo.page.html',
  styleUrls: ['./componente-anonimo.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ComponenteAnonimoPage implements OnInit {
  cargando: boolean = false;
  public imagenPerfil: string = '../../../assets/imagenes/icono-anonimo.png';
  constructor() {}
  ngOnInit() {}

  tomarFoto() {}
}
