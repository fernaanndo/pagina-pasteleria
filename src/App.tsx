import { Route, Routes } from "react-router"
import TiendaLayout from "./layouts/TiendaLayout"
import Productos from "./pages/tienda/Productos"
import Home from "./pages/tienda/Home"
import DetalleProducto from "./pages/tienda/DetalleProducto"
import Carrito from "./pages/tienda/Carrito"
import Login from "./pages/tienda/Login"
import Registro from "./pages/tienda/Registro"
import Nosotros from "./pages/tienda/Nosotros"
import Contacto from "./pages/tienda/Contacto"
import Blogs from "./pages/tienda/Blogs"
import DetalleBlog from "./pages/tienda/DetalleBlog"
import Dashboard from "./pages/admin/Dashboard"
import AdminProductos from "./pages/admin/AdminProductos"
import ProductoForm from "./pages/admin/ProductoForm"
import AdminUsuarios from "./pages/admin/AdminUsuarios"
import UsuarioForm from "./pages/admin/UsuarioForm"
import NotFound from "./pages/NotFound"
import AdminLayout from "./layouts/AdminLayout"


function App() {
  return (
    <Routes>
      <Route element={<TiendaLayout />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/:codigo" element={<DetalleProducto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:id" element={<DetalleBlog />} />
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="productos" element={<AdminProductos />} />
        <Route path="productos/nuevo" element={<ProductoForm />} />
        <Route path="productos/:codigo/editar" element={<ProductoForm />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="usuarios/nuevo" element={<UsuarioForm />} />
        <Route path="usuarios/:run/editar" element={<UsuarioForm />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
export default App