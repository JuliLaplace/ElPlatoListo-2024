import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(p => p.HomePage)
  },
  {
    path: 'cliente-espera',
    loadComponent: () => import('./paginas/cliente-espera/cliente-espera.page').then( m => m.ClienteEsperaPage)
  },
  {
    path: 'listado-clientes-pendientes',
    loadComponent: () => import('./paginas/listado-clientes-pendientes/listado-clientes-pendientes.page').then( m => m.ListadoClientesPendientesPage)
  },
  {
    path: 'pagina-mensajes',
    children: [
      {
        path: ':mensajeId',
        loadComponent: () => import('./paginas/pagina-mensajes/pagina-mensajes.page').then( m => m.PaginaMensajesPage)
      }
    ]
  },
  {
    path: 'cliente-pedido-en-curso',
    loadComponent: () => import('./componentes/cliente-pedido-en-curso/cliente-pedido-en-curso.component').then( c => c.ClientePedidoEnCursoComponent)
  },

];
