import TarjetaResumen from "../../components/TarjetaResumen"

const secciones = [
  {
    titulo: 'Productos',
    descripcion: 'Listar, crear, editar y eliminar los productos de la tienda.',
    enlace: '/admin/productos',
    textoBoton: 'Gestionar productos',
  },
  {
    titulo: 'Usuarios',
    descripcion: 'Listar, crear, editar y eliminar los usuarios del sistema.',
    enlace: '/admin/usuarios',
    textoBoton: 'Gestionar usuarios',
  },
]

function Dashboard() {
  return (
    <>
      <section>
        <h1>Panel de administración</h1>
        <p className="texto-secundario">Bienvenido al sistema de gestión de Pastelería Mil Sabores.</p>
      </section>

      <section className="row g-4 mt-2">
        {secciones.map((seccion) => (
          <div key={seccion.enlace} className="col-md-6 col-xl-4">
            <TarjetaResumen {...seccion} />
          </div>
        ))}
      </section>
    </>
  )
}

export default Dashboard