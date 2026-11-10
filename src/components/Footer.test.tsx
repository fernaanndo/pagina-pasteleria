import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Footer from './Footer'

describe('Footer', () => {
  test('al suscribirse reemplaza el formulario por un mensaje de confirmación', async () => {
    const user = userEvent.setup()
    render(<Footer />)

    await user.type(screen.getByLabelText('Correo electrónico'), 'cliente@gmail.com')
    await user.click(screen.getByRole('button', { name: 'Suscribirse' }))

    expect(screen.getByRole('status')).toHaveTextContent('¡Gracias por suscribirte!')
    expect(screen.queryByRole('button', { name: 'Suscribirse' })).not.toBeInTheDocument()
  })
})