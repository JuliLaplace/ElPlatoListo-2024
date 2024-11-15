import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/servicios/data-usuarios.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomeClienteComponent  implements OnInit {

  @Input() usuario!: Usuario | null;
  
  constructor() { }

  ngOnInit() {}

}
