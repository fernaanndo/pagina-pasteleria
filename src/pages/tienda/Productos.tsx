import ListaProductos from '../../components/ListaProductos'
import { obtenerProductos } from '../../services/storage'
import { useCarrito } from '../../context/useCarrito'

function Productos() {
  const { agregar } = useCarrito()

  return (
    <div className="py-4">
      <div className="mb-4">
        <h1>Productos</h1>
        <p>Descubre nuestra variedad de tortas y pasteles.</p>
      </div>
      <ListaProductos
        productos={obtenerProductos()}
        onAgregar={(codigo) => agregar(codigo, 1)}
      />
    </div>
  )
}

export default Productos