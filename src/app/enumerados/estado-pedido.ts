export enum EstadoPedido {
    sinMesa = "Sin mesa asignada", // Cliente escanea el QR de entrada - Cliente entra a lista de espera - Push a Maitre
    sinPedido = "Pedido a confirmar", //Maitre asigna mesa a Cliente y tiene que realizar pedido
    esperandoMozo = "Esperando mozo", //Cliente hace pedido y queda a la espera de que el mozo confirme
    enPreparacion = "Pedido en preparación", //Mozo confirma el pedido - Bartender / Cocinero recibe push
    pedidoListo = 'Pedido Listo', //Mozo entrega el pedido (Cuando todos los productos del pedido están en listoParaEntregar) - Push Mozo
    entregandoPedido = 'Entregando pedido', // Mozo lleva el pedido a la mesa
    aceptoPedido = 'Pedido aceptado', //Cliente confirma la recepción del pedido
    clientePideCuenta = 'Cliente solicita la cuenta', //Cliente pide la cuenta
    pagado = 'Pagado', //Cliente realiza el pago
    pagoConfirmado = 'Pago confirmado', //Mozo confirma el pago del cliente
    finalizado = "Finalizado", //Cliente se va del local
}