export enum EstadoProductoEnPedido {
  sinConfirmar = 'Sin confirmar', //Cliente agrega productos y espera que el mozo confirme el pedido
  pendiente = 'Pendiente', //Mozo confirma el pedido
  enPreparacion = 'En preparación', //Cocinero o Bartener -> cambia estado en preparación
  listoParaEntregar = 'Listo para entregar', //Cocinero o Bartener -> cambia estado producto listo
  entregado = 'Entregado',
}
