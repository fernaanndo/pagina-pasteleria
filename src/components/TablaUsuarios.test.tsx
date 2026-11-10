import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import TablaUsuarios from './TablaUsuarios'
import { usuarios } from '../data/usuarios'

describe('TablaUsuarios', () => {
  const lista = usuarios.slice(0, 2)

  test('muestra una fila por usuario con su nombre completo', () => {
    render(<MemoryRouter><TablaUsuarios usuarios={lista} onEliminar={vi.fn()} /></MemoryRouter>)

    expect(screen.getAllByRole('row')).toHaveLength(lista.length + 1)
    expect(screen.getByText(`${lista[0].nombre} ${lista[0].apellidos}`)).toBeInTheDocument()
  })

  test('al hacer clic en Eliminar llama a onEliminar con el RUN del usuario', async () => {
    const onEliminar = vi.fn()
    const user = userEvent.setup()
    render(<MemoryRouter><TablaUsuarios usuarios={lista} onEliminar={onEliminar} /></MemoryRouter>)

    await user.click(screen.getAllByRole('button', { name: 'Eliminar' })[1])

    expect(onEliminar).toHaveBeenCalledWith(lista[1].run)
  })
})