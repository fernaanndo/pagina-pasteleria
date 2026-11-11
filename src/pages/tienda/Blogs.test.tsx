import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Blogs from './Blogs'
import { blogs } from '../../data/blogs'

describe('Blogs', () => {
  test('muestra una tarjeta por cada blog', () => {
    render(<MemoryRouter><Blogs /></MemoryRouter>)

    for (const blog of blogs) {
      expect(screen.getByRole('heading', { name: blog.titulo })).toBeInTheDocument()
    }
  })
})