import { Link, Navigate, useNavigate, useParams } from "react-router";
import { aUsuario, aValoresUsuario, validarUsuario, type ValoresUsuario } from "../../utils/formularioUsuario";
import { actualizarUsuario, agregarUsuario, buscarUsuarioPorRun } from "../../services/storage";
import { useState } from "react";
import CampoFormulario from "../../components/CampoFormulario";
import SelectorRegionComuna from "../../components/SelectorRegionComuna";
import { tiposUsuario } from "../../data/usuarios";

type Campo = keyof ValoresUsuario;

function UsuarioForm() {
  const { run } = useParams();
  const navigate = useNavigate();
  const usuarioEditar = run ? buscarUsuarioPorRun(run) : undefined;
  const esEdicion = usuarioEditar !== undefined;

  const [valores, setValores] = useState(() => aValoresUsuario(usuarioEditar));
  const [tocados, setTocados] = useState<Partial<Record<Campo, boolean>>>({});
  const [enviado, setEnviado] = useState(false);
  const [errorDuplicado, setErrorDuplicado] = useState<string | null>(null);

  if (run && !usuarioEditar) {
    return <Navigate to="/admin/usuarios" replace />;
  }

  const errores = validarUsuario(valores);

  function errorDe(campo: Campo) {
    return enviado || tocados[campo] ? errores[campo] : null
  }

  function cambiar(campo: Campo, valor: string) {
    setValores((anteriores) => ({ ...anteriores, [campo]: valor }))
    setTocados((anteriores) => ({ ...anteriores, [campo]: true }))
    if (campo === 'run' || campo === 'correo') setErrorDuplicado(null)
  }

  function guardar() {
    setEnviado(true);
    if (Object.values(errores).some(Boolean)) return

    const usuario = aUsuario(valores)

    if (esEdicion) {
      actualizarUsuario(usuario)
    } else if (!agregarUsuario(usuario)) {
      setErrorDuplicado("Ya existe un usuario con ese RUN o correo")
      return
    }

    navigate('/admin/usuarios')
  }

  const errorTipo = errorDe('tipoUsuario');

  return (
    <>
      <section>
        <h1>{esEdicion ? 'Editar usuario' : 'Nuevo usuario'}</h1>
        <p className="texto-secundario">Los campos marcados con * son obligatorios</p>
      </section>

      <section>
        <form className="row g-3" noValidate onSubmit={(e) => { e.preventDefault(); guardar() }}>
          <div className="col-md-4">
            <CampoFormulario id="run" label="RUN *" value={valores.run}
              onChange={(v) => cambiar('run', v)} error={errorDuplicado ?? errorDe('run')}
              placeholder="Sin puntos ni guion, ej: 12345678K" readOnly={esEdicion} />
          </div>

          <div className="col-md-4">
            <CampoFormulario id="nombre" label="Nombre *" value={valores.nombre}
              onChange={(v) => cambiar('nombre', v)} error={errorDe('nombre')} placeholder="Ej: Ana" />
          </div>

          <div className="col-md-4">
            <CampoFormulario id="apellidos" label="Apellidos *" value={valores.apellidos}
              onChange={(v) => cambiar('apellidos', v)} error={errorDe('apellidos')} placeholder="Ej: Pérez Soto" />
          </div>

          <div className="col-md-6">
            <CampoFormulario id="correo" label="Correo *" type="email" value={valores.correo}
              onChange={(v) => cambiar('correo', v)} error={errorDe('correo')} placeholder="Ej: ana.perez@duoc.cl" />
          </div>

          <div className="col-md-3">
            <CampoFormulario id="password" label="Contraseña *" type="password" value={valores.password}
              onChange={(v) => cambiar('password', v)} error={errorDe('password')} placeholder="Entre 4 y 10 caracteres" />
          </div>

          <div className="col-md-3">
            <CampoFormulario id="fechaNacimiento" label="Fecha de nacimiento" type="date"
              value={valores.fechaNacimiento} onChange={(v) => cambiar('fechaNacimiento', v)} />
          </div>

          <div className="col-md-4">
            <label htmlFor="tipoUsuario" className="form-label">Tipo de usuario *</label>
            <select id="tipoUsuario" className={`form-select ${errorTipo ? 'is-invalid' : ''}`}
              value={valores.tipoUsuario} onChange={(e) => cambiar('tipoUsuario', e.target.value)}>
              <option value="">Selecciona un tipo</option>
              {tiposUsuario.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
            {errorTipo && <div className="invalid-feedback">{errorTipo}</div>}
          </div>

          {/* El selector trae su propia fila con dos columnas de la mitad */}
          <div className="col-md-8">
            <SelectorRegionComuna
              region={valores.region}
              comuna={valores.comuna}
              onChangeRegion={(v) => cambiar('region', v)}
              onChangeComuna={(v) => cambiar('comuna', v)}
              errorRegion={errorDe('region')}
              errorComuna={errorDe('comuna')}
            />
          </div>

          <div className="col-12">
            <CampoFormulario id="direccion" label="Dirección *" value={valores.direccion}
              onChange={(v) => cambiar('direccion', v)} error={errorDe('direccion')}
              placeholder="Ej: Av. Libertador Bernardo O'Higgins 1234" />
          </div>

          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              {esEdicion ? 'Guardar cambios' : 'Guardar usuario'}
            </button>
            <Link to="/admin/usuarios" className="btn btn-secondary">Cancelar</Link>
          </div>
        </form>
      </section>
    </>
  )
}

export default UsuarioForm