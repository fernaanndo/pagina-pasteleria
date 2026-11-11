import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import DetalleProducto from './DetalleProducto'
import CarritoProvider from '../../context/CarritoProvider'
import { productos } from '../../data/productos'

function renderizarEn(ruta: string) {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <CarritoProvider>
        <Routes>
          <Route path="/productos/:codigo" element={<DetalleProducto />} />
        </Routes>
      </CarritoProvider>
    </MemoryRouter>,
  )
}

describe('DetalleProducto', () => {
  beforeEach(() => localStorage.clear())

  test('agrega al carrito la cantidad indicada', async () => {
    const user = userEvent.setup()
    renderizarEn(`/productos/${productos[0].codigo}`)

    const cantidad = screen.getByLabelText('Cantidad')
    await user.clear(cantidad)
    await user.type(cantidad, '3')
    await user.click(screen.getByRole('button', { name: 'Añadir al carrito' }))

    expect(screen.getByRole('status')).toHaveTextContent('Producto agregado al carrito.')
    expect(JSON.parse(localStorage.getItem('pasteleria-carrito') ?? '[]')).toEqual([
      { codigo: productos[0].codigo, cantidad: 3 },
    ])
  })

  test('muestra un error si la cantidad no es válida', async () => {
    const user = userEvent.setup()
    renderizarEn(`/productos/${productos[0].codigo}`)

    const cantidad = screen.getByLabelText('Cantidad')
    await user.clear(cantidad)
    await user.type(cantidad, '0')
    await user.click(screen.getByRole('button', { name: 'Añadir al carrito' }))

    expect(screen.getByText('Ingresa una cantidad entera entre 1 y 99.')).toBeInTheDocument()
  })

  test('avisa cuando el producto no existe', () => {
    renderizarEn('/productos/NOEXISTE')
    expect(screen.getByText('No encontramos ese producto.')).toBeInTheDocument()
  })
})