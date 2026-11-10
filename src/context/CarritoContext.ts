import { createContext } from "react";
import type { ItemCarrito } from "../types/carrito";

export interface CarritoContextValor {
    items: ItemCarrito[];
    cantidadTotal: number;
    agregar: (codigo: string, cantidad?: number) => boolean;
    cambiarCantidad: (codigo: string, cantidad: number) => void;
    quitar: (codigo: string) => void;
    vaciar: () => void;
}

export const CarritoContext = createContext<CarritoContextValor | null>(null)


