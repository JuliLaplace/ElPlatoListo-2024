import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { 
    
  }

  irAListaDeEspera(){

    this.router.navigate(['/listado-clientes-pendientes']);
    }
}