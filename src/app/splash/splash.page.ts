import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SplashPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.ocultarLogoPrincipalIso();
    this.mostrarLogoPrincipalTexto();
    this.mostrarNombres();
  }

  ocultarLogoPrincipalIso () {
    setTimeout(() => {
      let element = document.getElementById('logo-imagen');
      element?.classList.add('oculta');
    }, 6000);
  }

  mostrarLogoPrincipalTexto () {
    setTimeout(() => {
      let element = document.getElementById('logo-texto');
      element?.classList.remove('oculta');
    }, 4000);
  }

  mostrarNombres () {
    setTimeout(() => {
      let nombres = document.getElementById('nombres');
      nombres?.classList.remove('oculta');
      let bienvenidos = document.getElementById('bienvenidos');
      bienvenidos?.classList.remove('oculta');
    }, 2000);
  }

}
