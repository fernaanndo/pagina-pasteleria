import { useEffect, useState, type ReactNode } from "react";
import { buscarProductoPorCodigo, guardarCarrito, obtenerCarrito } from "../services/storage";
import { agregarItem, cambiarCantidadItem, contarItems, quitarItem } from "../utils/carrito";
import { CarritoContext } from "./CarritoContext";

interface CarritoProviderProps {
    children: ReactNode
}

function CarritoProvider({ children }: CarritoProviderProps) {

    const [items, setItems] = useState(obtenerCarrito)

    // Sincronizar el carrito con localStorage cada vez que cambia
    useEffect(() => {
        guardarCarrito(items)
    }, [items])

    function agregar(codigo: string, cantidad = 1) {
        if (!buscarProductoPorCodigo(codigo)) return false;

        const nuevos = agregarItem(items, codigo, cantidad);
        if (!nuevos) return false;

        setItems(nuevos);
        return true;
    }

    function cambiarCantidad(codigo: string, cantidad: number) {
        setItems((anteriores) => cambiarCantidadItem(anteriores, codigo, cantidad))
    }

    function quitar(codigo: string) {
        setItems((anteriores) => quitarItem(anteriores, codigo))
    }

    function vaciar() {
        setItems([]);
    }

    const valor = {items, cantidadTotal: contarItems(items), agregar, cambiarCantidad, quitar, vaciar}

    return (<CarritoContext value={valor}>{children}</CarritoContext>)
}

export default CarritoProvider