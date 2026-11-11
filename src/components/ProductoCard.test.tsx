import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import ProductoCard from './ProductoCard'
import type { Producto } from '../types/producto'

const producto: Producto = {
  codigo: 'TC001',
  imagen: '/img/products/web-TC001.jpg',
  categoria: 'Tortas Cuadradas',
  nombre: 'Torta Cuadrada de Chocolate',
  precio: 45000,
  stock: 10,
  stockCritico: 3,
  descripcion: 'Torta de chocolate',
}

function renderizar(onAgregar = () => {}) {
  return render(
    <MemoryRouter>
      <ProductoCard producto={producto} onAgregar={onAgregar} />
    </MemoryRouter>
  )
}

describe('ProductoCard', () => {
  test('muestra el nombre y el precio del producto', () => {
    renderizar()
    expect(screen.getByText('Torta Cuadrada de Chocolate')).toBeInTheDocument()
    expect(screen.getByText('$45.000')).toBeInTheDocument()
  })

  test('enlaza al detalle del producto', () => {
    renderizar()
    expect(
      screen.getByRole('link', { name: 'Ver detalle de Torta Cuadrada de Chocolate' })
    ).toHaveAttribute('href', '/productos/TC001')
  })

  test('no muestra el mensaje de confirmación al inicio', () => {
    renderizar()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  test('al hacer clic llama a onAgregar con el código y muestra la confirmación', async () => {
    const onAgregar = vi.fn()
    renderizar(onAgregar)
    await userEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }))
    expect(onAgregar).toHaveBeenCalledWith('TC001')
    expect(screen.getByRole('status')).toHaveTextContent('Añadido al carrito.')
  })
})