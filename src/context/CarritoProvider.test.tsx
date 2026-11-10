import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CarritoProvider from './CarritoProvider'
import { useCarrito } from './useCarrito'
import { productos } from '../data/productos'

function ConsumidorDePrueba() {
  const { cantidadTotal, agregar, vaciar } = useCarrito()
  return (
    <>
      <p>Unidades: {cantidadTotal}</p>
      <button onClick={() => agregar(productos[0].codigo)}>Agregar</button>
      <button onClick={() => agregar('NO-EXISTE')}>Agregar inexistente</button>
      <button onClick={vaciar}>Vaciar</button>
    </>
  )
}

function renderizar() {
  render(
    <CarritoProvider>
      <ConsumidorDePrueba />
    </CarritoProvider>,
  )
}

describe('CarritoProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('agrega productos, los guarda en localStorage y se puede vaciar', async () => {
    const user = userEvent.setup()
    renderizar()

    await user.click(screen.getByRole('button', { name: 'Agregar' }))
    await user.click(screen.getByRole('button', { name: 'Agregar' }))
    await user.click(screen.getByRole('button', { name: 'Agregar inexistente' }))

    expect(screen.getByText('Unidades: 2')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('pasteleria-carrito') ?? '[]')).toEqual([
      { codigo: productos[0].codigo, cantidad: 2 },
    ])

    await user.click(screen.getByRole('button', { name: 'Vaciar' }))
    expect(screen.getByText('Unidades: 0')).toBeInTheDocument()
  })

  test('recupera el carrito guardado al iniciar', () => {
    localStorage.setItem('pasteleria-carrito', JSON.stringify([{ codigo: productos[0].codigo, cantidad: 3 }]))
    renderizar()

    expect(screen.getByText('Unidades: 3')).toBeInTheDocument()
  })
})