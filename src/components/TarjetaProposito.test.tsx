import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import TarjetaProposito from './TarjetaProposito'

describe('TarjetaProposito', () => {
  test('muestra el título y la descripción recibidos por props', () => {
    render(<TarjetaProposito titulo="Misión" descripcion="Preparar productos de calidad" />)
    expect(screen.getByRole('heading', { name: 'Misión' })).toBeInTheDocument()
    expect(screen.getByText('Preparar productos de calidad')).toBeInTheDocument()
  })
})