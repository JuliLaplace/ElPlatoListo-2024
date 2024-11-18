export enum EstadoPedido {
    sinMesa = "Sin mesa asignada",
    sinPedido = "Pedido a confirmar",
    esperandoMozo = "Esperando mozo", // Cliente espera a que le mozo lo confirme
    enPreparacion = "Pedido en preparación", //Mozo confirma el pedido
    pedidoListo = 'Pedido Listo', //Mozo entrega el pedido (Se cambia el estado cuando los productos en listo)
    aceptoPedido = 'Pedido aceptado', //Cliente confirma la recepción del pedido
    pagado = 'Pagado',
    finalizado = "Finalizado",
}
