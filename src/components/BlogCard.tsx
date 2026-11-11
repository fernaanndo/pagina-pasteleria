import { Link } from 'react-router'
import type { Blog } from '../types/blog'

interface BlogCardProps {
  blog: Blog
}

function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="card mb-4">
      <div className="row g-0">
        <div className="col-md-7 card-body d-flex flex-column justify-content-center">
          <p className="text-muted mb-1">{blog.categoria}</p>
          <h2 className="h4">{blog.titulo}</h2>
          <p>{blog.descripcion}</p>
          <Link to={`/blogs/${blog.id}`} className="btn btn-primary align-self-start">
            Ver caso →
          </Link>
        </div>
        <div className="col-md-5">
          <img src={blog.imagen} alt={blog.alt} className="img-fluid h-100 w-100 object-fit-cover" />
        </div>
      </div>
    </article>
  )
}

export default BlogCard