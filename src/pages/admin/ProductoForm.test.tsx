import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import ProductoForm from './ProductoForm'
import { productos } from '../../data/productos'
import { buscarProductoPorCodigo } from '../../services/storage'

function renderizarEn(ruta: string) {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/admin/productos" element={<h1>Listado</h1>} />
        <Route path="/admin/productos/nuevo" element={<ProductoForm />} />
        <Route path="/admin/productos/:codigo/editar" element={<ProductoForm />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProductoForm', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('al guardar vacío muestra los errores y no sale del formulario', async () => {
    const user = userEvent.setup()
    renderizarEn('/admin/productos/nuevo')

    await user.click(screen.getByRole('button', { name: 'Guardar producto' }))

    // código, nombre, precio, stock y categoría
    expect(screen.getAllByText('Este campo es obligatorio')).toHaveLength(5)
    expect(screen.getByRole('heading', { name: 'Nuevo producto' })).toBeInTheDocument()
  })

  test('crea un producto válido y vuelve al listado', async () => {
    const user = userEvent.setup()
    renderizarEn('/admin/productos/nuevo')

    await user.type(screen.getByLabelText('Código *'), 'tc999')
    await user.type(screen.getByLabelText('Nombre *'), 'Torta de prueba')
    await user.type(screen.getByLabelText('Precio *'), '15000')
    await user.type(screen.getByLabelText('Stock *'), '5')
    await user.selectOptions(screen.getByLabelText('Categoría *'), 'Tortas Cuadradas')
    await user.click(screen.getByRole('button', { name: 'Guardar producto' }))

    expect(buscarProductoPorCodigo('TC999')?.nombre).toBe('Torta de prueba')
    expect(screen.getByRole('heading', { name: 'Listado' })).toBeInTheDocument()
  })

  test('en modo edición carga el producto y bloquea el código', () => {
    renderizarEn(`/admin/productos/${productos[0].codigo}/editar`)

    expect(screen.getByRole('heading', { name: 'Editar producto' })).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre *')).toHaveValue(productos[0].nombre)
    expect(screen.getByLabelText('Código *')).toHaveAttribute('readonly')
  })
})