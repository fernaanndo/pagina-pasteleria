import { useState } from 'react'
import type { FormEvent } from 'react'
import CampoFormulario from '../../components/CampoFormulario'
import { guardarMensajeContacto } from '../../services/storage'
import { esRequerido, largoMinimo, largoMaximo } from '../../utils/validators'

interface Formulario {
  nombre: string
  correo: string
  asunto: string
  mensaje: string
}

const inicial: Formulario = { nombre: '', correo: '', asunto: '', mensaje: '' }

type Errores = Partial<Record<keyof Formulario, string | null>>

const campos: (keyof Formulario)[] = ['nombre', 'correo', 'asunto', 'mensaje']

function validarCampo(campo: keyof Formulario, valor: string): string | null {
  const v = valor.trim()
  switch (campo) {
    case 'nombre':
      return esRequerido(v) || largoMinimo(v, 3) || largoMaximo(v, 80)
    case 'correo':
      return (
        esRequerido(v) ||
        largoMaximo(v, 120) ||
        (/^\S+@\S+\.\S+$/.test(v) ? null : 'Ingresa un correo electrónico válido')
      )
    case 'asunto':
      return esRequerido(v) || largoMaximo(v, 100)
    case 'mensaje':
      return esRequerido(v) || largoMinimo(v, 10) || largoMaximo(v, 1000)
  }
}

function Contacto() {
  const [form, setForm] = useState<Formulario>(inicial)
  const [errores, setErrores] = useState<Errores>({})
  const [feedback, setFeedback] = useState('')
  const [hayFallo, setHayFallo] = useState(false)

  const cambiar = (campo: keyof Formulario, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }))
    setErrores((prev) => ({ ...prev, [campo]: null }))
    setFeedback('')
  }

  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault()
    setFeedback('')

    const nuevos: Errores = {}
    for (const campo of campos) {
      nuevos[campo] = validarCampo(campo, form[campo])
    }
    setErrores(nuevos)
    if (Object.values(nuevos).some(Boolean)) return

    try {
      guardarMensajeContacto({
        nombre: form.nombre.trim(),
        correo: form.correo.trim(),
        asunto: form.asunto.trim(),
        mensaje: form.mensaje.trim(),
        fecha: new Date().toISOString(),
      })
      setForm(inicial)
      setHayFallo(false)
      setFeedback('¡Gracias! Tu mensaje se envió correctamente.')
    } catch {
      setHayFallo(true)
      setFeedback('No se pudo enviar el mensaje en este navegador. Inténtalo nuevamente más tarde.')
    }
  }

  return (
    <main className="container py-4">
      <section className="col-md-8 col-lg-6 mx-auto" aria-labelledby="contacto-titulo">
        <h1 id="contacto-titulo" className="h3 text-center">
          Pastelería 1000 Sabores
        </h1>
        <p className="text-center">
          ¿Tienes una consulta o quieres cotizar un pedido? Escríbenos.
        </p>

        <form onSubmit={manejarEnvio} noValidate>
          <h2 className="h5 mt-3">Formulario de contacto</h2>

          <div className="mb-3">
            <CampoFormulario
              id="contacto-nombre"
              label="Nombre completo"
              value={form.nombre}
              onChange={(v) => cambiar('nombre', v)}
              error={errores.nombre}
            />
          </div>
          <div className="mb-3">
            <CampoFormulario
              id="contacto-correo"
              label="Correo electrónico"
              type="email"
              value={form.correo}
              onChange={(v) => cambiar('correo', v)}
              error={errores.correo}
            />
          </div>
          <div className="mb-3">
            <CampoFormulario
              id="contacto-asunto"
              label="Asunto"
              value={form.asunto}
              onChange={(v) => cambiar('asunto', v)}
              error={errores.asunto}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contacto-mensaje" className="form-label">
              Mensaje
            </label>
            <textarea
              id="contacto-mensaje"
              rows={4}
              className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
              value={form.mensaje}
              onChange={(e) => cambiar('mensaje', e.target.value)}
            />
            {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
          </div>

          {feedback && (
            <p role="status" className={hayFallo ? 'text-danger' : 'text-success'}>
              {feedback}
            </p>
          )}

          <button type="submit" className="btn btn-primary w-100">
            Enviar mensaje
          </button>
        </form>
      </section>
    </main>
  )
}

export default Contacto