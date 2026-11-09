import { NavLink, Outlet } from 'react-router'
import '../styles/index.css'

function TiendaLayout() {
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                {/* provisorio: después se migra el navbar real */}
                <NavLink to="/">Inicio</NavLink> <NavLink to="/productos">Productos</NavLink>{' '}
                <NavLink to="/nosotros">Nosotros</NavLink> <NavLink to="/blogs">Blogs</NavLink>{' '}
                <NavLink to="/contacto">Contacto</NavLink> <NavLink to="/carrito">Carrito</NavLink>
            </nav>
            <main className="container">
                <Outlet />
            </main>
            <footer>{/* footer */}</footer>
        </>
    )
}

export default TiendaLayout