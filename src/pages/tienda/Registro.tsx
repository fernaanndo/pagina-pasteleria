import { useState } from 'react'
import type { FormEvent } from 'react'
import CampoFormulario from '../../components/CampoFormulario'
import SelectorRegionComuna from '../../components/SelectorRegionComuna'
import { agregarUsuario } from '../../services/storage'
import {
  esRequerido,
  largoMinimo,
  largoMaximo,
  dominioPermitido,
  validarRun,
} from '../../utils/validators'

interface Formulario {
  run: string
  nombre: string
  apellidos: string
  correo: string
  password: string
  confirmarPassword: string
  telefono: string
  fechaNacimiento: string
  region: string
  comuna: string
  direccion: string
}

const inicial: Formulario = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  password: '',
  confirmarPassword: '',
  telefono: '',
  fechaNacimiento: '',
  region: '',
  comuna: '',
  direccion: '',
}

type Errores = Partial<Record<keyof Formulario, string | null>>

const camposObligatorios: (keyof Formulario)[] = [
  'run',
  'nombre',
  'apellidos',
  'correo',
  'password',
  'confirmarPassword',
  'region',
  'comuna',
  'direccion',
]

function validarCampo(campo: keyof Formulario, valor: string, form: Formulario): string | null {
  const v = valor.trim()
  switch (campo) {
    case 'run':
      return esRequerido(v) || validarRun(v)
    case 'nombre':
      return esRequerido(v) || largoMaximo(v, 50)
    case 'apellidos':
      return esRequerido(v) || largoMaximo(v, 100)
    case 'correo':
      return esRequerido(v) || largoMaximo(v, 100) || dominioPermitido(v)
    case 'password':
      return esRequerido(v) || largoMinimo(v, 4) || largoMaximo(v, 10)
    case 'confirmarPassword':
      return esRequerido(v) || (v !== form.password.trim() ? 'Las contraseñas no coinciden' : null)
    case 'direccion':
      return esRequerido(v) || largoMaximo(v, 300)
    case 'region':
    case 'comuna':
      return esRequerido(v)
    default:
      return null
  }
}

function Registro() {
  const [form, setForm] = useState<Formulario>(inicial)
  const [errores, setErrores] = useState<Errores>({})
  const [mensajeOk, setMensajeOk] = useState('')
  const [mensajeError, setMensajeError] = useState('')

  const cambiar = (campo: keyof Formulario, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }))
    // Al cambiar de región, la comuna se limpia: no mostramos error por eso
    const error = campo === 'comuna' && valor === '' ? null : validarCampo(campo, valor, form)
    setErrores((prev) => ({ ...prev, [campo]: error }))
    setMensajeOk('')
    setMensajeError('')
  }

  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault()
    const nuevos: Errores = {}
    for (const campo of camposObligatorios) {
      nuevos[campo] = validarCampo(campo, form[campo], form)
    }
    setErrores(nuevos)
    if (Object.values(nuevos).some(Boolean)) {
      setMensajeOk('')
      return
    }

    const creado = agregarUsuario({
      run: form.run.trim().toUpperCase(),
      nombre: form.nombre.trim(),
      apellidos: form.apellidos.trim(),
      correo: form.correo.trim(),
      fechaNacimiento: form.fechaNacimiento,
      tipoUsuario: 'Cliente',
      region: form.region,
      comuna: form.comuna,
      direccion: form.direccion.trim(),
      password: form.password,
    })

    if (!creado) {
      setMensajeError('Ya existe un usuario con ese RUN o correo.')
      return
    }

    setMensajeOk('Registro realizado correctamente.')
    setForm(inicial)
    setErrores({})
  }

  return (
    <main className="container py-4">
      <section className="col-md-8 col-lg-6 mx-auto" aria-labelledby="registro-titulo">
        <h1 className="h3 text-center">Pastelería 1000 Sabores</h1>
        <form onSubmit={manejarEnvio} noValidate>
          <h2 id="registro-titulo" className="h5 mt-3">
            Registro de usuarios
          </h2>

          <div className="mb-3">
            <CampoFormulario
              id="reg-run"
              label="RUN (Sin puntos ni guión)"
              placeholder="19011022K"
              value={form.run}
              onChange={(v) => cambiar('run', v)}
              error={errores.run}
            />
          </div>
          <div className="mb-3">
            <CampoFormulario
              id="reg-nombre"
              label="Nombre"
              value={form.nombre}
              onChange={(v) => cambiar('nombre', v)}
              error={errores.nombre}
            />
          </div>
          <div className="mb-3">
            <CampoFormulario
              id="reg-apellidos"
              label="Apellidos"
              value={form.apellidos}
              onChange={(v) => cambiar('apellidos', v)}
              error={errores.apellidos}
            />
          </div>
          <div className="mb-3">
            <CampoFormulario
              id="reg-correo"
              label="Correo"
              type="email"
              value={form.correo}
              onChange={(v) => cambiar('correo', v)}
              error={errores.correo}
            />
          </div>
          <div className="mb-3">
            <CampoFormulario
              id="reg-password"
              label="Contraseña"
              type="password"
              value={form.password}
              onChange={(v) => cambiar('password', v)}
              error={errores.password}
            />
          </div>
          <div className="mb-3">
            <CampoFormulario
              id="reg-confirmar-password"
              label="Confirmar contraseña"
              type="password"
              value={form.confirmarPassword}
              onChange={(v) => cambiar('confirmarPassword', v)}
              error={errores.confirmarPassword}
            />
          </div>
          <div className="mb-3">
            <CampoFormulario
              id="reg-telefono"
              label="Teléfono (opcional)"
              type="tel"
              value={form.telefono}
              onChange={(v) => cambiar('telefono', v)}
            />
          </div>
          <div className="mb-3">
            <CampoFormulario
              id="reg-fecha-nacimiento"
              label="Fecha de nacimiento (opcional)"
              type="date"
              value={form.fechaNacimiento}
              onChange={(v) => cambiar('fechaNacimiento', v)}
            />
          </div>

          <div className="mb-3">
            <SelectorRegionComuna
              region={form.region}
              comuna={form.comuna}
              onChangeRegion={(v) => cambiar('region', v)}
              onChangeComuna={(v) => cambiar('comuna', v)}
              errorRegion={errores.region}
              errorComuna={errores.comuna}
            />
          </div>

          <div className="mb-3">
            <CampoFormulario
              id="reg-direccion"
              label="Dirección"
              value={form.direccion}
              onChange={(v) => cambiar('direccion', v)}
              error={errores.direccion}
            />
          </div>

          {mensajeError && (
            <p role="alert" className="text-danger">
              {mensajeError}
            </p>
          )}
          {mensajeOk && (
            <p role="status" className="text-success">
              {mensajeOk}
            </p>
          )}

          <button type="submit" className="btn btn-primary w-100">
            Registrar
          </button>
        </form>
      </section>
    </main>
  )
}

export default Registro