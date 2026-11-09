# Pastelería Mil Sabores

Tienda online de pastelería con panel de administración, desarrollada para la asignatura **DSY1104 Desarrollo FullStack II** (Duoc UC).

En la Evaluación Parcial 1 el proyecto se construyó con HTML, CSS y JavaScript. En la Evaluación Parcial 2 se migró a **React + TypeScript**, con componentes reutilizables, navegación con React Router, diseño responsivo con Bootstrap y pruebas unitarias.

> La versión HTML de la Evaluación 1 está disponible en el tag [`ea1-final`](https://github.com/fernaanndo/pagina-pasteleria/tree/ea1-final).

## Integrantes

- Fernando Catalán
- Felipe Cassaretto

## Tecnologías

| Área | Herramienta |
|---|---|
| Framework | React 19 + TypeScript (con React Compiler) |
| Build | Vite |
| Navegación | React Router |
| Estilos | Bootstrap 5 + CSS propio |
| Pruebas | Vitest + Testing Library + jsdom |
| Cobertura | @vitest/coverage-v8 |
| Persistencia | localStorage / sessionStorage |

## Requisitos

- Node.js 20 o superior
- npm

## Instalación y uso

```bash
git clone https://github.com/fernaanndo/pagina-pasteleria.git
cd pagina-pasteleria
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo |
| `npm run build` | Revisa los tipos con TypeScript y genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la versión de producción |
| `npm run lint` | Revisa el código con ESLint |
| `npm test` | Ejecuta las pruebas en modo watch |
| `npm run coverage` | Ejecuta las pruebas una vez y genera el reporte de cobertura en `coverage/index.html` |

## Estructura del proyecto

```
src/
  data/        Datos iniciales (productos, usuarios, regiones)
  services/    Persistencia en localStorage (obtener / guardar)
  types/       Interfaces de TypeScript (Producto, Usuario, Region)
  utils/       Validadores de formularios
  layouts/     TiendaLayout y AdminLayout (partes comunes de cada sección)
  pages/
    tienda/    Páginas públicas de la tienda
    admin/     Páginas del panel de administración
  styles/      Estilos globales, de la tienda y del admin
public/
  img/         Imágenes de productos y logo
```

Cada componente tiene su prueba en el mismo directorio, con el nombre `Componente.test.tsx`.

## Rutas

### Tienda

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/productos` | Catálogo de productos |
| `/productos/:codigo` | Detalle de producto |
| `/carrito` | Carrito de compras |
| `/login` | Inicio de sesión |
| `/registro` | Registro de usuario |
| `/nosotros` | Nosotros |
| `/contacto` | Contacto |
| `/blogs` | Blogs |
| `/blogs/:id` | Detalle de blog |

### Administración

| Ruta | Página |
|---|---|
| `/admin` | Dashboard |
| `/admin/productos` | Listado de productos |
| `/admin/productos/nuevo` | Crear producto |
| `/admin/productos/:codigo/editar` | Editar producto |
| `/admin/usuarios` | Listado de usuarios |
| `/admin/usuarios/nuevo` | Crear usuario |
| `/admin/usuarios/:run/editar` | Editar usuario |

## Usuarios de prueba

Los usuarios iniciales están en `src/data/usuarios.ts`. Por ejemplo:

| Correo | Contraseña | Rol |
|---|---|---|
| ana.perez@duoc.cl | admin123 | Administrador |
| carlos.munoz@profesor.duoc.cl | vende123 | Vendedor |

## Pruebas

Las pruebas usan **Vitest** y **Testing Library**, según lo visto en clases. Cubren:

- **Renderizado:** los componentes muestran los datos recibidos.
- **Renderizado condicional:** por ejemplo, los mensajes de error aparecen solo cuando corresponde.
- **Props:** los componentes usan correctamente las propiedades que reciben.
- **Estado:** los formularios actualizan su estado al escribir.
- **Eventos:** los clics y envíos ejecutan la acción esperada.
- **Mocks:** `vi.fn()` para funciones y `vi.spyOn` para `localStorage`.

Para ver la cobertura:

```bash
npm run coverage
```

Después, abre `coverage/index.html` en el navegador.
