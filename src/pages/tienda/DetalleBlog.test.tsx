import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import DetalleBlog from './DetalleBlog'
import { blogs } from '../../data/blogs'

function renderizarEn(ruta: string) {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/blogs/:id" element={<DetalleBlog />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('DetalleBlog', () => {
  test('muestra el blog que corresponde al id de la ruta', () => {
    renderizarEn(`/blogs/${blogs[0].id}`)
    expect(screen.getByRole('heading', { level: 1, name: blogs[0].tituloDetalle })).toBeInTheDocument()
  })

  test('avisa cuando el blog no existe', () => {
    renderizarEn('/blogs/999')
    expect(screen.getByText('No se encontró el blog.')).toBeInTheDocument()
  })
})