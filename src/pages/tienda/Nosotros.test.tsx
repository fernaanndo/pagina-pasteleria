import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Nosotros from './Nosotros'

describe('Nosotros', () => {
  test('muestra la misión, visión, valores y el equipo', () => {
    render(<MemoryRouter><Nosotros /></MemoryRouter>)

    for (const titulo of ['Misión', 'Visión', 'Valores']) {
      expect(screen.getByRole('heading', { name: titulo })).toBeInTheDocument()
    }
    expect(screen.getByText('Felipe Cassaretto')).toBeInTheDocument()
    expect(screen.getByText('Fernando Catalán')).toBeInTheDocument()
  })
})