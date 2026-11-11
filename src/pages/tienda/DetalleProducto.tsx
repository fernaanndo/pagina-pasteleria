import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router'
import ListaProductos from '../../components/ListaProductos'
import { obtenerProductos } from '../../services/storage'
import { useCarrito } from '../../context/useCarrito'
import type { Producto } from '../../types/producto'

function FormularioCantidad({ producto }: { producto: Producto }) {
  const { agregar } = useCarrito()
  const [cantidad, setCantidad] = useState('1')
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault()
    const numero = Number(cantidad)
    if (!Number.isInteger(numero) || numero < 1 || numero > 99) {
      setError('Ingresa una cantidad entera entre 1 y 99.')
      setMensaje('')
      return
    }
    if (!agregar(producto.codigo, numero)) {
      setError('No se pudo agregar: máximo 99 unidades.')
      setMensaje('')
      return
    }
    setError('')
    setMensaje('Producto agregado al carrito.')
  }

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <label htmlFor="cantidad" className="form-label">
        Cantidad
      </label>
      <input
        id="cantidad"
        type="number"
        min={1}
        max={99}
        step={1}
        value={cantidad}
        onChange={(e) => {
          setCantidad(e.target.value)
          setError('')
          setMensaje('')
        }}
        className={`form-control mb-1 ${error ? 'is-invalid' : ''}`}
      />
      {error && <small className="text-danger d-block mb-2">{error}</small>}
      <button type="submit" className="btn btn-primary mt-2">
        Añadir al carrito
      </button>
      {mensaje && (
        <p role="status" className="mt-2 mb-0">
          {mensaje}
        </p>
      )}
    </form>
  )
}

function DetalleProducto() {
  const { codigo } = useParams()
  const { agregar } = useCarrito()
  const productos = obtenerProductos()
  const producto = productos.find((p) => p.codigo === codigo)

  if (!producto) {
    return (
      <div className="py-4">
        <p>No encontramos ese producto.</p>
        <Link to="/productos">Volver a productos</Link>
      </div>
    )
  }

  const relacionados = productos.filter((p) => p.codigo !== producto.codigo).slice(0, 4)

  return (
    <div className="py-4">
      <nav aria-label="Ruta de navegación" className="mb-2">
        <Link to="/">Inicio</Link> › <Link to="/productos">Productos</Link> › {producto.nombre}
      </nav>
      <Link to="/productos">← Regresar a productos</Link>

      <section className="row g-4 mt-2 mb-5">
        <div className="col-md-6">
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <p className="text-muted mb-1">{producto.categoria}</p>
          <h1>{producto.nombre}</h1>
          <p className="fs-4 fw-bold">${producto.precio.toLocaleString('es-CL')}</p>
          <p>{producto.descripcion}</p>
          <FormularioCantidad key={producto.codigo} producto={producto} />
        </div>
      </section>

      <section>
        <h2>Productos relacionados</h2>
        <ListaProductos
          productos={relacionados}
          onAgregar={(c) => agregar(c, 1)}
        />
      </section>
    </div>
  )
}

export default DetalleProducto