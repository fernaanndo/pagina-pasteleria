
import { Link, Navigate, useNavigate, useParams } from "react-router"
import { aProducto, aValores, validarProducto, type ValoresProducto } from "../../utils/formularioProducto"
import { actualizarProducto, agregarProducto, buscarProductoPorCodigo } from "../../services/storage"
import { useState } from "react";
import CampoFormulario from "../../components/CampoFormulario";
import { categorias } from "../../data/productos";

type Campo = keyof ValoresProducto;

function ProductoForm() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const productoEditar = codigo ? buscarProductoPorCodigo(codigo) : undefined;
  const esEdicion = productoEditar !== undefined

  const [valores, setValores] = useState(() => aValores(productoEditar))
  const [tocados, setTocados] = useState<Partial<Record<Campo, boolean>>>({})
  const [enviado, setEnviado] = useState(false)
  const [errorDuplicado, setErrorDuplicado] = useState<string | null>(null)

  if (codigo && !productoEditar) {
    return <Navigate to="/admin/productos" replace />
  }

  const errores = validarProducto(valores)

  function errorDe(campo: Campo) {
    return enviado || tocados[campo] ? errores[campo] : null
  }

  function cambiar(campo: Campo, valor: string) {
    setValores({ ...valores, [campo]: valor })
    setTocados({ ...tocados, [campo]: true })
    if (campo === 'codigo') setErrorDuplicado(null)
  }

  function guardar() {
    setEnviado(true);
    if (Object.values(errores).some(Boolean)) return

    const producto = aProducto(valores)

    if (esEdicion) {
      actualizarProducto(producto)
    } else if (!agregarProducto(producto)) {
      setErrorDuplicado(`Ya existe un producto con el código ${producto.codigo}`)
      return
    }

    navigate('/admin/productos')
  }

  const errorDescripcion = errorDe('descripcion');
  const errorCategoria = errorDe('categoria');

  return (
    <>
      <section>
        <h1>{esEdicion ? 'Editar producto' : 'Nuevo producto'}</h1>
        <p className="texto-secundario">Los campos marcados con * son obligatorios</p>
      </section>

      <section>
        <form className="row g-3" noValidate onSubmit={(e) => { e.preventDefault(); guardar() }}>
          <div className="col-md-4">
            <CampoFormulario id="codigo" label="Código *" value={valores.codigo}
              onChange={(v) => cambiar('codigo', v)} error={errorDuplicado ?? errorDe('codigo')}
              placeholder="Ej: TC003" readOnly={esEdicion} />
          </div>

          <div className="col-md-8">
            <CampoFormulario id="nombre" label="Nombre *" value={valores.nombre}
              onChange={(v) => cambiar('nombre', v)} error={errorDe('nombre')}
              placeholder="Ej: Torta Cuadrada de Chocolate" />
          </div>

          <div className="col-12">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea id="descripcion" rows={3} className={`form-control ${errorDescripcion ? 'is-invalid' : ''}`}
              value={valores.descripcion} placeholder="Descripción del producto (opcional)"
              onChange={(e) => cambiar('descripcion', e.target.value)} />
            {errorDescripcion && <div className="invalid-feedback">{errorDescripcion}</div>}
          </div>

          <div className="col-md-4">
            <CampoFormulario id="precio" label="Precio *" value={valores.precio}
              onChange={(v) => cambiar('precio', v)} error={errorDe('precio')}
              placeholder="0" inputMode="decimal" prefijo="$" />
          </div>

          <div className="col-md-4">
            <CampoFormulario id="stock" label="Stock *" value={valores.stock}
              onChange={(v) => cambiar('stock', v)} error={errorDe('stock')}
              placeholder="0" inputMode="numeric" />
          </div>

          <div className="col-md-4">
            <CampoFormulario id="stockCritico" label="Stock crítico" value={valores.stockCritico}
              onChange={(v) => cambiar('stockCritico', v)} error={errorDe('stockCritico')}
              placeholder="Opcional" inputMode="numeric" />
          </div>

          <div className="col-md-6">
            <label htmlFor="categoria" className="form-label">Categoría *</label>
            <select id="categoria" className={`form-select ${errorCategoria ? 'is-invalid' : ''}`}
              value={valores.categoria} onChange={(e) => cambiar('categoria', e.target.value)}>
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
            {errorCategoria && <div className="invalid-feedback">{errorCategoria}</div>}
          </div>

          <div className="col-md-6">
            <CampoFormulario id="imagen" label="Imagen" value={valores.imagen}
              onChange={(v) => cambiar('imagen', v)}
              placeholder="Ej: /img/products/web-TC001.jpg (opcional)" />
          </div>

          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              {esEdicion ? 'Guardar cambios' : 'Guardar producto'}
            </button>
            <Link to="/admin/productos" className="btn btn-secondary">Cancelar</Link>
          </div>
        </form>
      </section>
    </>
  )
}

export default ProductoForm