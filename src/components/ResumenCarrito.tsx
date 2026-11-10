interface ResumenCarritoProps {
    total: number;
}

function ResumenCarrito({total}: ResumenCarritoProps) {
  return (
    <aside className="cart-checkout" aria-label="Resumen de compra">
        <h2>Resumen</h2>
        <p>
            <span>Total:</span>
            <strong>${total.toLocaleString('es-CL')}</strong>
        </p>
        <button className="checkout-button" type="button" disabled>Continuar compra</button>
    </aside>
  )
}

export default ResumenCarrito