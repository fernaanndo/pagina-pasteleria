import { beforeEach, describe, expect, test, vi } from 'vitest'
import { obtenerProductos, agregarProducto, actualizarProducto, buscarProductoPorCodigo, eliminarProducto, buscarUsuarioPorRun, agregarUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario } from './storage'
import { productos } from '../data/productos'
import { usuarios } from '../data/usuarios'

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

describe('CRUD de productos', () => {
  const nuevo = { ...productos[0], codigo: 'NUEVO01', nombre: 'Torta de prueba' }

  beforeEach(() => {
    localStorage.clear()
  })

  test('agrega un producto nuevo', () => {
    expect(agregarProducto(nuevo)).toBe(true)
    expect(buscarProductoPorCodigo('NUEVO01')).toEqual(nuevo)
  })

  test('no agrega un producto con código repetido', () => {
    const cantidad = obtenerProductos().length
    expect(agregarProducto(productos[0])).toBe(false)
    expect(obtenerProductos()).toHaveLength(cantidad)
  })

  test('actualiza solo el producto indicado', () => {
    actualizarProducto({ ...productos[0], precio: 1 })
    expect(buscarProductoPorCodigo(productos[0].codigo)?.precio).toBe(1)
    expect(buscarProductoPorCodigo(productos[1].codigo)?.precio).toBe(productos[1].precio)
  })

  test('elimina un producto', () => {
    eliminarProducto(productos[0].codigo)
    expect(buscarProductoPorCodigo(productos[0].codigo)).toBeUndefined()
  })
})


describe('CRUD de usuarios', () => {
  const nuevo = { ...usuarios[0], run: '204567892', nombre: 'Usuario de prueba', correo: 'prueba@duocuc.cl' }

  beforeEach(() => {
    localStorage.clear()
  })

  test('agrega un usuario nuevo', () => {
    expect(agregarUsuario(nuevo)).toBe(true)
    expect(buscarUsuarioPorRun('204567892')).toEqual(nuevo)
  })

  test('no agrega un usuario con run o correo repetido', () => {
    const cantidad = obtenerUsuarios().length
    expect(agregarUsuario({ ...nuevo, run: usuarios[0].run })).toBe(false)
    expect(agregarUsuario({ ...nuevo, correo: usuarios[0].correo })).toBe(false)
    expect(obtenerUsuarios()).toHaveLength(cantidad)
  })

  test('actualiza solo el usuario indicado', () => {
    actualizarUsuario({ ...usuarios[0], nombre: 'Usuario actualizado' })
    expect(buscarUsuarioPorRun(usuarios[0].run)?.nombre).toBe('Usuario actualizado')
    expect(buscarUsuarioPorRun(usuarios[1].run)?.nombre).toBe(usuarios[1].nombre)
  })

  test('elimina un usuario', () => {
    eliminarUsuario(usuarios[0].run)
    expect(buscarUsuarioPorRun(usuarios[0].run)).toBeUndefined()
  })
})