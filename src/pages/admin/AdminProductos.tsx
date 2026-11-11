import { useState } from "react"
import { eliminarProducto, obtenerProductos } from "../../services/storage"
import { Link } from "react-router"
import TablaProductos from "../../components/TablaProductos"

function AdminProductos() {
  const [listaProductos, setListaProductos] = useState(obtenerProductos)
  const [mensaje, setMensaje] = useState<string | null >(null)

  function manejarEliminar(codigo: string){
    const producto = listaProductos.find((p) => p.codigo === codigo)
    if(!producto) return

    eliminarProducto(codigo)
    setListaProductos(obtenerProductos())
    setMensaje(`Producto ${producto.codigo} - ${producto.nombre} eliminado correctamente`)

  }
  return (
    <>
      <section>
        <h1>Productos</h1>
        <p className="texto-secundario">Listado de productos de la tienda</p>
      </section>

      <section className="mb-3">
        <Link to="/admin/productos/nuevo" className="btn btn-primary">Nuevo Producto</Link>
      </section>

      <section>
        {mensaje && <div className="alert alert-success" role="alert">{mensaje}</div>}
        <TablaProductos productos={listaProductos} onEliminar={manejarEliminar}/>
      </section>
    </>
  )
}

export default AdminProductos