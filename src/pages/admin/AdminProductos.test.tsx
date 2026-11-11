import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import AdminProductos from './AdminProductos'
import { productos } from '../../data/productos'

describe('AdminProductos', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('al eliminar un producto lo quita de la tabla y muestra un mensaje', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><AdminProductos /></MemoryRouter>)
    const filasAntes = screen.getAllByRole('row').length

    await user.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])

    expect(screen.getAllByRole('row')).toHaveLength(filasAntes - 1)
    expect(screen.getByRole('alert')).toHaveTextContent(
      `Producto ${productos[0].codigo} - ${productos[0].nombre} eliminado`,
    )
  })
})