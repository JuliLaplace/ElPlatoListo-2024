import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/servicios/data-usuarios.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomeAdminComponent {
  @Input() usuario!: Usuario | null;

  constructor() { }


}