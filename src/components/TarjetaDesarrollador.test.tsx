import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import TarjetaDesarrollador from './TarjetaDesarrollador'

describe('TarjetaDesarrollador', () => {
  test('muestra el rol, el nombre y la descripción recibidos por props', () => {
    render(
      <TarjetaDesarrollador
        nombre="Felipe Cassaretto"
        rol="Programación"
        descripcion="Interacciones del catálogo"
      />
    )
    expect(screen.getByRole('heading', { name: 'Programación' })).toBeInTheDocument()
    expect(screen.getByText('Felipe Cassaretto')).toBeInTheDocument()
    expect(screen.getByText('Interacciones del catálogo')).toBeInTheDocument()
  })
})