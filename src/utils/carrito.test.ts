import { describe, expect, test } from 'vitest'
import { agregarItem, cambiarCantidadItem, contarItems, quitarItem } from './carrito'

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
})