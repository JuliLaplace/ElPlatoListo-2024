import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, collectionData, query, where, getDocs, doc, updateDoc } from '@angular/fire/firestore';

export interface Producto{
//   id: string,
  nombre: string,
  descripcion: string,
  precio: number,
  tiempo_preparacion: number,
  imagenUno: string,
  imagenDos: string,
  imagenTres: string
}
@Injectable({
  providedIn: 'root',
})
export class MenuService {

  public coleccionProductos: Producto[] = [];

  constructor(private firestore: Firestore) {

    // this.obtenerDatos();
    this.coleccionProductos = [
        // {
        // //   id: '',
        //   nombre: "Pizza Margarita",
        //   descripcion: "Pizza clásica italiana con tomate, mozzarella y albahaca.",
        //   precio: 12000,
        //   tiempo_preparacion: 20,
        //   imagenUno: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB4MTxfHZbBxCjudcLsovlOXkhGwNEOTPLRg&s',
        //   imagenDos: 'https://www.clarin.com/img/2023/08/01/SL3EslnOA_1200x630__1.jpg',
        //   imagenTres: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLtAXoQk5S0tC773aqoLLT4sZk6pY4QxuzKA&s'
        // },
        {
        //   id: '',
            nombre: "Hamburguesa Clásica",
          descripcion: "Hamburguesa con carne, queso, lechuga, tomate y salsas. Con papas fritas.",
          precio: 9500,
          tiempo_preparacion: 15,
          imagenUno: 'https://img.freepik.com/fotos-premium/foto-stock-hamburguesa-clasica-aislada-blanco_1021632-693.jpg',
          imagenDos: 'https://assets.unileversolutions.com/recipes-v2/218401.jpg',
          imagenTres: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAftMyaULeIXM7MwGgDgZpHxK7D4lC4mdhXw&s'
        },
        {
        //   id: '',
            nombre: "Ensalada César",
          descripcion: "Lechuga romana, croutones, queso parmesano y aderezo César.",
          precio: 7000,
          tiempo_preparacion: 10,
          imagenUno: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI5U-EEAtczktNnqrMv1cn011TQRYsi_Ownw&s',
          imagenDos: 'https://www.gourmet.cl/wp-content/uploads/2016/09/Ensalada_C%C3%A9sar-web-553x458.jpg',
          imagenTres: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpi28zFDsiUJYvmtQkUGsgqyA6AIAw3ZiOoQ&s'
        },
        {
        //   id: '',
            nombre: "Pasta Carbonara",
          descripcion: "Espaguetis en salsa cremosa con panceta y queso.",
          precio: 11000,
          tiempo_preparacion: 25,
          imagenUno: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_uTy4fo4Fq1CXdSgBsKpaAsYtABq-hgQc6A&s',
          imagenDos: 'https://www.gourmet.cl/wp-content/uploads/2016/12/Carbonara-editada.jpg',
          imagenTres: 'https://i.blogs.es/e0be61/salsa_carbonara/1366_2000.jpg'
        },
        {
        //   id: '',
            nombre: "Tacos al Pastor",
          descripcion: "Tortillas de maíz con carne marinada, piña y cilantro.",
          precio: 7500,
          tiempo_preparacion: 12,
          imagenUno: 'https://comedera.com/wp-content/uploads/sites/9/2017/08/tacos-al-pastor-receta.jpg',
          imagenDos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrrl4PPqkv_RdLUQJDWEV-TIYpphzAh9KcMQ&s',
          imagenTres: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkY2LjgzMN3zrzakLYoD7xBAlIvdjv3WMTWg&s'
        },
        {
        //   id: '',
            nombre: "Sushi Roll California",
          descripcion: "Roll con aguacate, pepino y cangrejo, cubierto de sésamo.",
          precio: 13000,
          tiempo_preparacion: 18,
          imagenUno: 'https://upload.wikimedia.org/wikipedia/commons/d/db/California_Sushi_mit_Kaviar_%2826545022496%29.jpg',
          imagenDos: 'https://images.immediate.co.uk/production/volatile/sites/30/2024/01/California-roll-a87199c.jpg',
          imagenTres: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEzmOy71SL1b1rs6at2Dz0G9HHqzShB97MdA&s'
        },
        {
        //   id: '',
            nombre: "Ravioles de Espinaca",
          descripcion: "Ravioles rellenos de espinaca y ricota, con salsa de tomate.",
          precio: 11500,
          tiempo_preparacion: 22,
          imagenUno: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd68v7TYWQiDpshNtYb_G_4EO1Pa72M6yv-A&s',
          imagenDos: 'https://cocinerosargentinos.com/content/recipes/original/ravioles-de-ricota-espinaca-y-mortadela-con-salsa-de-albahaca.5274.jpg',
          imagenTres: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9WrH9egNZPRBuFcBnDA2mGbm4W1aEEzBXoA&s'
        },
        {
        //   id: '',
            nombre: "Sándwich de Pollo",
          descripcion: "Pan ciabatta con pechuga de pollo, queso cheddar y mayonesa.",
          precio: 9000,
          tiempo_preparacion: 14,
          imagenUno: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfEAzmF0eqyLfabkJ0tB_BiY-Rdi_M7JYbAQ&s',
          imagenDos: 'https://img-global.cpcdn.com/recipes/01b981c938511c7d/1200x630cq70/photo.jpg',
          imagenTres: 'https://acomer.pe/wp-content/uploads/2017/07/panconpollothumb.jpg'
        },
        {
        //   id: '',
            nombre: "Ceviche Mixto",
          descripcion: "Mariscos frescos marinados en jugo de limón con cebolla y cilantro.",
          precio: 1350,
          tiempo_preparacion: 18,
          imagenUno: 'https://assets.unileversolutions.com/recipes-v2/238028.jpg',
          imagenDos: 'https://assets.unileversolutions.com/recipes-v2/245213.jpg',
          imagenTres: 'https://ombligoparao.cl/wp-content/uploads/2023/07/Receta-de-Ceviche-Mixto-Peruano.jpg'
        },
        {
        //   id: '',
            nombre: "Empanadas de Carne",
          descripcion: "Empanadas horneadas rellenas de carne, cebolla y huevo.",
          precio: 1500,
          tiempo_preparacion: 10,
          imagenUno: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmEunivKaNxq7oZb-8c2C7OJg_mQkNnK2Fg&s',
          imagenDos: 'https://assets.unileversolutions.com/recipes-v2/237001.jpg',
          imagenTres: 'https://resizer.glanacion.com/resizer/v2/a-la-hora-de-pensar-en-empanadas-de-carne-vale-la-64QJ4Q4NLZCERNGU22MPWDJMUI.png?auth=c0aa5a91ec3666c78a72b12e472f80e77f9defc516ab3049a0a9b5eec9bee2fc&width=1280&height=854&quality=70&smart=true'
        },
        {
        //   id: '',
            nombre: "Sopa de Calabaza",
          descripcion: "Crema de calabaza con especias, ideal para días fríos.",
          precio: 700,
          tiempo_preparacion: 15,
          imagenUno: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9VIfEZzHhddApc8jdSu1dBpvaj_MRdGlVLA&s',
          imagenDos: 'https://imag.bonviveur.com/sopa-de-calabaza.jpg',
          imagenTres: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81Giom6znBSPkVc6tM7RvsrBz3gAyAZqQng&s'
        },
        {
        //   id: '',
            nombre: "Pollo Asado",
          descripcion: "Pollo marinado y asado, acompañado de papas al horno.",
          precio: 1500,
          tiempo_preparacion: 30,
          imagenUno: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShDC7wJ4KaFzks77qKeWOafnDd28Fj5rLsiQ&s',
          imagenDos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKJARbywsuzou4D2O6mpRN07cHfX0LXjvOcA&s',
          imagenTres: 'https://www.paulinacocina.net/wp-content/uploads/2021/11/pollo-asado-800x800.jpg'
        },
        {
            //   id: '',
            nombre: "Heineken",
            descripcion: "Cerveza en porrón.",
            precio: 4500,
            tiempo_preparacion: 5,
            imagenUno: 'https://acdn.mitiendanube.com/stores/871/106/products/942dc9d6-034e-4632-9a79-f48febf55596_nube-220582656a0a30e3bf16161669860019-640-0.jpg',
            imagenDos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQewFxg99mhpUZH3i_yDQnZCU34OO9QWaIn8Q&s',
            imagenTres: 'https://srglobo.com.ar/wp-content/uploads/2024/04/cerveza-heineken.png'
        },
        {
            //   id: '',
            nombre: "Coca-Cola Regular",
            descripcion: "Gaseosa cola de primera marca con azúcar agregada.",
            precio: 3300,
            tiempo_preparacion: 5,
            imagenUno: 'https://m.media-amazon.com/images/I/51v8nyxSOYL._SL1500_.jpg',
            imagenDos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTaEelAaYS6LfVF8ttL3pt3QFo-3A5hhj6Xw&s',
            imagenTres: 'https://cdn.milenio.com/uploads/media/2019/06/10/coca-cola-mantenido-respetuosa-esencia_74_0_1125_700.jpg'
        },
        // {
        // //   id: '',
        //     nombre: "Pizza Pepperoni",
        //   descripcion: "Pizza con base de tomate, queso mozzarella y pepperoni.",
        //   precio: 1400,
        //   tiempo_preparacion: 20,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Lasagna",
        //   descripcion: "Capas de pasta, carne, queso y salsa de tomate al horno.",
        //   precio: 1600,
        //   tiempo_preparacion: 35,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Burrito de Pollo",
        //   descripcion: "Tortilla rellena de pollo, arroz, frijoles y guacamole.",
        //   precio: 950,
        //   tiempo_preparacion: 15,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Papas Fritas",
        //   descripcion: "Crocantes papas fritas doradas, ideales para acompañar.",
        //   precio: 350,
        //   tiempo_preparacion: 8,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Wrap Vegetariano",
        //   descripcion: "Tortilla rellena con vegetales frescos y hummus.",
        //   precio: 850,
        //   tiempo_preparacion: 12,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Fish & Chips",
        //   descripcion: "Pescado frito con papas, un clásico inglés.",
        //   precio: 1450,
        //   tiempo_preparacion: 20,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Helado de Chocolate",
        //   descripcion: "Delicioso helado de chocolate artesanal.",
        //   precio: 450,
        //   tiempo_preparacion: 5,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Café Espresso",
        //   descripcion: "Café negro intenso, servido en taza pequeña.",
        //   precio: 300,
        //   tiempo_preparacion: 3,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Bagel con Salmón Ahumado",
        //   descripcion: "Bagel relleno con salmón, queso crema y alcaparras.",
        //   precio: 950,
        //   tiempo_preparacion: 10,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Polenta con Queso",
        //   descripcion: "Polenta cremosa con queso parmesano.",
        //   precio: 800,
        //   tiempo_preparacion: 15,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Arroz Chaufa",
        //   descripcion: "Salteado de arroz estilo peruano con pollo y vegetales.",
        //   precio: 1050,
        //   tiempo_preparacion: 20,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Tarta de Manzana",
        //   descripcion: "Tarta de manzana caramelizada con masa crujiente.",
        //   precio: 600,
        //   tiempo_preparacion: 12,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Ramen de Cerdo",
        //   descripcion: "Caldo japonés con fideos, huevo, cerdo y cebolla de verdeo.",
        //   precio: 1450,
        //   tiempo_preparacion: 30,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Falafel con Salsa Tahini",
        //   descripcion: "Croquetas de garbanzo acompañadas de salsa tahini.",
        //   precio: 900,
        //   tiempo_preparacion: 10,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Brownie de Chocolate",
        //   descripcion: "Brownie con nueces y chocolate fundido.",
        //   precio: 450,
        //   tiempo_preparacion: 8,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Omelette de Verduras",
        //   descripcion: "Omelette esponjoso con espinaca, champiñones y queso.",
        //   precio: 850,
        //   tiempo_preparacion: 10,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Churros con Dulce de Leche",
        //   descripcion: "Churros fritos espolvoreados con azúcar y rellenos de dulce de leche.",
        //   precio: 550,
        //   tiempo_preparacion: 7,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // },
        // {
        // //   id: '',
        //     nombre: "Smoothie de Frutas",
        //   descripcion: "Batido fresco con frutas tropicales y yogur.",
        //   precio: 600,
        //   tiempo_preparacion: 5,
        //   imagenUno: '',
        //   imagenDos: '',
        //   imagenTres: ''
        // }
      ];
  }

  async crearRegistro(producto: Producto): Promise<string> {
    let col = collection(this.firestore, 'menu');
    return await addDoc(col, producto).then((ref) => {
      return ref.id;
    });
  }

//   async obtenerProducto(id: string) {
//     const col = collection(this.firestore, 'menu');
//     const productoQuery = query(col, where('id', '==', id));
//     const productoSnapshot = await getDocs(productoQuery);
    
//     if (!productoSnapshot.empty) {
//       // Devuelve el primer producto encontrado, si coindice con el email
//       return productoSnapshot.docs[0].data() as Producto;
//     }
    
//     // Si no encuentra el producto
//     return null;
//   }

  obtenerDatos(){
    let col = collection(this.firestore, 'menu');
    const observable = collectionData(col, {idField: 'id'});
    observable.subscribe((respuesta:any) => {
      this.coleccionProductos = respuesta;
    })
  }

//   private modificarRegistro(producto : Producto, data: any) {
//     console.log(producto);
//     let col = collection(this.firestore, 'menu');
//     const docRef = doc(col, producto.id);
    
//     updateDoc(docRef, data);
//   }

}
