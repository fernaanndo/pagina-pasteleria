import { useState } from 'react'
import { Link } from 'react-router'
import type { Producto } from '../types/producto'

interface ProductoCardProps {
  producto: Producto
  onAgregar: (codigo: string) => void
}

function ProductoCard({ producto, onAgregar }: ProductoCardProps) {
  const [agregado, setAgregado] = useState(false)

  const manejarClick = () => {
    onAgregar(producto.codigo)
    setAgregado(true)
  }

  return (
    <div className="card h-100">
      <Link
        to={`/productos/${producto.codigo}`}
        className="text-decoration-none text-reset"
        aria-label={`Ver detalle de ${producto.nombre}`}
      >
        <img
          src={producto.imagen}
          className="card-img-top"
          alt={producto.nombre}
          loading="lazy"
          style={{ aspectRatio: '3 / 2', objectFit: 'cover' }}
        />
        <div className="card-body pb-0">
          <h5 className="card-title">{producto.nombre}</h5>
        </div>
      </Link>
      <div className="card-body d-flex flex-column">
        <p className="card-text">${producto.precio.toLocaleString('es-CL')}</p>
        <button className="btn btn-primary mt-auto" onClick={manejarClick}>
          Agregar al carrito
        </button>
        {agregado && (
          <p role="status" className="mt-2 mb-0">
            Añadido al carrito.
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductoCard 