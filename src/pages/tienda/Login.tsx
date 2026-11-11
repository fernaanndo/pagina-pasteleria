import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import CampoFormulario from '../../components/CampoFormulario'
import { obtenerUsuarios, guardarSesion } from '../../services/storage'

function Login() {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [mensajeError, setMensajeError] = useState('')

  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault()
    const correoLimpio = correo.trim().toLowerCase()

    if (!correoLimpio || !password) {
      setMensajeError('Ingresa tu correo y contraseña.')
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(correoLimpio)) {
      setMensajeError('Ingresa un correo electrónico válido.')
      return
    }

    const usuarioEncontrado = obtenerUsuarios().find(
      (u) => u.correo.trim().toLowerCase() === correoLimpio && u.password === password
    )

    if (!usuarioEncontrado) {
      setMensajeError('Correo o contraseña incorrectos.')
      setPassword('')
      return
    }

    try {
      guardarSesion(usuarioEncontrado)
    } catch {
      setMensajeError('No se pudo iniciar la sesión en este navegador.')
      return
    }

    if (usuarioEncontrado.tipoUsuario === 'Administrador') {
      navigate('/admin')
    } else if (usuarioEncontrado.tipoUsuario === 'Vendedor') {
      navigate('/productos')
    } else {
      navigate('/')
    }
  }

  return (
    <div className="py-4">
      <section className="col-md-6 col-lg-4 mx-auto" aria-labelledby="login-titulo">
        <h1 className="h3 text-center">Pastelería 1000 Sabores</h1>
        <form onSubmit={manejarEnvio} noValidate>
          <h2 id="login-titulo" className="h5 mt-3">
            Inicio de sesión
          </h2>
          <div className="mb-3">
            <CampoFormulario
              id="login-correo"
              label="Correo"
              type="email"
              value={correo}
              onChange={setCorreo}
            />
          </div>
          <div className="mb-3">
            <CampoFormulario
              id="login-password"
              label="Contraseña"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </div>
          {mensajeError && (
            <p role="status" className="text-danger">
              {mensajeError}
            </p>
          )}
          <button type="submit" className="btn btn-primary w-100">
            Iniciar sesión
          </button>
        </form>
      </section>
    </div>
  )
}

export default Login