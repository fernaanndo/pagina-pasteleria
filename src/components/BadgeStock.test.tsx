import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import BadgeStock from './BadgeStock'

describe('BadgeStock', () => {
  test('muestra la alerta cuando el stock está en el nivel crítico', () => {
    render(<BadgeStock stock={2} stockCritico={3} />)
    expect(screen.getByText('Stock crítico: 2')).toBeInTheDocument()
  })

  test('muestra solo el número cuando el stock es suficiente', () => {
    render(<BadgeStock stock={10} stockCritico={3} />)
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.queryByText(/Stock crítico/)).not.toBeInTheDocument()
  })
})