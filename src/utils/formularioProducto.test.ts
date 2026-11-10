import { describe, expect, test } from 'vitest'
import { aProducto, aValores, validarProducto } from './formularioProducto'
import { productos } from '../data/productos'

describe('formularioProducto', () => {
  test('un formulario vacío tiene errores en los campos obligatorios', () => {
    const errores = validarProducto(aValores())
    expect(errores.codigo).toBe('Este campo es obligatorio')
    expect(errores.precio).toBe('Este campo es obligatorio')
    expect(errores.stockCritico).toBeNull()
  })

  test('un producto existente no tiene errores', () => {
    const errores = validarProducto(aValores(productos[0]))
    expect(Object.values(errores).every((e) => e === null)).toBe(true)
  })

  test('convierte los valores del formulario a un Producto', () => {
    const producto = aProducto({ ...aValores(productos[0]), codigo: ' tc999 ', precio: '4500,5', stockCritico: '' })
    expect(producto.codigo).toBe('TC999')
    expect(producto.precio).toBe(4500.5)
    expect(producto.stockCritico).toBe(0)
  })
})