import { Link, NavLink } from "react-router";
import { useCarrito } from "../context/useCarrito"

const enlaces = [
    { ruta: '/', texto: 'Inicio' },
    { ruta: '/productos', texto: 'Productos' },
    { ruta: '/nosotros', texto: 'Nosotros' },
    { ruta: '/blogs', texto: 'Blogs' },
    { ruta: '/contacto', texto: 'Contacto' },
]

function Navbar() {
    const { cantidadTotal } = useCarrito();

    return (
        <header className="site-header">
            <div className="container">
                <nav id="navbar" aria-label="Navegación principal">
                    <Link className="logo" to="/" aria-label="Pastelería 1000 Sabores, inicio">
                        <img className="logo-image" src="/img/logo-tienda.svg" alt="" />
                        <span className="logo-text">Pastelería 1000 Sabores</span>
                    </Link>

                    <ul className="links">
                        {enlaces.map((enlace) => (
                            <li key={enlace.ruta}>
                                <NavLink className="link" to={enlace.ruta} end={enlace.ruta === '/'}>
                                    {enlace.texto}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <Link className="carrito" to="/carrito" aria-label={`Carrito de compras, ${cantidadTotal} productos`}>
                        <span className="carrito-icon" aria-hidden="true">🛒</span>
                        <span>Carrito (<span aria-live="polite">{cantidadTotal}</span>)</span>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Navbar