import type { Producto } from "../types/producto";
import type { Usuario } from "../types/usuario";
import { productos } from "../data/productos";
import { usuarios } from "../data/usuarios";


const CLAVE_PRODUCTOS = "productos";
const CLAVE_USUARIOS = "usuarios";

// Esta funcion devuelve los productos guardados en localStorage. Si no hay productos guardados, guarda los productos iniciales (src/data/productos.ts) y los devuelve.
export function obtenerProductos(): Producto[] {
    const guardados = localStorage.getItem(CLAVE_PRODUCTOS);

    if (!guardados) {
        guardarProductos(productos);
        return productos;
    }

    return JSON.parse(guardados) as Producto[];
}
    
// Reemplaza los productos guardados en localStorage por la lista recibida.
export function guardarProductos(lista: Producto[]): void {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(lista));
}

// Lo mismo con usuarios
export function obtenerUsuarios(): Usuario[] {
    const guardados = localStorage.getItem(CLAVE_USUARIOS);

    if (!guardados) {
        guardarUsuarios(usuarios);
        return usuarios;
    }

    return JSON.parse(guardados) as Usuario[];
}

export function guardarUsuarios(lista: Usuario[]): void {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista));
}