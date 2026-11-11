import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Home from './Home'
import CarritoProvider from '../../context/CarritoProvider'

describe('Home', () => {
  beforeEach(() => localStorage.clear())

  test('muestra 4 productos recomendados y los enlaces de sesión', () => {
    render(<MemoryRouter><CarritoProvider><Home /></CarritoProvider></MemoryRouter>)

    expect(screen.getAllByRole('button', { name: 'Agregar al carrito' })).toHaveLength(4)
    expect(screen.getByRole('link', { name: 'Iniciar sesión' })).toHaveAttribute('href', '/login')
    expect(screen.getByRole('link', { name: 'Registrar usuario' })).toHaveAttribute('href', '/registro')
  })
})