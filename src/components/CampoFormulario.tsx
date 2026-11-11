interface CampoFormularioProps {
    id: string;
    label: string;
    value: string;
    onChange: (valor: string) => void;
    error?: string | null;
    type?: string;
    placeholder?: string;
    readOnly?: boolean;
    inputMode?: 'text' | 'numeric' | 'decimal' | 'email' | 'tel';
    prefijo?: string;
}

function CampoFormulario({ id, label, value, onChange, error, type = "text", placeholder, readOnly, inputMode, prefijo }: CampoFormularioProps) {
    const input = (
        <input id={id} type={type} className={`form-control ${error ? 'is-invalid' : ''}`}
            value={value} placeholder={placeholder} readOnly={readOnly} inputMode={inputMode}
            onChange={(e) => onChange(e.target.value)} />
    )
    const mensaje = error && <div className="invalid-feedback">{error}</div>

    return (
        <div>
            <label htmlFor={id} className="form-label">{label}</label>
            {prefijo ? (
                <div className="input-group has-validation">
                    <span className="input-group-text">{prefijo}</span>
                    {input}
                    {mensaje}
                </div>
            ) : (
                <>
                    {input}
                    {mensaje}
                </>
            )}
        </div>
    )
}
export default CampoFormulario