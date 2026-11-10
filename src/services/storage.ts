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

export function buscarProductoPorCodigo(codigo: string): Producto | undefined {
    return obtenerProductos().find((p) => p.codigo === codigo);
}

export function agregarProducto(producto: Producto): boolean {
    const lista = obtenerProductos();

    if (lista.some(p => p.codigo === producto.codigo)) {
        return false
    }

    guardarProductos([...lista, producto]);
    return true;
}

export function actualizarProducto(actualizado: Producto): void {
    const lista = obtenerProductos().map((p) =>
        p.codigo === actualizado.codigo ? actualizado : p);
    guardarProductos(lista);
}

export function eliminarProducto(codigo: string): void {
    guardarProductos(obtenerProductos().filter((p) => p.codigo !== codigo));
}

export function buscarUsuarioPorRun(run: string): Usuario | undefined {
    return obtenerUsuarios().find((u) => u.run === run);
}

export function agregarUsuario(usuario: Usuario): boolean {
    const lista = obtenerUsuarios();
    
    if (lista.some(u => u.run === usuario.run || u.correo === usuario.correo)) {
        return false
    }
    guardarUsuarios([...lista, usuario]);
    return true;
}

export function actualizarUsuario(actualizado: Usuario): void {
    const lista = obtenerUsuarios().map((u) =>
        u.run === actualizado.run ? actualizado : u);
    guardarUsuarios(lista);
}

export function eliminarUsuario(run: string) : void {
    guardarUsuarios(obtenerUsuarios().filter((u) => u.run !== run));
}