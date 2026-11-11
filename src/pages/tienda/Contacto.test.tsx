import { beforeEach, describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contacto from './Contacto'

describe('Contacto', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  test('no envía el formulario vacío y muestra los errores', async () => {
    const user = userEvent.setup()
    const spy = vi.spyOn(Storage.prototype, 'setItem')
    render(<Contacto />)

    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(screen.getAllByText('Este campo es obligatorio')).toHaveLength(4)
    expect(spy).not.toHaveBeenCalled()
  })

  test('envía el mensaje y limpia el formulario', async () => {
    const user = userEvent.setup()
    render(<Contacto />)

    await user.type(screen.getByLabelText('Nombre completo'), 'Ana Pérez')
    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@gmail.com')
    await user.type(screen.getByLabelText('Asunto'), 'Cotización')
    await user.type(screen.getByLabelText('Mensaje'), 'Quiero cotizar una torta para 20 personas.')
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(screen.getByRole('status')).toHaveTextContent('¡Gracias! Tu mensaje se envió correctamente.')
    expect(screen.getByLabelText('Nombre completo')).toHaveValue('')
  })
})