import { Link } from 'react-router'
import ListaProductos from '../../components/ListaProductos'
import { productos } from '../../data/productos'

function Home() {
  const recomendados = productos.slice(0, 4)

  return (
    <main className="container py-4">
      <section className="row align-items-center g-4 mb-5" aria-labelledby="home-title">
        <div className="col-md-6">
          <h1 id="home-title">Dulces momentos, hechos para compartir.</h1>
          <p>
            Tortas y postres preparados con dedicación para acompañar tus celebraciones y
            convertir cualquier día en una ocasión especial.
          </p>
          <Link to="/productos" className="btn btn-primary">
            Ver productos
          </Link>
        </div>
        <div className="col-md-6">
          <img
            src="/img/products/imagen_inicio.jpg"
            alt="Pasteles y postres de Pastelería 1000 Sabores"
            className="img-fluid rounded"
          />
        </div>
      </section>

      <section aria-labelledby="recomendados-titulo">
        <h2 id="recomendados-titulo" className="mb-3">
          Los más recomendados
        </h2>
        <ListaProductos
          productos={recomendados}
          onAgregar={(codigo) => console.log(codigo)}
        />
      </section>
    </main>
  )
}

export default Home