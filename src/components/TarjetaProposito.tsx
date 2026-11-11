interface TarjetaPropositoProps {
  titulo: string
  descripcion: string
}

function TarjetaProposito({ titulo, descripcion }: TarjetaPropositoProps) {
  return (
    <article className="card h-100">
      <div className="card-body">
        <h3 className="h5">{titulo}</h3>
        <p className="mb-0">{descripcion}</p>
      </div>
    </article>
  )
}

export default TarjetaProposito