import { beforeEach, describe, expect, test, vi } from 'vitest'
import { obtenerProductos } from './storage'
import { productos } from '../data/productos'

describe('obtenerProductos', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  test('si localStorage está vacío, guarda y devuelve los productos iniciales', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem')
    expect(obtenerProductos()).toEqual(productos)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('si hay datos guardados, los devuelve sin sobrescribir', () => {
    localStorage.setItem('productos', JSON.stringify([productos[0]]))
    expect(obtenerProductos()).toHaveLength(1)
  })
})