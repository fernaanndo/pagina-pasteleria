import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import Login from './Login'
import { usuarios } from '../../data/usuarios'

function renderizar() {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<p>Panel admin</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  test('muestra un error si el correo o la contraseña son incorrectos', async () => {
    const user = userEvent.setup()
    renderizar()

    await user.type(screen.getByLabelText('Correo'), 'nadie@duoc.cl')
    await user.type(screen.getByLabelText('Contraseña'), '1234')
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    expect(screen.getByText('Correo o contraseña incorrectos.')).toBeInTheDocument()
  })

  test('un administrador entra al panel de administración', async () => {
    const user = userEvent.setup()
    const admin = usuarios.find((u) => u.tipoUsuario === 'Administrador')!
    renderizar()

    await user.type(screen.getByLabelText('Correo'), admin.correo)
    await user.type(screen.getByLabelText('Contraseña'), admin.password)
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    expect(screen.getByText('Panel admin')).toBeInTheDocument()
  })
})