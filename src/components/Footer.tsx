import { useState } from "react"

function Footer() {
    const [suscrito, setSuscrito] = useState(false);

    return (
        <footer className="site-footer">
            <div className="container footer-inner">
                <div className="footer-left">
                    <div className="footer-brand">
                        <span>Pastelería 1000 Sabores</span>
                    </div>

                    <div className="payment-icons" aria-label="Medios de pago">
                        <span className="payment-icon"><span className="visa-logo">VISA</span></span>
                        <span className="payment-icon"><span className="cash-icon" aria-hidden="true">💵</span> EFECTIVO</span>
                    </div>
                </div>

                <div className="suscribe">
                    <p>¡Mantente en contacto! Únete a nuestro boletín</p>
                    {suscrito ? (
                        <p role="status">¡Gracias por suscribirte!</p>
                    ) : (
                        <form onSubmit={(e) => {e.preventDefault(); setSuscrito(true)}}>
                            <input type="email" id="email-input" name="email" aria-label="Correo electrónico"
                            placeholder="Ingresa tu correo electrónico" autoComplete="email" required/>
                            <button type="submit">Suscribirse</button>
                        </form>
                    )}
                </div>
            </div>
        </footer>
    )
}

export default Footer