import { useState } from "react"
import { eliminarUsuario, obtenerUsuarios } from "../../services/storage"
import { Link } from "react-router"
import TablaUsuarios from "../../components/TablaUsuarios"

function AdminUsuarios() {
  const [listaUsuarios, setListaUsuarios] = useState(obtenerUsuarios)
  const [mensaje, setMensaje] = useState<string | null>(null)

  function manejarEliminar(run: string) {
    const usuario = listaUsuarios.find((u) => u.run === run)
    if (!usuario) return

    eliminarUsuario(run)
    setListaUsuarios(obtenerUsuarios())
    setMensaje(`Usuario ${usuario.run} - ${usuario.nombre} ${usuario.apellidos} eliminado`)
  }

  return (
    <>
      <section>
        <h1>Usuarios</h1>
        <p className="texto-secundario">Listado de usuarios de la tienda</p>
      </section>

      <section className="mb-3">
        <Link to="/admin/usuarios/nuevo" className="btn btn-primary">Nuevo Usuario</Link>
      </section>

      <section>
        {mensaje && <div className="alert alert-success" role="alert">{mensaje}</div>}
        <TablaUsuarios usuarios={listaUsuarios} onEliminar={manejarEliminar} />
      </section>
    </>
  )
}

export default AdminUsuarios