import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import Carrito from './Carrito'
import CarritoProvider from '../../context/CarritoProvider'
import { productos } from '../../data/productos'

function renderizar() {
  render(
    <MemoryRouter>
      <CarritoProvider>
        <Carrito />
      </CarritoProvider>
    </MemoryRouter>,
  )
}

describe('Carrito', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('con el carrito vacío muestra el mensaje y deshabilita Vaciar', () => {
    renderizar()

    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Vaciar carrito' })).toBeDisabled()
  })

  test('muestra los productos guardados con su total y permite quitarlos', async () => {
    const [p1, p2] = productos
    localStorage.setItem('pasteleria-carrito', JSON.stringify([
      { codigo: p1.codigo, cantidad: 2 },
      { codigo: p2.codigo, cantidad: 1 },
    ]))
    const user = userEvent.setup()
    renderizar()

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    const total = p1.precio * 2 + p2.precio
    expect(screen.getByText(`$${total.toLocaleString('es-CL')}`)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: `Quitar ${p1.nombre} del carrito` }))

    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })
})