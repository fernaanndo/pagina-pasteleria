import type { Producto } from '../types/producto'
import ProductoCard from './ProductoCard'

interface ListaProductosProps {
  productos: Producto[]
  onAgregar: (codigo: string) => void
}

function ListaProductos({ productos, onAgregar }: ListaProductosProps) {
  return (
    <div className="row g-4">
      {productos.map((producto) => (
        <div key={producto.codigo} className="col-12 col-sm-6 col-lg-3">
          <ProductoCard producto={producto} onAgregar={onAgregar} />
        </div>
      ))}
    </div>
  )
}

export default ListaProductos