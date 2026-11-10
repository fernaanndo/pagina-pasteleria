import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ItemCarrito from './ItemCarrito'
import { productos } from '../data/productos'

describe('ItemCarrito', () => {
  const producto = productos[0]

  test('muestra el nombre y la cantidad del producto', () => {
    render(<ItemCarrito item={{ producto, cantidad: 2 }} onCambiarCantidad={vi.fn()} onEliminar={vi.fn()} />)

    expect(screen.getByText(producto.nombre)).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('los botones cambian la cantidad y quitan el producto', async () => {
    const onCambiarCantidad = vi.fn()
    const onEliminar = vi.fn()
    const user = userEvent.setup()
    render(<ItemCarrito item={{ producto, cantidad: 2 }} onCambiarCantidad={onCambiarCantidad} onEliminar={onEliminar} />)

    await user.click(screen.getByRole('button', { name: `Aumentar cantidad de ${producto.nombre}` }))
    expect(onCambiarCantidad).toHaveBeenCalledWith(producto.codigo, 3)

    await user.click(screen.getByRole('button', { name: `Reducir cantidad de ${producto.nombre}` }))
    expect(onCambiarCantidad).toHaveBeenCalledWith(producto.codigo, 1)

    await user.click(screen.getByRole('button', { name: `Quitar ${producto.nombre} del carrito` }))
    expect(onEliminar).toHaveBeenCalledWith(producto.codigo)
  })

  test('no permite bajar de 1 unidad', () => {
    render(<ItemCarrito item={{ producto, cantidad: 1 }} onCambiarCantidad={vi.fn()} onEliminar={vi.fn()} />)
    expect(screen.getByRole('button', { name: `Reducir cantidad de ${producto.nombre}` })).toBeDisabled()
  })
})