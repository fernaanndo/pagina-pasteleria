interface TarjetaDesarrolladorProps {
  nombre: string
  rol: string
  descripcion: string
}

function TarjetaDesarrollador({ nombre, rol, descripcion }: TarjetaDesarrolladorProps) {
  return (
    <article className="card h-100">
      <div className="card-body">
        <h3 className="h5">{rol}</h3>
        <p className="text-muted">{nombre}</p>
        <p className="mb-0">{descripcion}</p>
      </div>
    </article>
  )
}

export default TarjetaDesarrollador