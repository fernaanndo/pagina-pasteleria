import type { ItemCarrito } from "../types/carrito";

export const CANTIDAD_MAXIMA = 99;

export function agregarItem(
  items: ItemCarrito[],
  codigo: string,
  cantidad = 1,
): ItemCarrito[] | null {
  if (!Number.isInteger(cantidad) || cantidad < 1) return null;

  const existente = items.find((i) => i.codigo === codigo);
  const nuevaCantidad = (existente?.cantidad ?? 0) + cantidad;
  if (nuevaCantidad > CANTIDAD_MAXIMA) return null;

  if (existente) {
    return items.map((i) =>
      i.codigo === codigo ? { ...i, cantidad: nuevaCantidad } : i,
    );
  }
  return [...items, { codigo, cantidad }];
}

export function cambiarCantidadItem(
  items: ItemCarrito[],
  codigo: string,
  cantidad: number,
): ItemCarrito[] {
  if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > CANTIDAD_MAXIMA)
    return items;
  return items.map((i) => (i.codigo === codigo ? { ...i, cantidad } : i));
}

export function quitarItem(
  items: ItemCarrito[],
  codigo: string,
): ItemCarrito[] {
  return items.filter((i) => i.codigo !== codigo);
}

export function contarItems(items: ItemCarrito[]): number {
  return items.reduce((total, item) => total + item.cantidad, 0);
}
