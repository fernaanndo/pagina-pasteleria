import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Navbar from './Navbar'
import CarritoProvider from '../context/CarritoProvider'
import { productos } from '../data/productos'

function renderizarEn(ruta: string) {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <CarritoProvider>
        <Navbar />
      </CarritoProvider>
    </MemoryRouter>,
  )
}

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('muestra la cantidad de productos del carrito', () => {
    localStorage.setItem('pasteleria-carrito', JSON.stringify([{ codigo: productos[0].codigo, cantidad: 3 }]))
    renderizarEn('/')

    expect(screen.getByRole('link', { name: 'Carrito de compras, 3 productos' })).toBeInTheDocument()
  })

  test('marca como activo solo el enlace de la página actual', () => {
    renderizarEn('/productos/TC001')

    expect(screen.getByRole('link', { name: 'Productos' })).toHaveClass('active')
    expect(screen.getByRole('link', { name: 'Inicio' })).not.toHaveClass('active')
  })
})