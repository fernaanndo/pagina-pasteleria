interface CampoFormularioProps {
    id: string;
    label: string;
    value: string;
    onChange: (valor: string) => void;
    error?: string | null;
    type?: string;
    placeholder?: string;
}

function CampoFormulario({ id, label, value, onChange, error, type = "text", placeholder }: CampoFormularioProps) {
    return (
        <div>
            <label htmlFor={id} className="form-label">{label}</label>
            <input id={id} type={type} className={`form-control ${error ? 'is-invalid' : ''}`}
                value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

export default CampoFormulario