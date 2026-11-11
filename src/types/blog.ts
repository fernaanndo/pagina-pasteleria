export interface SeccionBlog {
  titulo?: string
  parrafos: string[]
}

export interface Blog {
  id: number
  categoria: string
  titulo: string
  descripcion: string
  imagen: string
  alt: string
  tituloDetalle: string
  subtitulo: string
  secciones: SeccionBlog[]
  videoUrl?: string
  textoBoton: string
}