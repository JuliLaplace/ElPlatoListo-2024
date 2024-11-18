export enum EstadoProductoEnPedido {
  pendiente = 'Pendiente',
  enPreparacion = 'En preparación', //Cocinero o Bartener -> cambia estado en preparación
  listoParaEntregar = 'Listo para entregar', //Cocinero o Bartener -> cambia estado producto listo
  entregado = 'Entregado',
}
