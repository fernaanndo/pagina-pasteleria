import type { Producto } from "./producto";

export interface ItemCarrito {
    codigo: string;
    cantidad: number;
}

export interface LineaCarrito {
    producto: Producto;
    cantidad: number;
}