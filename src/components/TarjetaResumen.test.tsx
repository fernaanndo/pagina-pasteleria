import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import TarjetaResumen from './TarjetaResumen'

describe('TarjetaResumen', () => {
  test('muestra el título, la descripción y el enlace recibidos por props', () => {
    render(
      <MemoryRouter>
        <TarjetaResumen
          titulo="Productos"
          descripcion="Gestiona los productos"
          enlace="/admin/productos"
          textoBoton="Gestionar productos"
        />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Productos' })).toBeInTheDocument()
    expect(screen.getByText('Gestiona los productos')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Gestionar productos' })).toHaveAttribute('href', '/admin/productos')
  })
})