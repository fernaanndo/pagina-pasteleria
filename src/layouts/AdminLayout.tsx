import { Link, NavLink, Outlet } from 'react-router'
import '../styles/admin.css'

function AdminLayout() {
    return (
        <div className="container-fluid">
            <div className="row">

                {/* Menú lateral */}
                <aside className="col-md-3 col-lg-2 sidebar p-0">
                    <header className="sidebar-header text-center p-3">
                        <Link to="/admin">
                            <img src="/img/logo-tienda.svg" alt="Logo Pastelería Mil Sabores" className="sidebar-logo" />
                        </Link>
                        <h2 className="fs-4 mt-2">Mil Sabores</h2>
                        <span className="texto-secundario">Administrador</span>
                    </header>

                    <nav className="nav flex-column">
                        <NavLink className="nav-link" to="/admin" end>Inicio</NavLink>
                        <NavLink className="nav-link" to="/admin/productos">Productos</NavLink>
                        <NavLink className="nav-link" to="/admin/usuarios">Usuarios</NavLink>
                        <Link className="nav-link" to="/">Ver tienda</Link>
                        <Link className="nav-link" to="/login">Cerrar sesión</Link>
                    </nav>
                </aside>

                {/* Contenido */}
                <div className="col-md-9 col-lg-10 d-flex flex-column min-vh-100">
                    <main className="flex-grow-1 p-4">
                        <Outlet />
                    </main>

                    <footer className="text-center p-3">
                        <p className="mb-0 texto-secundario">© 2026 Pastelería Mil Sabores - Panel de administración</p>
                    </footer>
                </div>

            </div>
        </div>
    )
}

export default AdminLayout