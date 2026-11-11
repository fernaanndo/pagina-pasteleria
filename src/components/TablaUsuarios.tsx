import { Link } from "react-router";
import type { Usuario } from "../types/usuario";

interface TablaUsuariosProps {
    usuarios: Usuario[];
    onEliminar: (run: string) => void;
}

function TablaUsuarios({ usuarios, onEliminar }: TablaUsuariosProps) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
                <thead>
                    <tr>
                        <th>Rut</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Tipo Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.run}>
                            <td>{usuario.run}</td>
                            <td>{usuario.nombre} {usuario.apellidos}</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.tipoUsuario}</td>
                            <td className="text-nowrap">
                                <Link to={`/admin/usuarios/${usuario.run}/editar`} className="btn btn-sm btn-primary me-1">Editar</Link>
                                <button type="button" className="btn btn-sm btn-danger" onClick={() => onEliminar(usuario.run)}>
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

export default TablaUsuarios