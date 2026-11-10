import { Link } from "react-router";

interface TarjetaResumenProps {
    titulo: string;
    descripcion: string;
    enlace: string;
    textoBoton: string;
}


function TarjetaResumen({ titulo, descripcion, enlace, textoBoton }: TarjetaResumenProps) {
    return (
        <div className="card h-100">
            <div className="card-body">
                <h3 className="card-title fs-5">{titulo}</h3>
                <p className="card-text">{descripcion}</p>
                <Link to={enlace} className="btn btn-primary">{textoBoton}</Link>
            </div>
        </div>
    )
}

export default TarjetaResumen