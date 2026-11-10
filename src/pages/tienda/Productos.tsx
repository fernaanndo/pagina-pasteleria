import ListaProductos from '../../components/ListaProductos'
import { productos } from '../../data/productos'

function Productos() {
  return (
    <main className="container py-4">
      <div className="mb-4">
        <h1>Productos</h1>
        <p>Descubre nuestra variedad de tortas y pasteles.</p>
      </div>
      <ListaProductos
        productos={productos}
        onAgregar={(codigo) => console.log(codigo)}
      />
    </main>
  )
}

export default Productos