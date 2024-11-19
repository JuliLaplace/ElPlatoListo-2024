import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { TipoUsuario } from 'src/app/enumerados/tipo-usuario';
import { DataUsuariosPushService } from './data-usuarios-push.service';

@Injectable({
  providedIn: 'root',
})
export class NotificadorPushService {
  private readonly servidor: string =
    'https://elplatolisto-backend.onrender.com';
  constructor(
    private http: HttpClient,
    private dataUsuariosPush: DataUsuariosPushService
  ) {}

  //ACÁ HACER TODAS LAS NOTIFICACIONES
  notificarDuenoClienteNuevo() {
    let mensaje: string = 'Tenés un cliente esperando aceptación';
    this.notificarPorRol(mensaje, TipoUsuario.dueno);
    this.notificarPorRol(mensaje, TipoUsuario.supervisor);
  }

  notificarMaitreClienteEnListaEspera() {
    let mensaje: string = 'Tenés un cliente en lista de espera';
    this.notificarPorRol(mensaje, TipoUsuario.maitre);
  }

  private notificarPorRol(mensaje: string, rol: TipoUsuario) {
    this.http
      .post(this.servidor + '/notify-role', {
        title: 'El Plato Listo',
        body: mensaje,
        role: rol,
      })
      .pipe(take(1))
      .subscribe((r) => {
        console.log(r);
      });
  }

  private async notificar(mensaje: string, mail: string) {
    let token = await this.dataUsuariosPush.fetchTokenByEmail(mail);
    if (token) {
      this.http
        .post(this.servidor + '/notify', {
          title: 'El Plato Listo',
          body: mensaje,
          token: token,
        })
        .pipe(take(1))
        .subscribe((r) => {
          console.log(r);
        });
    }
  }

  enviarMail(aceptacion: boolean, nombreUsuario: string, mail: string) {
    this.http
      .post(this.servidor + '/send-mail', {
        aceptacion: aceptacion,
        nombreUsuario: nombreUsuario,
        mail: mail,
      })
      .pipe(take(1))
      .subscribe((r) => {
        console.log(r);
      });
  }

  notificarMozoConsultaDeCliente(mesa: number) {
    let mensaje: string = 'Tenés un mensaje de la mesa ' + mesa;
    this.notificarPorRol(mensaje, TipoUsuario.mozo);
  }

  notificarCocinaBartenderDePedidosParaRealizar() {
    let mensaje: string = 'Tenés un nuevo pedido por realizar.';
    this.notificarPorRol(mensaje, TipoUsuario.cocinero);
    this.notificarPorRol(mensaje, TipoUsuario.bartender);
  }

  notificarMozoPedidoParaServir() {
    let mensaje: string = 'Tenés un pedido listo para servir.';
    this.notificarPorRol(mensaje, TipoUsuario.mozo);
  }

  notificarMozoPedidoDeCuenta(mesa: number) {
    let mensaje: string = 'Pedido de cuenta en mesa ' + mesa + '.';
    this.notificarPorRol(mensaje, TipoUsuario.mozo);
  }

  enviarMailRegistro(nombreUsuario: string, mail: string) {
    this.http
      .post(this.servidor + '/send-register-mail', {
        nombreUsuario: nombreUsuario,
        mail: mail,
      })
      .pipe(take(1))
      .subscribe((r) => {
        console.log(r);
      });
  }
}

