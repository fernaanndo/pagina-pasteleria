import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Registro from './Registro'
import { buscarUsuarioPorRun } from '../../services/storage'
import { regiones } from '../../data/regiones'

describe('Registro', () => {
  beforeEach(() => localStorage.clear())

  test('muestra un error si las contraseñas no coinciden', async () => {
    const user = userEvent.setup()
    render(<Registro />)

    await user.type(screen.getByLabelText('Contraseña'), 'abcd')
    await user.type(screen.getByLabelText('Confirmar contraseña'), 'abce')

    expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument()
  })

  test('registra un cliente nuevo con datos válidos', async () => {
    const user = userEvent.setup()
    render(<Registro />)

    await user.type(screen.getByLabelText('RUN (Sin puntos ni guión)'), '111111111')
    await user.type(screen.getByLabelText('Nombre'), 'Juan')
    await user.type(screen.getByLabelText('Apellidos'), 'Pérez')
    await user.type(screen.getByLabelText('Correo'), 'juan@gmail.com')
    await user.type(screen.getByLabelText('Contraseña'), 'abcd')
    await user.type(screen.getByLabelText('Confirmar contraseña'), 'abcd')
    await user.selectOptions(screen.getByLabelText('Región'), regiones[0].nombre)
    await user.selectOptions(screen.getByLabelText('Comuna'), regiones[0].comunas[0])
    await user.type(screen.getByLabelText('Dirección'), 'Calle 123')
    await user.click(screen.getByRole('button', { name: 'Registrar' }))

    expect(screen.getByRole('status')).toHaveTextContent('Registro realizado correctamente.')
    expect(buscarUsuarioPorRun('111111111')?.tipoUsuario).toBe('Cliente')
  })
})