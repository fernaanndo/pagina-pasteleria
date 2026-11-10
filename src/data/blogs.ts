import type { Blog } from '../types/blog'

export const blogs: Blog[] = [
  {
    id: 1,
    categoria: 'Nuestra historia',
    titulo: 'Un caso curioso: el origen de nuestros sabores',
    descripcion:
      'Descubre cómo una receta familiar y algunos ingredientes inesperados dieron vida a uno de nuestros pasteles favoritos.',
    imagen: '/img/products/imagen_inicio.jpg',
    alt: 'Pastel preparado en nuestra pastelería',
    tituloDetalle: 'El origen de nuestros sabores',
    subtitulo:
      'Una receta familiar, ingredientes inesperados y el comienzo de una tradición dulce.',
    secciones: [
      {
        parrafos: [
          'En nuestra pastelería, cada receta tiene una historia. Esta comenzó en una cocina familiar, donde las tardes de preparación eran una oportunidad para compartir y probar nuevas combinaciones.',
        ],
      },
      {
        titulo: 'Una combinación inesperada',
        parrafos: [
          'Al mezclar ingredientes clásicos con frutas de temporada, apareció un sabor equilibrado que pronto se convirtió en uno de los favoritos de quienes nos visitaban. La receta fue cambiando con el tiempo, pero siempre conservó su preparación artesanal.',
          'Hoy seguimos preparando cada pastel con el mismo cuidado: ingredientes seleccionados, tiempo para cada etapa y ese toque casero que hace especial cada celebración.',
        ],
      },
    ],
    textoBoton: 'Descubre nuestros productos',
  },
  {
    id: 2,
    categoria: 'Consejos dulces',
    titulo: 'Un caso curioso: cómo conservar un pastel',
    descripcion:
      'Te contamos algunos consejos sencillos para conservar la frescura y disfrutar cada porción como recién preparada.',
    imagen: '/img/products/torta-frutas.jpg',
    alt: 'Detalle de un pastel artesanal',
    tituloDetalle: 'Cómo conservar un pastel',
    subtitulo:
      'Pequeños cuidados para mantener su textura, sabor y frescura por más tiempo.',
    secciones: [
      {
        parrafos: [
          'Para disfrutar tu pastel como recién preparado, conviene protegerlo del aire y de los cambios de temperatura. Si no lo servirás de inmediato, guárdalo cubierto en el refrigerador.',
        ],
      },
      {
        titulo: 'Antes de servir',
        parrafos: [
          'Saca las porciones del refrigerador unos minutos antes de servirlas para que recuperen su textura y aroma. Evita dejar el pastel expuesto al sol o cerca de fuentes de calor, especialmente si tiene crema o fruta fresca.',
          'Si quedan porciones, guárdalas en un recipiente hermético. Así conservarán mejor su humedad y no absorberán aromas de otros alimentos.',
        ],
      },
    ],
    videoUrl: 'https://www.youtube.com/embed/WLoSNSsRKDA',
    textoBoton: 'Encuentra tu próximo pastel',
  },
]