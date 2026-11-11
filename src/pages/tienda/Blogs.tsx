import BlogCard from '../../components/BlogCard'
import { blogs } from '../../data/blogs'

function Blogs() {
  return (
    <div className="py-4">
      <header className="mb-4">
        <p className="text-muted mb-1">Historias recién horneadas</p>
        <h1>Noticias importantes</h1>
        <p>Conoce las novedades, ideas y momentos especiales de nuestra pastelería.</p>
      </header>

      <section aria-label="Noticias y artículos">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </section>
    </div>
  )
}

export default Blogs