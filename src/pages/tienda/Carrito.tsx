import { Link } from "react-router"
import { useCarrito } from "../../context/useCarrito"
import { obtenerProductos } from "../../services/storage"
import { armarLineas, calcularTotal } from "../../utils/carrito"
import ItemCarrito from "../../components/ItemCarrito"
import ResumenCarrito from "../../components/ResumenCarrito"

function Carrito() {
  const { items, cambiarCantidad, quitar, vaciar } = useCarrito()

  const lineas = armarLineas(items, obtenerProductos())
  const total = calcularTotal(lineas)
  const vacio = lineas.length === 0

  return (
    <div className="cart-page">
      <h1>Mi carrito de compras</h1>

      <div className="cart-layout">
        <section className="cart-section" aria-label="Productos del carrito">
          {vacio && (
            <>
              <p>Tu carrito está vacío.</p>
              <Link to="/productos" className="back-to-products">← Regresar a productos</Link>
            </>
          )}

          <ul className="cart-items" aria-live="polite">
            {lineas.map((linea) => (
              <ItemCarrito key={linea.producto.codigo} item={linea} onCambiarCantidad={cambiarCantidad} onEliminar={quitar} />
            ))}
          </ul>

          <button className="clear-cart" type="button" disabled={vacio} onClick={vaciar}>
            Vaciar carrito
          </button>
        </section>

        <ResumenCarrito total={total} />
      </div>
    </div>
  )
}

export default Carrito