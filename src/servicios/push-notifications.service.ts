import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Auth } from '@angular/fire/auth';
import { DataUsuariosService } from './data-usuarios.service';
import { DataUsuariosPushService } from './data-usuarios-push.service';

// https://capacitorjs.com/docs/apis/push-notifications

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {
  

  constructor(
    private dataUsuariosPush: DataUsuariosPushService,
    private dataUsuarios: DataUsuariosService,
    private auth: Auth,
  ) { }

  public async addListeners() {
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);

      //crea en BD el usuario con el token de su celu
      if (this.auth.currentUser && this.auth.currentUser.email){
        let email = this.auth.currentUser.email;
        this.dataUsuarios.obtenerUsuario(email).then((usuario) => {
          if(usuario){
            let tipoUsuario = usuario.tipo;
            this.dataUsuariosPush.pushOrUpdateOne({email: email, rol: tipoUsuario, token: token.value});
          }
        });
      }
      //
    });
  
    await PushNotifications.addListener('registrationError', err => {
      // console.error('Registration error: ', err.error);
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      // console.log('Push notification received: ', notification);
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      // console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }
  
  public async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();
  
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
  
    await PushNotifications.register();
  }
  
  // public async getDeliveredNotifications() {
  //   const notificationList = await PushNotifications.getDeliveredNotifications();
  //   console.log('delivered notifications', notificationList);
  // }
}
