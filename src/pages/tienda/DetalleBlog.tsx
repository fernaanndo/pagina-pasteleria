import { Link, useParams } from 'react-router'
import { blogs } from '../../data/blogs'

function DetalleBlog() {
  const { id } = useParams()
  const blog = blogs.find((b) => b.id === Number(id))

  if (!blog) {
    return (
      <div className="py-4">
        <p>No se encontró el blog.</p>
        <Link to="/blogs">← Volver a noticias</Link>
      </div>
    )
  }

  return (
    <div className="py-4">
      <Link to="/blogs">← Volver a noticias</Link>
      <article className="mt-3">
        <header className="mb-3">
          <p className="text-muted mb-1">
            {blog.categoria} · Caso curioso #{blog.id}
          </p>
          <h1>{blog.tituloDetalle}</h1>
          <p>{blog.subtitulo}</p>
        </header>

        <img src={blog.imagen} alt={blog.alt} className="img-fluid rounded mb-4" />

        {blog.secciones.map((seccion, i) => (
          <section key={i}>
            {seccion.titulo && <h2 className="h4">{seccion.titulo}</h2>}
            {seccion.parrafos.map((texto, j) => (
              <p key={j}>{texto}</p>
            ))}
          </section>
        ))}

        {blog.videoUrl && (
          <>
            <h2 className="h4">Mira cómo hacerlo</h2>
            <div className="ratio ratio-16x9 mb-4">
              <iframe src={blog.videoUrl} title={blog.tituloDetalle} allowFullScreen></iframe>
            </div>
          </>
        )}

        <Link to="/productos" className="btn btn-primary">
          {blog.textoBoton}
        </Link>
      </article>
    </div>
  )
}

export default DetalleBlog