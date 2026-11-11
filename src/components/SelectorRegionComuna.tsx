import { regiones } from "../data/regiones"

interface SelectorRegionComunaProps {
    region: string;
    comuna: string;
    onChangeRegion: (valor: string) => void;
    onChangeComuna: (valor: string) => void;
    errorRegion?: string | null;
    errorComuna?: string | null;
}

function SelectorRegionComuna({ region, comuna, onChangeRegion, onChangeComuna, errorRegion, errorComuna }: SelectorRegionComunaProps) {
    const comunas = regiones.find((r) => r.nombre === region)?.comunas ?? []

    function cambiarRegion(nuevaRegion: string) {
        onChangeRegion(nuevaRegion)
        onChangeComuna('')
    }
    return (
        <div className="row g-3">
            <div className="col-md-6">
                <label htmlFor="region" className="form-label">Región</label>
                <select id="region" className={`form-select ${errorRegion ? 'is-invalid' : ''}`} value={region} onChange={(e) => cambiarRegion(e.target.value)}>
                    <option value="">Selecciona una región</option>
                    {regiones.map((r) => (
                        <option key={r.nombre} value={r.nombre}>{r.nombre}</option>
                    ))}
                </select>
                {errorRegion && <div className="invalid-feedback">{errorRegion}</div>}
            </div>

            <div className="col-md-6">
                <label htmlFor="comuna" className="form-label">Comuna</label>
                <select id="comuna" className={`form-select ${errorComuna ? 'is-invalid' : ''}`} value={comuna} disabled={!region} onChange={(e) => onChangeComuna(e.target.value)}>
                    <option value="">{region ? 'Selecciona una comuna' : 'Primero selecciona una región'}</option>
                    {comunas.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                {errorComuna && <div className="invalid-feedback">{errorComuna}</div>}
            </div>
        </div>
    )
}

export default SelectorRegionComuna