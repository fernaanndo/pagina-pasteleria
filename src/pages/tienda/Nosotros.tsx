import { Link } from 'react-router'
import TarjetaProposito from '../../components/TarjetaProposito'
import TarjetaDesarrollador from '../../components/TarjetaDesarrollador'

const propositos = [
  {
    titulo: 'Misión',
    descripcion:
      'Preparar productos de pastelería ricos y de calidad, ofreciendo una atención cercana y ayudando a crear momentos memorables.',
  },
  {
    titulo: 'Visión',
    descripcion:
      'Ser una pastelería reconocida por la variedad de sus sabores, el cuidado de sus preparaciones y la confianza de sus clientes.',
  },
  {
    titulo: 'Valores',
    descripcion:
      'Trabajamos con dedicación, creatividad y compromiso, cuidando cada detalle desde la preparación hasta la entrega.',
  },
]

const desarrolladores = [
  {
    nombre: 'Felipe Cassaretto',
    rol: 'Estructura y contenido',
    descripcion: 'Organización de las páginas y presentación de la información del sitio.',
  },
  {
    nombre: 'Fernando Catalán',
    rol: 'Diseño e interfaz',
    descripcion:
      'Estilos visuales, adaptación a distintos tamaños de pantalla y experiencia de navegación.',
  },
]

function Nosotros() {
  return (
    <main className="container py-4">
      <section className="row align-items-center g-4 mb-5">
        <div className="col-md-6">
          <p className="text-muted mb-1">Nuestra historia</p>
          <h1>Dulces momentos, hechos para compartir</h1>
          <p>
            Pastelería 1000 Sabores es una empresa dedicada a preparar tortas y postres para
            acompañar celebraciones y momentos cotidianos. Reunimos recetas tradicionales,
            ingredientes seleccionados y una presentación cuidada para que cada pedido sea
            especial.
          </p>
          <Link to="/productos" className="btn btn-primary">
            Conoce nuestros productos
          </Link>
        </div>
        <div className="col-md-6">
          <img
            src="/img/products/imagen_inicio.jpg"
            alt="Selección de pasteles preparados por Pastelería 1000 Sabores"
            className="img-fluid rounded"
          />
        </div>
      </section>

      <section className="mb-5">
        <p className="text-muted mb-1">Lo que nos inspira</p>
        <h2>Nuestro propósito</h2>
        <div className="row g-4 mt-1">
          {propositos.map((p) => (
            <div key={p.titulo} className="col-12 col-md-4">
              <TarjetaProposito titulo={p.titulo} descripcion={p.descripcion} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="text-muted mb-1">Detrás del sitio</p>
        <h2>Equipo de desarrollo</h2>
        <p>
          Este sitio fue construido por un equipo que trabajó en conjunto para presentar la
          pastelería y facilitar la navegación por sus productos.
        </p>
        <div className="row g-4 mt-1">
          {desarrolladores.map((d) => (
            <div key={d.rol} className="col-12 col-md-6">
              <TarjetaDesarrollador nombre={d.nombre} rol={d.rol} descripcion={d.descripcion} />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Nosotros