import type { Producto } from '../types/producto'

interface ProductoCardProps {
  producto: Producto
  onAgregar: (codigo: string) => void
}

function ProductoCard({ producto, onAgregar }: ProductoCardProps) {
  return (
    <div className="card h-100">
      <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">${producto.precio.toLocaleString('es-CL')}</p>
        <button
          className="btn btn-primary mt-auto"
          onClick={() => onAgregar(producto.codigo)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}

export default ProductoCard