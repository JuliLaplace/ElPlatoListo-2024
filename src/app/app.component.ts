import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { PushNotificationsService } from 'src/servicios/push-notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private readonly isPushNotificationsAvailable: boolean = Capacitor.isPluginAvailable('PushNotifications');

  constructor(
    private pushNotifications: PushNotificationsService,
  ) {
    if (this.isPushNotificationsAvailable){
      this.pushNotifications.addListeners();
    }
  }
}
