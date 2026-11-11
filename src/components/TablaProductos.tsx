import { Link } from "react-router";
import type { Producto } from "../types/producto"
import BadgeStock from "./BadgeStock";


interface TablaProductosProps {
    productos: Producto[];
    onEliminar: (codigo: string) => void
}

function TablaProductos({ productos, onEliminar }: TablaProductosProps) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.codigo}>
                            <td>{producto.codigo}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.categoria}</td>
                            <td>${producto.precio.toLocaleString('es-CL')}</td>
                            <td>
                                <BadgeStock stock={producto.stock} stockCritico={producto.stockCritico} />
                            </td>
                            <td className="text-nowrap">
                                <Link to={`/productos/${producto.codigo}`} className="btn btn-sm btn-secondary me-1">Ver</Link>
                                <Link to={`/admin/productos/${producto.codigo}/editar`} className="btn btn-sm btn-primary me-1">Editar</Link>
                                <button type="button" className="btn btn-sm btn-danger" onClick={() => onEliminar(producto.codigo)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablaProductos