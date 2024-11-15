import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AudioService } from 'src/servicios/audio.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SplashPage implements OnInit {

  constructor(
    private router: Router, private audioService: AudioService
  ) { }

  ngOnInit() {

    this.audioService.reporoduccionSplash();
    this.ocultarLogoPrincipalIso();
    this.mostrarLogoPrincipalTexto();
    this.mostrarNombres();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 12000);
    
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
