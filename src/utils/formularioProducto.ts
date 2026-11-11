import type { Producto } from '../types/producto'
import { esDecimal, esEntero, esMayorIgualQue, esRequerido, largoMaximo, largoMinimo } from './validators'

export interface ValoresProducto{
    codigo: string;
    nombre: string;
    descripcion: string;
    precio: string;
    stock: string;
    stockCritico: string;
    categoria: string;
    imagen: string;
}

export type ErroresProducto = Record<keyof ValoresProducto, string | null>

export function validarProducto(valores: ValoresProducto): ErroresProducto {
  const codigo = valores.codigo.trim()
  const nombre = valores.nombre.trim()
  const precio = valores.precio.trim()
  const stock = valores.stock.trim()
  const stockCritico = valores.stockCritico.trim()

  return {
    codigo: esRequerido(codigo) || largoMinimo(codigo, 3),
    nombre: esRequerido(nombre) || largoMaximo(nombre, 100),
    descripcion: largoMaximo(valores.descripcion.trim(), 500),
    precio: esRequerido(precio) || esDecimal(precio) || esMayorIgualQue(precio, 0),
    stock: esRequerido(stock) || esEntero(stock) || esMayorIgualQue(stock, 0),
    stockCritico: stockCritico === '' ? null : esEntero(stockCritico) || esMayorIgualQue(stockCritico, 0),
    categoria: esRequerido(valores.categoria),
    imagen: null,
  }
}

export function aValores(producto?: Producto): ValoresProducto {
  return {
    codigo: producto?.codigo ?? '',
    nombre: producto?.nombre ?? '',
    descripcion: producto?.descripcion ?? '',
    precio: producto ? String(producto.precio) : '',
    stock: producto ? String(producto.stock) : '',
    stockCritico: producto ? String(producto.stockCritico) : '',
    categoria: producto?.categoria ?? '',
    imagen: producto?.imagen ?? '',
  }
}

export function aProducto(valores: ValoresProducto): Producto {
  return {
    codigo: valores.codigo.trim().toUpperCase(),
    nombre: valores.nombre.trim(),
    descripcion: valores.descripcion.trim(),
    precio: Number(valores.precio.trim().replace(',', '.')),
    stock: Number(valores.stock.trim()),
    stockCritico: valores.stockCritico.trim() === '' ? 0 : Number(valores.stockCritico.trim()),
    categoria: valores.categoria,
    imagen: valores.imagen.trim(),
  }
}

