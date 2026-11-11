import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import ResumenCarrito from './ResumenCarrito'

describe('ResumenCarrito', () => {
  test('muestra el total con formato chileno', () => {
    render(<ResumenCarrito total={45000} />)
    expect(screen.getByText('$45.000')).toBeInTheDocument()
  })
})