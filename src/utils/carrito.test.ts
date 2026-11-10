import { describe, expect, test } from 'vitest'
import { agregarItem, armarLineas, calcularTotal, cambiarCantidadItem, contarItems, quitarItem } from './carrito'
import { productos } from '../data/productos'

describe('carrito', () => {
  test('agrega un producto nuevo con cantidad 1', () => {
    expect(agregarItem([], 'TC001')).toEqual([{ codigo: 'TC001', cantidad: 1 }])
  })

  test('si el producto ya está, suma la cantidad', () => {
    expect(agregarItem([{ codigo: 'TC001', cantidad: 2 }], 'TC001', 3)).toEqual([{ codigo: 'TC001', cantidad: 5 }])
  })

  test('no permite superar las 99 unidades', () => {
    expect(agregarItem([{ codigo: 'TC001', cantidad: 98 }], 'TC001', 2)).toBeNull()
  })

  test('cambia la cantidad y quita productos', () => {
    const items = [{ codigo: 'TC001', cantidad: 1 }, { codigo: 'TC002', cantidad: 1 }]
    expect(cambiarCantidadItem(items, 'TC001', 4)[0].cantidad).toBe(4)
    expect(cambiarCantidadItem(items, 'TC001', 0)).toBe(items)
    expect(quitarItem(items, 'TC001')).toEqual([{ codigo: 'TC002', cantidad: 1 }])
  })

  test('cuenta el total de unidades', () => {
    expect(contarItems([{ codigo: 'A', cantidad: 2 }, { codigo: 'B', cantidad: 3 }])).toBe(5)
  })

  test('arma las líneas con el producto e ignora los que ya no existen', () => {
    const lineas = armarLineas([{ codigo: productos[0].codigo, cantidad: 2 }, { codigo: 'NO-EXISTE', cantidad: 1 }], productos)
    expect(lineas).toEqual([{ producto: productos[0], cantidad: 2 }])
  })

  test('calcula el total multiplicando precio por cantidad', () => {
    expect(calcularTotal([{ producto: productos[0], cantidad: 2 }])).toBe(productos[0].precio * 2)
  })
})