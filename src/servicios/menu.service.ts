import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  collectionData,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  orderBy,
} from '@angular/fire/firestore';

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  tiempo_preparacion: number;
  sector: string;
  imagenUno: string;
  imagenDos: string;
  imagenTres: string;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public coleccionProductos: Producto[] = [];

  constructor(private firestore: Firestore) {
    this.obtenerDatos();

    //PRODUCTOS DADOS DE ALTA

    // this.coleccionProductos = [
    //   {
    //     id: '',
    //     nombre: 'Pizza Margarita',
    //     descripcion:
    //       'Pizza clásica italiana con tomate, mozzarella y albahaca.',
    //     precio: 12000,
    //     tiempo_preparacion: 20,
    //     sector: 'cocina',
    //     imagenUno:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB4MTxfHZbBxCjudcLsovlOXkhGwNEOTPLRg&s',
    //     imagenDos:
    //       'https://www.clarin.com/img/2023/08/01/SL3EslnOA_1200x630__1.jpg',
    //     imagenTres:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLtAXoQk5S0tC773aqoLLT4sZk6pY4QxuzKA&s',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Hamburguesa Clásica',
    //     descripcion:
    //       'Hamburguesa con carne, queso, lechuga, tomate y salsas. Con papas fritas.',
    //     precio: 9500,
    //     tiempo_preparacion: 15,
    //     sector: 'cocina',
    //     imagenUno:
    //       'https://img.freepik.com/fotos-premium/foto-stock-hamburguesa-clasica-aislada-blanco_1021632-693.jpg',
    //     imagenDos: 'https://assets.unileversolutions.com/recipes-v2/218401.jpg',
    //     imagenTres:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAftMyaULeIXM7MwGgDgZpHxK7D4lC4mdhXw&s',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Ensalada César',
    //     descripcion:
    //       'Lechuga romana, croutones, queso parmesano y aderezo César.',
    //     precio: 7000,
    //     tiempo_preparacion: 10,
    //     sector: 'cocina',
    //     imagenUno:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI5U-EEAtczktNnqrMv1cn011TQRYsi_Ownw&s',
    //     imagenDos:
    //       'https://www.gourmet.cl/wp-content/uploads/2016/09/Ensalada_C%C3%A9sar-web-553x458.jpg',
    //     imagenTres:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpi28zFDsiUJYvmtQkUGsgqyA6AIAw3ZiOoQ&s',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Pasta Carbonara',
    //     descripcion: 'Espaguetis en salsa cremosa con panceta y queso.',
    //     precio: 11000,
    //     tiempo_preparacion: 25,
    //     sector: 'cocina',
    //     imagenUno:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_uTy4fo4Fq1CXdSgBsKpaAsYtABq-hgQc6A&s',
    //     imagenDos:
    //       'https://www.gourmet.cl/wp-content/uploads/2016/12/Carbonara-editada.jpg',
    //     imagenTres: 'https://i.blogs.es/e0be61/salsa_carbonara/1366_2000.jpg',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Tacos al Pastor',
    //     descripcion: 'Tortillas de maíz con carne marinada, piña y cilantro.',
    //     precio: 7500,
    //     tiempo_preparacion: 12,
    //     sector: 'cocina',
    //     imagenUno:
    //       'https://comedera.com/wp-content/uploads/sites/9/2017/08/tacos-al-pastor-receta.jpg',
    //     imagenDos:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrrl4PPqkv_RdLUQJDWEV-TIYpphzAh9KcMQ&s',
    //     imagenTres:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkY2LjgzMN3zrzakLYoD7xBAlIvdjv3WMTWg&s',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Sushi Roll California',
    //     descripcion:
    //       'Roll con aguacate, pepino y cangrejo, cubierto de sésamo.',
    //     precio: 13000,
    //     tiempo_preparacion: 18,
    //     sector: 'cocina',
    //     imagenUno:
    //       'https://upload.wikimedia.org/wikipedia/commons/d/db/California_Sushi_mit_Kaviar_%2826545022496%29.jpg',
    //     imagenDos:
    //       'https://images.immediate.co.uk/production/volatile/sites/30/2024/01/California-roll-a87199c.jpg',
    //     imagenTres:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEzmOy71SL1b1rs6at2Dz0G9HHqzShB97MdA&s',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Ravioles de Espinaca',
    //     descripcion:
    //       'Ravioles rellenos de espinaca y ricota, con salsa de tomate.',
    //     precio: 11500,
    //     tiempo_preparacion: 22,
    //     sector: 'cocina',
    //     imagenUno:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd68v7TYWQiDpshNtYb_G_4EO1Pa72M6yv-A&s',
    //     imagenDos:
    //       'https://cocinerosargentinos.com/content/recipes/original/ravioles-de-ricota-espinaca-y-mortadela-con-salsa-de-albahaca.5274.jpg',
    //     imagenTres:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9WrH9egNZPRBuFcBnDA2mGbm4W1aEEzBXoA&s',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Sándwich de Pollo',
    //     descripcion:
    //       'Pan ciabatta con pechuga de pollo, queso cheddar y mayonesa.',
    //     precio: 9000,
    //     tiempo_preparacion: 14,
    //     sector: 'cocina',
    //     imagenUno:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfEAzmF0eqyLfabkJ0tB_BiY-Rdi_M7JYbAQ&s',
    //     imagenDos:
    //       'https://img-global.cpcdn.com/recipes/01b981c938511c7d/1200x630cq70/photo.jpg',
    //     imagenTres:
    //       'https://acomer.pe/wp-content/uploads/2017/07/panconpollothumb.jpg',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Ceviche Mixto',
    //     descripcion:
    //       'Mariscos frescos marinados en jugo de limón con cebolla y cilantro.',
    //     precio: 13500,
    //     tiempo_preparacion: 18,
    //     sector: 'cocina',
    //     imagenUno: 'https://assets.unileversolutions.com/recipes-v2/238028.jpg',
    //     imagenDos: 'https://assets.unileversolutions.com/recipes-v2/245213.jpg',
    //     imagenTres:
    //       'https://ombligoparao.cl/wp-content/uploads/2023/07/Receta-de-Ceviche-Mixto-Peruano.jpg',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Empanadas de Carne',
    //     descripcion: 'Empanadas horneadas rellenas de carne, cebolla y huevo.',
    //     precio: 1500,
    //     tiempo_preparacion: 10,
    //     sector: 'cocina',
    //     imagenUno:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmEunivKaNxq7oZb-8c2C7OJg_mQkNnK2Fg&s',
    //     imagenDos: 'https://assets.unileversolutions.com/recipes-v2/237001.jpg',
    //     imagenTres:
    //       'https://resizer.glanacion.com/resizer/v2/a-la-hora-de-pensar-en-empanadas-de-carne-vale-la-64QJ4Q4NLZCERNGU22MPWDJMUI.png?auth=c0aa5a91ec3666c78a72b12e472f80e77f9defc516ab3049a0a9b5eec9bee2fc&width=1280&height=854&quality=70&smart=true',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Sopa de Calabaza',
    //     descripcion: 'Crema de calabaza con especias, ideal para días fríos.',
    //     precio: 7000,
    //     tiempo_preparacion: 15,
    //     sector: 'cocina',
    //     imagenUno:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9VIfEZzHhddApc8jdSu1dBpvaj_MRdGlVLA&s',
    //     imagenDos: 'https://imag.bonviveur.com/sopa-de-calabaza.jpg',
    //     imagenTres:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81Giom6znBSPkVc6tM7RvsrBz3gAyAZqQng&s',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Pollo Asado',
    //     descripcion: 'Pollo marinado y asado, acompañado de papas al horno.',
    //     precio: 15000,
    //     tiempo_preparacion: 30,
    //     sector: 'cocina',
    //     imagenUno:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShDC7wJ4KaFzks77qKeWOafnDd28Fj5rLsiQ&s',
    //     imagenDos:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKJARbywsuzou4D2O6mpRN07cHfX0LXjvOcA&s',
    //     imagenTres:
    //       'https://www.paulinacocina.net/wp-content/uploads/2021/11/pollo-asado-800x800.jpg',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Heineken',
    //     descripcion: 'Cerveza en porrón.',
    //     precio: 4500,
    //     tiempo_preparacion: 5,
    //     sector: 'barra',
    //     imagenUno:
    //       'https://acdn.mitiendanube.com/stores/871/106/products/942dc9d6-034e-4632-9a79-f48febf55596_nube-220582656a0a30e3bf16161669860019-640-0.jpg',
    //     imagenDos:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQewFxg99mhpUZH3i_yDQnZCU34OO9QWaIn8Q&s',
    //     imagenTres:
    //       'https://srglobo.com.ar/wp-content/uploads/2024/04/cerveza-heineken.png',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Coca-Cola Regular',
    //     descripcion: 'Gaseosa cola de primera marca con azúcar agregada.',
    //     precio: 3300,
    //     tiempo_preparacion: 5,
    //     sector: 'barra',
    //     imagenUno:
    //       'https://m.media-amazon.com/images/I/51v8nyxSOYL._SL1500_.jpg',
    //     imagenDos:
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTaEelAaYS6LfVF8ttL3pt3QFo-3A5hhj6Xw&s',
    //     imagenTres:
    //       'https://cdn.milenio.com/uploads/media/2019/06/10/coca-cola-mantenido-respetuosa-esencia_74_0_1125_700.jpg',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Pizza Pepperoni',
    //     descripcion: 'Pizza con base de tomate, queso mozzarella y pepperoni.',
    //     precio: 14000,
    //     tiempo_preparacion: 20,
    //     sector: 'cocina',
    //     imagenUno: 'https://unareceta.com/wp-content/uploads/2016/08/receta-Pizza-pepperoni.jpg',
    //     imagenDos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtXQO2fKRpwcnaLMdoR55rSYsWpwseE2qnqA&s',
    //     imagenTres: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIoXjS-sXqWGIsMTB_m3av-Oh-Fgi93hBrzg&s',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Lasagna',
    //     descripcion: 'Capas de pasta, carne, queso y salsa de tomate al horno.',
    //     precio: 13500,
    //     tiempo_preparacion: 35,
    //     sector: 'cocina',
    //     imagenUno: 'https://alimentosdoria.com/wp-content/uploads/2023/06/Como-preparar-Lasagna-Mixta.jpg',
    //     imagenDos: 'https://alimentosdoria.com/wp-content/uploads/2024/08/receta-lasagna-de-carne-1.jpg',
    //     imagenTres: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/3B707DAE-A600-44FC-B7D5-15896184874D/Derivates/e3304b41-3431-4b6e-b600-8ee6bd94cdbe.jpg',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Burrito de Pollo',
    //     descripcion: 'Tortilla rellena de pollo, arroz, frijoles y guacamole.',
    //     precio: 9500,
    //     tiempo_preparacion: 15,
    //     sector: 'cocina',
    //     imagenUno: 'https://ariztia.com/wp-content/uploads/2023/11/burritos-de-pollo.jpg',
    //     imagenDos: 'https://cdn5.recetasdeescandalo.com/wp-content/uploads/2021/07/Burritos-de-pollo-con-frijoles-aguacate-y-verduras-riquisimos.jpg',
    //     imagenTres: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVTp4M01NzDqeefzH2JN2Oelkjr6Aet6B-aA&s',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Papas Fritas',
    //     descripcion: 'Crocantes papas fritas doradas, ideales para acompañar.',
    //     precio: 4500,
    //     tiempo_preparacion: 8,
    //     sector: 'cocina',
    //     imagenUno: 'https://images-gmi-pmc.edge-generalmills.com/476c10e1-c851-4539-8e3b-4b49323927c5.jpg',
    //     imagenDos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSp-5_AWe1z_nUUe_xdjmRZBHrKJUV5YNofA&s',
    //     imagenTres: 'https://www.chilis.pe/Multimedia/productos/facebook/PAPASFRITASCASERAS_V1.PNG',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Wrap Vegetariano',
    //     descripcion: 'Tortilla rellena con vegetales frescos y hummus.',
    //     precio: 8500,
    //     tiempo_preparacion: 12,
    //     sector: 'cocina',
    //     imagenUno: 'https://nuecesdecalifornia.com/wp-content/uploads/2016/01/wraps-vegetarianos-con-hummus.jpg',
    //     imagenDos: 'https://img.freepik.com/fotos-premium/wrap-sandwich-vegetariano-hummus-aguacate-brotes-tortilla-trigo_124507-148664.jpg',
    //     imagenTres: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/18c36c82-3546-4161-a623-df32d5b772ca/Derivates/0fdbd110-1b51-4b80-9b88-005c083404e3.jpg',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Fish & Chips',
    //     descripcion: 'Pescado frito con papas, un clásico inglés.',
    //     precio: 14500,
    //     tiempo_preparacion: 20,
    //     sector: 'cocina',
    //     imagenUno: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Fish_and_chips_blackpool.jpg/640px-Fish_and_chips_blackpool.jpg',
    //     imagenDos: 'https://www.paulinacocina.net/wp-content/uploads/2023/12/fish-and-chips-receta-original-paulina-cocina-recetas-1729805733-676x676.jpg',
    //     imagenTres: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Fish_and_chips.jpg/800px-Fish_and_chips.jpg',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Helado de Chocolate',
    //     descripcion: 'Delicioso helado de chocolate artesanal.',
    //     precio: 4500,
    //     tiempo_preparacion: 5,
    //     sector: 'postre',
    //     imagenUno: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/A37674DB-83CE-4AFB-AC66-B632B9EEAEA7/Derivates/f46fc419-9591-4356-8624-b4d3456d6221.jpg',
    //     imagenDos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNy56Mfie1nQszbQE7QB2D_SzsEZaFgO-6vg&s',
    //     imagenTres: 'https://chefeel.com/chefgeneralfiles/2022/05/hela-1-880x762.jpg',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Café Espresso',
    //     descripcion: 'Café negro intenso, servido en taza pequeña.',
    //     precio: 2000,
    //     tiempo_preparacion: 3,
    //     sector: 'barra',
    //     imagenUno: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQswGLta-a0xViixEqTIbKz0hzp_atz1SaXWw&s',
    //     imagenDos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNfKdsZRGFYkGiI9Vc18KLWT3B9fRrjtsbsQ&s',
    //     imagenTres: 'https://www.teka.com/es-es/wp-content/uploads/sites/2/2022/02/cafe%CC%81-carajillo.jpg',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Bagel con Salmón Ahumado',
    //     descripcion: 'Bagel relleno con salmón, queso crema y alcaparras.',
    //     precio: 9500,
    //     tiempo_preparacion: 10,
    //     sector: 'cocina',
    //     imagenUno: 'https://www.ahumadosdominguez.es/wp-content/uploads/2024/03/bagel-samon-ahumado-receta.png',
    //     imagenDos: 'https://d36fw6y2wq3bat.cloudfront.net/recipes/bagel-de-salmon-y-pepinillos/900/bagel-de-salmon-y-pepinillos_version_1649390440.jpg',
    //     imagenTres: 'https://www.k33kitchen.com/wp-content/uploads/2019/07/k33kitchen_vegan-salmon-carrot-lox-cream-cheese-bagel_feature.jpg',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Polenta con Queso',
    //     descripcion: 'Polenta cremosa con queso parmesano.',
    //     precio: 6500,
    //     tiempo_preparacion: 15,
    //     sector: 'cocina',
    //     imagenUno: 'https://www.rosalat.com.ar/wp-content/uploads/2022/11/receta-polenta-con-queso.jpg?ezimgfmt=rs:358x476/rscb1/ngcb1/notWebP',
    //     imagenDos: 'https://img-global.cpcdn.com/recipes/a7af7b883f94ca8a/680x482cq70/polenta-con-queso-y-aceite-de-oliva-foto-principal.jpg',
    //     imagenTres: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYb5UWHJMYKmrK7VAyikcaGDQ9Zw5KfwurrQ&s',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Arroz Chaufa',
    //     descripcion: 'Salteado de arroz estilo peruano con pollo y vegetales.',
    //     precio: 10500,
    //     tiempo_preparacion: 20,
    //     sector: 'cocina',
    //     imagenUno: 'https://www.gourmet.cl/wp-content/uploads/2019/04/Arroz-chaufa-edit-2.jpg',
    //     imagenDos: 'https://i.ytimg.com/vi/5FMQpIGx0qY/sddefault.jpg',
    //     imagenTres: 'https://img-global.cpcdn.com/recipes/2c8d710e47bd2420/400x400cq70/photo.jpg',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Tarta de Manzana',
    //     descripcion: 'Tarta de manzana caramelizada con masa crujiente.',
    //     precio: 5500,
    //     tiempo_preparacion: 12,
    //     sector: 'postre',
    //     imagenUno: 'https://www.hola.com/horizon/landscape/3f40d4998fc3-tarta-manzan-arguinano-t.jpg?im=Resize=(640),type=downsize',
    //     imagenDos: 'https://fraulacatering.com/wp-content/uploads/elementor/thumbs/Tarta-de-manzana-rosa-gralbaixa-pytjo1oz4emkkm1xw50bj2klt2se0kcg6jq9p5um3c.jpg',
    //     imagenTres: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHugsWnaLJIIHpQHBINWer0MLkwp5jMXH-Mw&s',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Ramen de Cerdo',
    //     descripcion:
    //       'Caldo japonés con fideos, huevo, cerdo y cebolla de verdeo.',
    //     precio: 14500,
    //     tiempo_preparacion: 30,
    //     sector: 'cocina',
    //     imagenUno: 'https://cocinaconcoqui.com/wp-content/uploads/2022/03/ramen-con-costillas-de-cerdo-en-casa.png',
    //     imagenDos: 'https://cdn0.recetasgratis.net/es/posts/2/7/6/ramen_34672_600.jpg',
    //     imagenTres: 'https://cocinaconcoqui.com/wp-content/uploads/2022/06/ramen-con-panceta-de-cerdo.jpg',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Falafel con Salsa Tahini',
    //     descripcion: 'Croquetas de garbanzo acompañadas de salsa tahini.',
    //     precio: 9000,
    //     tiempo_preparacion: 10,
    //     sector: 'cocina',
    //     imagenUno: 'https://okdiario.com/img/2018/08/20/falafels-con-salsa-de-tahini-1-620x349.jpg',
    //     imagenDos: 'https://img-global.cpcdn.com/recipes/43b638a458495a0d/680x482cq70/falafel-con-salsa-de-tahini-foto-principal.jpg',
    //     imagenTres: 'https://www.hola.com/horizon/landscape/093c17b57aed-falafel-salsa-yogur-tahini-t.jpg?im=Resize=(640),type=downsize',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Brownie de Chocolate',
    //     descripcion: 'Brownie con nueces y chocolate fundido.',
    //     precio: 4500,
    //     tiempo_preparacion: 8,
    //     sector: 'postre',
    //     imagenUno: 'https://cdn0.recetasgratis.net/es/posts/4/7/3/brownie_casero_8374_orig.jpg',
    //     imagenDos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmHY0XWxplBeZDnsYQZfC69BJVg4XFFCKdTw&s',
    //     imagenTres: 'https://gbprodstorage.blob.core.windows.net/files/styles/recipe_main_image_mobile/windowsazurestorage/recipes/1540122926f35780ff08bb4c50321b802023aacb1d.jpg?h=289976fd',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Omelette de Verduras',
    //     descripcion: 'Omelette esponjoso con espinaca, champiñones y queso.',
    //     precio: 6500,
    //     tiempo_preparacion: 10,
    //     sector: 'cocina',
    //     imagenUno: 'https://storage.googleapis.com/avena-recipes/agtzfmF2ZW5hLWJvdHIZCxIMSW50ZXJjb21Vc2VyGICAgMW2rJ8LDA/06-05-2023/cVfAYO4dnUT50oo4L1KH1683402897539.jpeg',
    //     imagenDos: 'https://mejorconsalud.as.com/wp-content/uploads/2018/03/Receta-para-preparar-omelette-de-verduras.png',
    //     imagenTres: 'https://cordobanutricion.com/wp-content/uploads/2016/03/omelette-de-verduras.png',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Churros con Dulce de Leche',
    //     descripcion:
    //       'Churros fritos espolvoreados con azúcar y rellenos de dulce de leche.',
    //     precio: 2000,
    //     tiempo_preparacion: 7,
    //     sector: 'postre',
    //     imagenUno: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr4tquLGUzmXV5Rno-ExgSCLPJwSmWMubDbQ&s',
    //     imagenDos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScDj83BwSS5xqTNMZZUOIzTJm5Ur6k1dyHEQ&s',
    //     imagenTres: 'https://www.lactobaltar.com/wp-content/uploads/2023/12/churros-rellenos-de-dulce-de-leche.png',
    //   },
    //   {
    //     id: '',
    //     nombre: 'Smoothie de Frutas',
    //     descripcion: 'Batido fresco con frutas tropicales y yogur.',
    //     precio: 4500,
    //     tiempo_preparacion: 5,
    //     sector: 'barra',
    //     imagenUno: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh7sk_UQgARbW04RXcy982PMAXCW1fsLl0rA&s',
    //     imagenDos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn9gTPlMZUH-naYXcS7G6oGj3M8JS-Y5YZLg&s',
    //     imagenTres: 'https://img.freepik.com/fotos-premium/mezcla-batidos-yogur-frutas-diferentes-bayas-frutas-tropicales-sobre-mesa-madera_323015-3815.jpg',
    //   },
    // ];
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

  obtenerDatos() {
    const col = collection(this.firestore, 'menu');
    // Aplica la ordenación por la columna 'sector'
    const queryConOrden = query(col, orderBy('sector', 'asc')); // Cambia 'asc' por 'desc' si necesitas orden descendente
    const observable = collectionData(queryConOrden, { idField: 'id' });

    observable.subscribe((respuesta: any) => {
      this.coleccionProductos = respuesta;
    });
  }

  //   private modificarRegistro(producto : Producto, data: any) {
  //     console.log(producto);
  //     let col = collection(this.firestore, 'menu');
  //     const docRef = doc(col, producto.id);

  //     updateDoc(docRef, data);
  //   }

  async obtenerMenuPorProducto(unProducto: string) {
    const col = collection(this.firestore, 'menu');
    const pedidoQuery = query(col, where('idPedido', '==', unProducto));

    const pedidoSnapshot = await getDocs(pedidoQuery);

    if (!pedidoSnapshot.empty) {
      // Retornamos el documento con el campo 'id' incluido
      const producto = pedidoSnapshot.docs[0].data() as Producto;
      producto.id = pedidoSnapshot.docs[0].id;
      return producto;
    }

    return null;
  }
}
