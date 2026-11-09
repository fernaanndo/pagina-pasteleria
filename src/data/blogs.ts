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
  },
  {
    id: 2,
    categoria: 'Consejos dulces',
    titulo: 'Un caso curioso: cómo conservar un pastel',
    descripcion:
      'Te contamos algunos consejos sencillos para conservar la frescura y disfrutar cada porción como recién preparada.',
    imagen: '/img/products/torta-frutas.jpg',
    alt: 'Detalle de un pastel artesanal',
  },
]