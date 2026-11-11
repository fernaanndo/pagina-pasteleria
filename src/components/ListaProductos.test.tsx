import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import ListaProductos from './ListaProductos'
import type { Producto } from '../types/producto'

const productos: Producto[] = [
  {
    codigo: 'TC001',
    imagen: '/img/a.jpg',
    categoria: 'Tortas Cuadradas',
    nombre: 'Torta Uno',
    precio: 1000,
    stock: 5,
    stockCritico: 1,
    descripcion: 'Uno',
  },
  {
    codigo: 'TC002',
    imagen: '/img/b.jpg',
    categoria: 'Tortas Cuadradas',
    nombre: 'Torta Dos',
    precio: 2000,
    stock: 5,
    stockCritico: 1,
    descripcion: 'Dos',
  },
]

function renderizar(onAgregar = () => {}) {
  return render(
    <MemoryRouter>
      <ListaProductos productos={productos} onAgregar={onAgregar} />
    </MemoryRouter>
  )
}

describe('ListaProductos', () => {
  test('muestra una tarjeta por cada producto', () => {
    renderizar()
    expect(screen.getByText('Torta Uno')).toBeInTheDocument()
    expect(screen.getByText('Torta Dos')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Agregar al carrito' })).toHaveLength(2)
  })

  test('al agregar el segundo producto llama a onAgregar con su código', async () => {
    const onAgregar = vi.fn()
    renderizar(onAgregar)
    const botones = screen.getAllByRole('button', { name: 'Agregar al carrito' })
    await userEvent.click(botones[1])
    expect(onAgregar).toHaveBeenCalledWith('TC002')
  })
})