import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import BlogCard from './BlogCard'
import type { Blog } from '../types/blog'

const blog: Blog = {
  id: 1,
  categoria: 'Nuestra historia',
  titulo: 'Un caso curioso',
  descripcion: 'Descripción del blog',
  imagen: '/img/blog.jpg',
  alt: 'Pastel de prueba',
  tituloDetalle: 'Detalle',
  subtitulo: 'Subtítulo',
  secciones: [],
  textoBoton: 'Ir a productos',
}

describe('BlogCard', () => {
  test('muestra categoría, título y descripción', () => {
    render(
      <MemoryRouter>
        <BlogCard blog={blog} />
      </MemoryRouter>
    )
    expect(screen.getByText('Nuestra historia')).toBeInTheDocument()
    expect(screen.getByText('Un caso curioso')).toBeInTheDocument()
    expect(screen.getByText('Descripción del blog')).toBeInTheDocument()
  })

  test('muestra la imagen con su texto alternativo', () => {
    render(
      <MemoryRouter>
        <BlogCard blog={blog} />
      </MemoryRouter>
    )
    expect(screen.getByAltText('Pastel de prueba')).toBeInTheDocument()
  })

  test('el enlace "Ver caso" lleva al detalle del blog', () => {
    render(
      <MemoryRouter>
        <BlogCard blog={blog} />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: /Ver caso/ })).toHaveAttribute('href', '/blogs/1')
  })
})