import type { LineaCarrito } from "../types/carrito"
import { CANTIDAD_MAXIMA } from "../utils/carrito";

interface ItemCarritoProps {
    item: LineaCarrito;
    onCambiarCantidad: (codigo: string, cantidad: number) => void;
    onEliminar: (codigo: string) => void;
}


function ItemCarrito({ item, onCambiarCantidad, onEliminar }: ItemCarritoProps) {
    const { producto, cantidad } = item
    return (
        <li className="cart-item">
            <img src={producto.imagen || '/img/products/imagen_inicio.jpg'} alt={producto.nombre} className="cart-item-image" loading="lazy" />
            <div className="cart-item-details">
                <strong>{producto.nombre}</strong>
                <small>{producto.descripcion}</small>
            </div>

            <strong className="cart-item-price">${producto.precio.toLocaleString('es-CL')}</strong>

            <div className="cart-quantity">
                <button type="button" aria-label={`Reducir cantidad de ${producto.nombre}`}
                    disabled={cantidad <= 1} onClick={() => onCambiarCantidad(producto.codigo, cantidad - 1)}
                >
                    -
                </button>
                <span>{cantidad}</span>
                <button type="button" aria-label={`Aumentar cantidad de ${producto.nombre}`}
                    disabled={cantidad >= CANTIDAD_MAXIMA} onClick={() => onCambiarCantidad(producto.codigo, cantidad + 1)}
                >
                    +
                </button>
            </div>

            <button type="button" className="remove-from-cart" aria-label={`Quitar ${producto.nombre} del carrito`}
                onClick={() => onEliminar(producto.codigo)}>
                Quitar
            </button>
        </li>
    )
}

export default ItemCarrito