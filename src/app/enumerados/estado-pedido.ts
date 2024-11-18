export enum EstadoPedido {
    sinMesa = "Sin mesa asignada", //Cliente entra a lista de espera
    sinPedido = "Pedido a confirmar", //Cliente se le asigna mesa y tiene que realizar pedido
    esperandoMozo = "Esperando mozo", //Cliente hace pedido y queda a la espera de que el mozo confirme
    enPreparacion = "Pedido en preparación", //Mozo confirma el pedido
    pedidoListo = 'Pedido Listo', //Mozo entrega el pedido (Cuando todos los productos del pedido están en listoParaEntregar)
    aceptoPedido = 'Pedido aceptado', //Cliente confirma la recepción del pedido
    pagado = 'Pagado',
    finalizado = "Finalizado",
}
