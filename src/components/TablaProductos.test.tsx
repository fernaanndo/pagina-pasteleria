import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import TablaProductos from './TablaProductos'
import { productos } from '../data/productos'

describe('TablaProductos', () => {
  const lista = productos.slice(0, 2)

  test('muestra una fila por cada producto', () => {
    render(<MemoryRouter><TablaProductos productos={lista} onEliminar={vi.fn()} /></MemoryRouter>)
    // +1 por la fila de encabezados
    expect(screen.getAllByRole('row')).toHaveLength(lista.length + 1)
  })

  test('al hacer clic en Eliminar llama a onEliminar con el código del producto', async () => {
    const onEliminar = vi.fn()
    const user = userEvent.setup()
    render(<MemoryRouter><TablaProductos productos={lista} onEliminar={onEliminar} /></MemoryRouter>)

    await user.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])

    expect(onEliminar).toHaveBeenCalledWith(lista[0].codigo)
  })
})