import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Productos from './Productos'
import CarritoProvider from '../../context/CarritoProvider'
import { productos } from '../../data/productos'
import { eliminarProducto } from '../../services/storage'

function renderizar() {
  render(<MemoryRouter><CarritoProvider><Productos /></CarritoProvider></MemoryRouter>)
}

describe('Productos', () => {
  beforeEach(() => localStorage.clear())

  test('muestra todos los productos del catálogo', () => {
    renderizar()
    expect(screen.getAllByRole('button', { name: 'Agregar al carrito' })).toHaveLength(productos.length)
  })

  test('no muestra un producto que el administrador eliminó', () => {
    eliminarProducto(productos[0].codigo)
    renderizar()
    expect(screen.queryByText(productos[0].nombre)).not.toBeInTheDocument()
  })
})