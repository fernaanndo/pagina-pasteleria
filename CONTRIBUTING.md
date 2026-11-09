# Guía de trabajo del equipo

Reglas para trabajar en el proyecto sin pisarnos el código. Si algo no está aquí, lo conversamos antes de hacerlo.

## 1. Ramas

```
main       ← versión entregable. Solo recibe merges desde develop
develop    ← integración. Recibe los PR de cada integrante
fernando   ← rama de trabajo de Fernando
felipe     ← rama de trabajo de Felipe
```

- **Nunca** se hace commit directo en `main` ni en `develop`.
- Cada uno trabaja en su rama y abre un **Pull Request hacia `develop`**.
- El otro integrante revisa el PR antes de mergearlo (al menos debe hacer `npm run build` y `npm test`).

### Antes de empezar a trabajar cada día

Trae a tu rama lo último de `develop` para evitar conflictos grandes:

```bash
git checkout develop
git pull origin develop
git checkout <tu-rama>
git merge develop
```

### Para entregar avance

```bash
npm run build      # no debe tener errores
npm test           # todas las pruebas deben pasar
git add -A
git commit -m "feat(carrito): agregar y eliminar productos"
git push origin <tu-rama>
```

Después, abre el PR en GitHub: `<tu-rama>` → `develop`.

## 2. Mensajes de commit

Formato: `tipo(alcance): descripción en minúscula`

| Tipo | Cuándo usarlo | Ejemplo |
|---|---|---|
| `feat` | Funcionalidad nueva o página migrada | `feat(login): migrar formulario de login a React` |
| `fix` | Corrección de un error | `fix(registro): validar RUN vacío` |
| `test` | Agregar o corregir pruebas | `test(ProductoCard): verificar props` |
| `style` | Cambios solo de CSS o diseño | `style(home): grilla responsiva con Bootstrap` |
| `refactor` | Reorganizar código sin cambiar su comportamiento | `refactor(storage): separar CRUD de productos` |
| `docs` | README, documentos | `docs: actualizar README` |
| `chore` | Configuración o dependencias | `chore: instalar react-router` |

Commits pequeños y frecuentes. El profesor revisa el historial de GitHub en la presentación.

## 3. Estructura y nombres

| Qué | Dónde | Nombre |
|---|---|---|
| Páginas | `src/pages/tienda/` o `src/pages/admin/` | PascalCase: `DetalleProducto.tsx` |
| Componentes reutilizables | `src/components/` | PascalCase: `ProductoCard.tsx` |
| Layouts | `src/layouts/` | `TiendaLayout.tsx`, `AdminLayout.tsx` |
| Tipos | `src/types/` | `producto.ts`, con `export interface Producto` |
| Datos iniciales | `src/data/` | `productos.ts` |
| Acceso a localStorage | `src/services/` | `storage.ts` |
| Validaciones | `src/utils/` | `validators.ts` |
| Pruebas | Junto al archivo que prueban | `ProductoCard.test.tsx` |

- Nombres de variables, funciones y componentes **en español**, igual que en la Evaluación 1.
- Un componente = una responsabilidad. Si el JSX crece demasiado, sepáralo en componentes más pequeños.
- Los datos entran por **props**. Usa `useState` solo cuando el componente realmente necesite recordar algo.

## 4. Reglas de código

### TypeScript

- No usar `any`. Si no sabes el tipo, pregunta o crea una interfaz en `src/types/`.
- Para importar tipos, usa `import type` (lo exige la configuración del proyecto):
  ```ts
  import type { Producto } from '../types/producto'
  ```
- Las props de cada componente se declaran con una interfaz:
  ```tsx
  interface ProductoCardProps {
    producto: Producto
    onAgregar: (codigo: string) => void
  }
  ```

### Datos

- Ningún componente usa `localStorage` directamente. Siempre a través de las funciones de `src/services/storage.ts` (`obtenerProductos`, `guardarProductos`, etc.).
- Si necesitas una función nueva de datos, agrégala en `storage.ts` y avísale al otro integrante.

### Navegación (React Router)

| Evaluación 1 (HTML) | React |
|---|---|
| `<a href="productos.html">` | `<Link to="/productos">` o `<NavLink to="/productos">` |
| `detalle.html?codigo=TC001` | Ruta `/productos/TC001` y `const { codigo } = useParams()` |
| `window.location.href = "..."` | `const navigate = useNavigate()` y luego `navigate('/ruta')` |

- Todo se importa desde `'react-router'`, no desde `'react-router-dom'`.
- Las rutas ya están definidas en `src/App.tsx`. No las cambies sin avisar.

### Estilos

- Primero Bootstrap (`container`, `row`, `col-md-*`, `btn`, `form-control`...). CSS propio solo para lo que Bootstrap no cubre (colores, tipografías de la marca).
- Los colores están como variables en `src/styles/global-styles.css`. Úsalas en vez de escribir colores a mano.
- El CSS importado en un componente afecta a **toda** la aplicación. Evita reglas generales como `h1 { }` o `.btn { }` en los archivos de una sección.
- Revisa cada página en móvil, tablet y escritorio (DevTools → modo responsive).
- Imágenes: van en `public/img/` y se referencian como `/img/products/archivo.jpg`.

## 5. Pruebas

- **Cada componente debe tener al menos una prueba** en un archivo `.test.tsx` junto a él.
- Entre todas las pruebas del proyecto deben aparecer estos tipos:
  - **Renderizado:** la lista muestra todos los elementos.
  - **Renderizado condicional:** el error aparece solo cuando hay error.
  - **Props:** el componente usa lo que recibe (texto, `onClick`).
  - **Estado:** el valor del input cambia al escribir.
  - **Eventos:** al hacer clic se llama a una función (`vi.fn()`).
  - **Mocks:** `vi.fn()`, `vi.spyOn(Storage.prototype, 'setItem')`.
- Busca los elementos como los ve el usuario: `getByRole`, `getByLabelText`, `getByText`. Evita buscar por clases CSS.
- Si el componente usa `Link`, `NavLink` o `useParams`, envuélvelo en `MemoryRouter` en la prueba.
- Puedes usar como guía `src/App.test.tsx` (componente con router) y `src/services/storage.test.ts` (mock de localStorage).

```bash
npm test             # modo watch mientras trabajas
npm run coverage     # reporte de cobertura
```

## 6. Distribución del trabajo

Cada uno migra a React las páginas que desarrolló en la Evaluación 1 y escribe las pruebas de sus propios componentes.

### Páginas y lógica

| Área | Fernando | Felipe |
|---|---|---|
| Configuración | ✅ Vite, TypeScript, Bootstrap, React Router, Vitest y cobertura | — |
| Base compartida | ✅ Tipos, datos, `storage.ts`, `validators.ts`, rutas en `App.tsx` | — |
| Layouts | ✅ `AdminLayout`<br>`TiendaLayout` con Navbar y Footer reales | — |
| Datos | Funciones CRUD en `storage.ts` (crear, actualizar, eliminar productos y usuarios) | — |
| Carrito | `CarritoContext` (estado global del carrito)<br>Página `Carrito` | — |
| Páginas de la tienda | — | `Home`, `Productos`, `DetalleProducto`<br>`Blogs`, `DetalleBlog`<br>`Nosotros`, `Contacto`<br>`Login`, `Registro` |
| Páginas del admin | `Dashboard`<br>`AdminProductos`, `ProductoForm`<br>`AdminUsuarios`, `UsuarioForm` | — |
| Diseño responsivo | Admin (ya usa Bootstrap) | Pasar la tienda a la grilla de Bootstrap y limpiar `index.css` |
| Documentos | Documento de cobertura de testing | ERS (versión 2) |
| Presentación | Ambos deben poder explicar **todo** el proyecto: las preguntas son individuales | |

### Componentes reutilizables (`src/components/`)

Cada componente lleva **al menos una prueba**.

| Componente | Responsable | Lo usan | Props principales |
|---|---|---|---|
| `CampoFormulario` | Fernando (**primero**) | Login, Registro, Contacto, ProductoForm, UsuarioForm | `label`, `id`, `value`, `onChange`, `error`, `type` |
| `SelectorRegionComuna` | Fernando (**primero**) | Registro, UsuarioForm | `region`, `comuna`, `onChangeRegion`, `onChangeComuna`, `errorRegion`, `errorComuna` |
| `Navbar` | Fernando | TiendaLayout | — (lee el carrito desde el contexto) |
| `Footer` | Fernando | TiendaLayout | — |
| `ItemCarrito` | Fernando | Carrito | `item`, `onCambiarCantidad`, `onEliminar` |
| `ResumenCarrito` | Fernando | Carrito | `total`, `onVaciar`, `onComprar` |
| `TarjetaResumen` | Fernando | Dashboard | `titulo`, `valor`, `enlace` |
| `TablaProductos` | Fernando | AdminProductos | `productos`, `onEliminar` |
| `BadgeStock` | Fernando | TablaProductos | `stock`, `stockCritico` |
| `TablaUsuarios` | Fernando | AdminUsuarios | `usuarios`, `onEliminar` |
| `ProductoCard` | Felipe | ListaProductos | `producto`, `onAgregar` |
| `ListaProductos` | Felipe | Home, Productos, DetalleProducto (relacionados) | `productos`, `onAgregar` |
| `BlogCard` | Felipe | Blogs | `blog` |
| `TarjetaProposito` | Felipe | Nosotros | `titulo`, `descripcion` |
| `TarjetaDesarrollador` | Felipe | Nosotros | `nombre`, `rol`, `descripcion` |

`CampoFormulario` y `SelectorRegionComuna` se hacen **antes** que los formularios, porque los usan los dos.

### Dependencias entre ambos

- `ProductoCard` (Felipe) tiene un botón "Agregar al carrito" que usa `CarritoContext` (Fernando). Mientras el contexto no esté listo, el componente recibe la función por props (`onAgregar`).
- La Navbar (Fernando) muestra la cantidad de productos del carrito y los enlaces a las páginas de Felipe.
- `Login` (Felipe) redirige a `/admin` cuando el usuario es Administrador.
- Felipe usa `CampoFormulario` en Login, Registro y Contacto, y `SelectorRegionComuna` en Registro.
