<h1 style="text-align: center; color:#9c1de0;">El Plato Listo 🍴</h1>
<div style="display: flex; justify-content: center;">
  <img src="/src/assets/imagenes/logo-elplatolisto-iso.png" alt="Logo 'El Plato Listo'" title="EL Plato Listo">
</div>

<h2 style="text-align: center; color:#9c1de0;"> Descripción </h2>
> Esta aplicación móvil facilita la gestión de información y operaciones en un restaurante, optimizando la experiencia de los usuarios y el personal.  <br>
> Mediante el uso de la cámara y la lectura de códigos QR, se mejora la administración y la interacción con los clientes, empleados y supervisores. <br>
> La aplicación permite la gestión de altas de personal, clientes y productos, así como el uso de códigos QR para diversas funcionalidades como reservas, pedidos y encuestas de satisfacción.

[PDF Manual de marca](https://docs.google.com/presentation/d/12BvNdNQDN33GNRKp5SlMan76F2CaxibQrjMy7-tfLRE/edit#slide=id.p)

<br>

## 👩‍💻 _Integrantes_ 👩‍💻

- Laplace von Hinke, María Julieta.
- Bogado, Candela.
- Colque, Laura. 

<br>


## ✨ _Ramas / Branches_ ✨
- [Branch Candela](https://github.com/JuliLaplace/ElPlatoListo-2024/tree/Candela)
- [Branch Julieta](https://github.com/JuliLaplace/ElPlatoListo-2024/tree/Julieta)
- [Branch Laura](https://github.com/JuliLaplace/ElPlatoListo-2024/tree/Laura)

<br>
<br>

## _Funcionalidades Principales_
### Altas
1. Alta de dueño/supervisor: Registro de nombre, apellido, DNI, CUIL, foto y perfil (dueño o supervisor) mediante cámara y QR.
2. Alta de empleados: Registro de datos personales, tipo de empleado y foto.
3. Alta de clientes: Registro de clientes con opción de anónimo, utilizando cámara y QR.
4. Alta de mesas: Registro de número, tipo y cantidad de comensales, junto con una foto y un código QR asociado.
5. Alta de productos: Registro de productos (nombre, descripción, tiempo de elaboración y precio) con tres fotos y un código QR.

### Códigos QR
1. Ingreso al local: Permite a los clientes ingresar a la lista de espera y responder encuestas.
2. Mesa: Verificación de disponibilidad, asignación de clientes, consulta al mozo, menú, estado del pedido y juegos.
3. Propina: Evaluación de la satisfacción con niveles de propina entre 0 y 20%.

### Gestión
1. Clientes pendientes de aprobación: Supervisores y dueños pueden aprobar nuevos clientes y enviar notificaciones de aprobación.
2. Ingreso al local: Escaneo de QR para ingresar, realizar encuestas y unirse a la lista de espera.
3. Pedidos: Los clientes y mozos pueden realizar y confirmar pedidos escaneando QR de la mesa.
4. Confirmación de pedidos: Cocineros y bartenders actualizan el estado de los pedidos, y el mozo confirma el servicio en mesa.
5. Reservas: Clientes registrados pueden reservar mesas en horarios específicos, y supervisores/dueños confirman las reservas.

<br>
<br>

## 📲 _Arquitectura del proyecto_ 📲
| Nombre | URL | Descripción |
| ------ | ------ | ------ |
| Node.js | https://nodejs.org/en/ | v20.17.|
| IonicFramework | https://ionicframework.com/ | v7.2. |
| Angular | https://angular.dev/ | v18. |
| Firebase | https://firebase.google.com/ | Para el uso de los servicios de Authentication y Firestore Database. |
| Supabase storage | https://supabase.com/ | Para el almacenamiento de imágenes. |
| Capacitor | https://capacitorjs.com/ | Para acceso a la cámara y lectura de códigos QR. |
| ------ | ------ | ------ |

<br>


## 💻 _Objetivos a desarrollar_ 💻
Detalles de la construcción 🛠️

### 📆 Semana 1: Sábado 26/10 al 02/11 

##### Diseño
- Diseño de Icono - Bogado Candela.
- Diseño splash estático/splash animado - Bogado Candela.
- Diseño pantalla Home - Bogado Candela.
- Diseño formulario Alta - Laplace von Hinke María Julieta.
- Diseño pantalla login - Colque Laura.

##### Gestión
- Creación de proyecto en Firebase, vinculación de servicios Authentication/Firestore - Laplace von Hinke María Julieta.
- Creación de servicio de sesión / servicio de login / servicio de validación de formularios - Laplace von Hinke María Julieta.
- Funcionalidad login - Colque Laura.
- Servicio Spinner / creación de spinner - Colque Laura.

✅ Se entregó video con Splash - Diseño de login - diseño de registro.

📌 DETALLES DE LA ENTREGA 02/11
> Correciones de la semana: 
> - Agregar imagen con ícono.
> - La fuente elegida para el splash no se lee bien.
> - Los botones de acceso rápido tendrían que tener distintos colores, son imágenes muy chicas y no se distinguen bien. O, hacerlos más grandes.
> - Agregar tilde en 'aún'.
> - Evitar los colores de fondo blanco / claritos.
> - La contraseña debe tener otro campo para poder repetirla y compararla.

----------------------------------------------------------------------------------------------------------------------------------------------------
### 📆 Semana 2: Sábado 02/11 al 09/11 

> Realizamos una reunión las tres integrantes del proyecto y decidimos abordar las correcciones:

> Laplace von Hinke, María Julieta: 
> 1. Cambiar los colores claros en los formularios de registro.
> 2. Crear campo nuevo para verificar contraseña.
> 3. Generar la validación para que las contraseñas sean iguales.

> Bogado Candela:
> 1. Agregar imagen con ícono de aplicación.
> 2. Modificar tipografía y tamaño de fuente en splash.

> Colque Laura:
> 1. Modificar los botónes de acceso rápido (tamaño mayor, colores distintos)
> 2. Cambiar los colores claros en formularios de inicio de sesión.

##### Altas
- Alta cliente / cliente anónimo (funcionalidad completa de registro de clientes)- Laplace von Hinke María Julieta.

##### Diseño
- Creación y diseño de pantallas Home (Home - HomeAdministrador) -  Bogado Candela.
- Creación de tabs de navegación - Colque Laura.

##### Gestión
- Servicio Sonidos - Colque Laura.
- Creación de rutas y guards - Bogado Candela.
- Creación de servicio de storage/ servicio de qr scanner - Laplace von Hinke María Julieta.

❌ No se entregó - no se llegó con los objetivos (aplicación funcionando).
----------------------------------------------------------------------------------------------------------------------------------------------------
### 📆 Semana 3: Sábado 09/11 al 16/11 

##### Gestión
- Modificación de rutas y guards de ingreso - Laplace von Hinke María Julieta.
- Creación de componente HomeCliente / Funcionalidad de escanear QR - Laplace von Hinke María Julieta.
- Creación de Lista de clientes en espera / Funcionalidad de aceptar-rechazar clientes - Laplace von Hinke María Julieta.

##### Diseño
- Modificación de footer y header - Bogado Candela.
- Modificación, creación y diseño de pantallas Home (diseño final) -  Bogado Candela.

##### Códigos QR’s
- QR de ingreso al local - Colque Laura.
- QR de Mesas (de mesa 1 a mesa 5) - Colque Laura.
- QR de Menú - Colque Laura.


✅ Se entregó video con puntos 1, 2, 3.


----------------------------------------------------------------------------------------------------------------------------------------------------
### 📆 Semana 4: Sábado 16/11 al 23/11 

(Desde el Sábado 16/11 al Lunes 18/11)
> Realizamos una reunión las tres integrantes del proyecto para la creación de nuestro servidor, para así poder incorporar a nuestro proyecto push notifications y el envío de correos electrónicos automáticos (desde nuestra cuenta como empresa: elplatolisto@gmail.com). 
> Creamos un [repositorio](https://github.com/JuliLaplace/ElPlatoListo-backend) aparte y dedicimos utilizar [Render](https://render.com/) : plataforma que aloja y ejecuta nuestra aplicación. Además de manejar el servidor donde se encuentra el código, Render permite que nuestra aplicación realice tareas como el envío de notificaciones push en los celulares que tengan instalada la aplicación, además de enviar correos electrónicos de forma automática.

> Después de realizar el hosting de nuestro proyecto, decidimos generar cada una las funciónes necesarias de push notifications (según rol y acción que genera la notificación) y el envío de tres emails con distintas notificaciones para el cliente (registro exitoso en la plataforma, ingreso aceptado, ingreso rechazado).

>Luego de generar el hosting y todo lo relacionado a notificaciones, se prosiguió con nuestro proyecto:

##### Gestión
- Push notification de pre registro de clientes (supervisor/dueño) - Colque, Laura.
- Push notification de ingreso a local de cliente (Maitre) - Bogado Candela.
- Push notification de mensaje de cliente (Mozo) - Colque, Laura.
- Correo electrónico automático (Registro) - Colque Laura.
- Correo electrónico automático (Aceptación de cliente) - Bogado, Candela.
- Correo electrónico automático (Rechazo de cliente) - Laplace von Hinke María Julieta.
- Gestión de ingreso a local - Bogado Candela - Laplace von Hinke María Julieta.
- Gestión de pedido - Colque Laura - Bogado, Candela - Laplace von Hinke María Julieta.
- Gestión Menú - Bogado Candela.
- Chat cliente y mozo - Colque Laura - Bogado, Candela.
- Encuestas Cliente - Laplace von Hinke María Julieta.

##### Diseño
- Diseño de pantalla de mensajes para cliente - Bogado, Candela - Laplace von Hinke María Julieta.
- Diseño de pantalla de mozo - Colque, Laura.
- Diseño de pantalla de encuesta - Laplace von Hinke María Julieta.
- Diseño pantalla bartender/cocinero -  Bogado, Candela.

(Desde Martes 19/11 al Sábado 23/11)

> Realizamos una reunión las tres integrantes del proyecto y decidimos abordar las correcciones:

> Laplace von Hinke, María Julieta: 
> 1. Agregar mensaje que muestre a cliente el estado del pedido (cuando escanea la mesa con pedido en curso).

> Bogado Candela:
> 1. Agregar carrousel de imágenes de productos en sección menú.
> 2. Resaltar el precio de los productos en la sección menú y mostrar el tiempo estimado de preparación.

> Colque Laura:
> 1. Resaltar los estados de los pedidos en pantalla Mozo.

##### Gestión
- Modificación de gestión de preparación de pedido (cocina/bartender) - Bogado, Candela.
- Modificación de gestión de pedido entregado (mozo) - Bogado, Candela.
- Gestión pago - Colque, Laura.
- Gestión de propina - Colque, Laura.
- Push notification de pedido pendiente a realizar (bartender/cocinero) - Laplace von Hinke María Julieta.
- Push notification de pedido de cuenta en mesas (mozo) -Bogado Candela.
- Alta productos - Laplace von Hinke María Julieta.

##### Diseño
- Diseño de página de resultados de encuestas y gráficos de encuestas -  Laplace von Hinke María Julieta.
- Diseño de QR propina - Colque, Laura.
- Carrousel en imágenes en menú de productos - Bogado, Candela.



----------------------------------------------------------------------------------------------------------------------------------------------------


## 📲 _Imágenes QR y valores_ 📲
| Imágen | Valor | 
| ------ | ------ | 
| <img src="/src/assets/qr/QR-Ingreso Local_Prueba.png"> | Valor: "listaEspera" | 
| <img src="/src/assets/qr/QR - Mesa_1.png">  | Valor: "Mesa1" | 
| <img src="/src/assets/qr/QR - Mesa_2.png">  | Valor: "Mesa2" | 
| <img src="/src/assets/qr/QR - Mesa_3.png">  | Valor: "Mesa3" | 
| <img src="/src/assets/qr/QR - Mesa_4.png">  | Valor: "Mesa4" | 
| <img src="/src/assets/qr/QR - Mesa_5.png">  | Valor: "Mesa5" | 
| <img src="/src/assets/qr/QR-Menu.png">  | Valor: "menu" | 
| <img src="src\assets\qr\QR-PROPINA-5.png">  | Valor: "5" | 
| <img src="src\assets\qr\QR-PROPINA-10.png">  | Valor: "10" | 
| <img src="src\assets\qr\QR-PROPINA-15.png">  | Valor: "15" | 
| <img src="src\assets\qr\QR-PROPINA-20.png">  | Valor: "20" | 

----------------------------------------------------------------------------------------------------------------------------------------------------

## 📸 _Imágenes de la aplicación_ 📸
| Imágen | Descripción | 
| ------ | ------ | 
| <img src="src\assets\Imagenes-Aplicacion-Celular\Login.jpeg"> | Pantalla login con botón de usuarios (acceso rápido) desplegado | 
| <img src="src\assets\Imagenes-Aplicacion-Celular\Registro.jpeg">  | Pantalla de registro de cliente nuevo | 
| <img src="src\assets\Imagenes-Aplicacion-Celular\Pantalla Dueño-Supervisor.jpeg">  | Pantalla inicio de dueño/supervisor | 
| <img src="src\assets\Imagenes-Aplicacion-Celular\Pantalla-Clientes-Espera-Dueño.jpeg">  | Pantalla de clientes en espera para dueño/supervisor | 
| <img src="src\assets\Imagenes-Aplicacion-Celular\Pantalla-Ingreso-Cliente.jpeg">  | Pantalla inicio de Cliente | 
| <img src="src\assets\Imagenes-Aplicacion-Celular\Pantalla-Pedidos-Mozo.jpeg">  | Pantalla de pedidos en espera/preparando/listo para mozo | 
| <img src="src\assets\Imagenes-Aplicacion-Celular\Pantalla-CHat-Mozo-Cliente.jpeg">  | Pantalla de chat entre mozo y cliente | 

