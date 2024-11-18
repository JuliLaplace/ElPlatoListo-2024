import { CommonModule, NgFor, NgIf } from '@angular/common';
//import { Component, OnInit, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatService, Mensaje } from 'src/servicios/chat.service';
import { SesionService } from 'src/servicios/sesion.service';
import { IonicModule } from '@ionic/angular';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

//-----------------------------------------------
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/servicios/data-usuarios.service';
import { Pedido, PedidoService } from 'src/servicios/pedido.service';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnDestroy, OnInit, AfterViewChecked {
  mensajeAEnviar: string = '';
  public listaMensajes: Array<Mensaje> = new Array<Mensaje>();

  uidPedido: string = '';
  pedido: Pedido | null = null;
  nuevoMensaje: string = '';
  sub?: Subscription;
  @ViewChild('scrollAnchor') private scrollAnchor?: ElementRef;

  constructor(
    public sesion: SesionService,
    public chatServicio: ChatService,
    private route: ActivatedRoute,
    private router: Router,
    private pedidoServicio: PedidoService
  ) {
    addIcons({
      send,
    });
  }

  async ngOnInit() {
    this.uidPedido = this.route.snapshot.paramMap.get('uidPedido') || '';
    //this.pedido = await this.pedidoServicio.obtenerPedidoPorUid(this.uidPedido);
    this.sub = this.chatServicio
      .getMensajes('ZKRCsWV2RQwSWd6iIBHU')
      .subscribe((respuesta: any) => {
        this.listaMensajes = respuesta;
      });
  }

  enviarMensaje() {
    if (
      this.nuevoMensaje.trim() != '' &&
      this.uidPedido &&
      this.pedido &&
      this.sesion.usuarioBD
    ) {
      const mensaje: Mensaje = {
        uidPedido: this.uidPedido,
        nroMesa: this.pedido.mesa,
        uidUsuario: this.sesion.usuarioBD.email,
        mensaje: this.nuevoMensaje,
        fecha: new Date(),
      };
      this.chatServicio.enviarMensaje(mensaje);
      this.nuevoMensaje = '';
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    if (this.scrollAnchor) {
      this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}

