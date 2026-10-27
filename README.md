# VertexRP Studio

Landing page de VertexRP Studio, modelos 3D para servidores de FiveM y RedM. HTML, CSS y JavaScript nativos, sin dependencias. Un script de build une los partials HTML y deja el sitio listo en `dist/`.

## Estructura

```
vertexrp-studio/
├── src/
│   ├── index.html            Esqueleto de la página (head y lista de partials)
│   ├── partials/             Una sección por archivo: header, hero, catalog, process, proof, faq, request, footer
│   ├── css/
│   │   ├── main.css          Punto de entrada, importa todo en orden
│   │   ├── base/             tokens (colores, tipografía, tema oscuro), reset, utilities
│   │   ├── layout/           container, header, section, footer, responsive
│   │   ├── components/       button, form, summary, result
│   │   └── sections/         hero, catalog, process, proof, faq, request
│   └── js/
│       ├── main.js           Punto de entrada, inicia los módulos
│       ├── config.js         Claves públicas de Supabase
│       ├── modules/          product-swatches, order-summary, order-form
│       ├── services/         supabase (acceso a la base de datos)
│       └── utils/            dom, clipboard
├── public/                   Se copia tal cual a la raíz del sitio (favicon, robots.txt)
├── supabase/setup.sql        Tabla y políticas de seguridad de la base de datos
├── build.js                  Une partials y copia archivos a dist/
├── netlify.toml, vercel.json Configuración de despliegue
└── dist/                     Resultado del build (no se sube a GitHub)
```

## Trabajar en local

Requiere Node 18 o superior.

```
npm run dev
```

Construye el sitio y lo sirve en una dirección local. Después de cambiar un archivo de `src/`, vuelve a ejecutar el comando. Abrir `dist/index.html` con doble clic no funciona, porque el JavaScript usa módulos y necesita un servidor.

## Publicar en Netlify o Vercel

1. Sube la carpeta completa a un repositorio de GitHub (`dist/` no hace falta, el `.gitignore` la excluye).
2. Netlify: Add new site, Import from Git. Vercel: Add New, Project.
3. Elige el repositorio. La configuración ya está en `netlify.toml` y `vercel.json` (build: `npm run build`, publicar: `dist`). No cambies nada.
4. Cada cambio que subas a GitHub se publica solo.

## Cómo agregar cosas

- **Nueva sección:** crea `src/partials/nombre.html`, agrégala con `<!-- @include partials/nombre.html -->` en `src/index.html`, y crea `src/css/sections/nombre.css` importado desde `main.css`.
- **Nuevo componente de estilo:** archivo nuevo en `src/css/components/` e `@import` en `main.css`.
- **Nuevo comportamiento:** módulo en `src/js/modules/` que exporte una función `initAlgo()`, y llámala desde `main.js`.
- **Colores o tipografía:** solo en `src/css/base/tokens.css`.
- **Nueva página (por ejemplo, términos):** `src/terminos.html`; amplía `build.js` para procesarla, o conserva el mismo patrón de includes.

## Formulario conectado a Supabase

1. En supabase.com crea un proyecto.
2. En SQL Editor pega el contenido de `supabase/setup.sql` y pulsa Run.
3. En Project Settings, API, copia la Project URL y la clave `anon public`.
4. Pégalas en `src/js/config.js` y sube el cambio a GitHub.
5. Envía una solicitud de prueba y revisa Table Editor, solicitudes.

Sin las claves, el formulario sigue funcionando: prepara el texto para copiarlo y enviarlo por mensaje directo.

Seguridad: la clave `anon` es pública por diseño. Las políticas de `setup.sql` solo permiten insertar solicitudes, no leerlas. No pegues nunca la clave `service_role` en este proyecto.

Privacidad: la tabla guarda el usuario de Discord del cliente. Úsalo solo para atender el encargo.

## Pendientes conocidos

- Reemplazar la ilustración de malla de la portada por un render de Blender.
- Subida de archivos de referencia (hoy se envían por mensaje directo). Se puede agregar con Supabase Storage.
- Los precios son de referencia.

Prototipo académico del curso IS-501 Emprendedores.
