# Natalia & Emmanuel — Invitación de boda · Versión 2

Invitación digital Next.js para la boda de **Natalia Nava y Emmanuel Hernández**, el **sábado 13 de febrero de 2027**. Diseño elegante floral en dusty blue, azul polvo, marfil y gris suave. Cinco páginas independientes y animaciones discretas.

**Proyecto exclusivo:** GitHub `emmanuel-nava359/boda-natalia`, un futuro proyecto nuevo de Vercel y una futura base de datos nueva de Supabase. No modifica ni comparte configuración con el MVP de QFR.

## 1. Ejecutar localmente (Windows 11 / PowerShell)

Abre la carpeta donde están `package.json`, `app` y `public`. Haz clic en la barra de direcciones del Explorador de Windows, escribe `powershell` y pulsa Enter.

```powershell
npm install
npm run dev
```

Visita http://localhost:3000. Si ese puerto está ocupado, sigue la dirección indicada por Next.js. Para detenerlo, `Ctrl+C`.

Necesitas Node.js 20 o superior (preferentemente Node.js 22 LTS).

## 2. Añadir las tres fotos de Natalia y Emmanuel

Dentro del proyecto encontrarás **`public/Nat_Emma(1)/`**. Coloca las fotos de la pareja **en esa carpeta** con los nombres:

```text
public/
└── Nat_Emma(1)/
    ├── 1.jpg
    ├── 2.jpg
    └── 3.jpg
```

También sirven `.jpeg`, `.png` o `.webp`, manteniendo los números `1`, `2` y `3`. Si ya tenías la carpeta `Nat_Emma(1)`, copia sus tres fotografías allí. No es necesario modificar el código. Si la página estaba abierta, recárgala; si no detecta las fotos, detén y vuelve a iniciar `npm run dev`.

El carrusel es **automático**: cambia de foto cada **5.6 segundos**, con un fundido suave. No muestra flechas ni exige interacción manual. Respeta la preferencia de movimiento reducido del sistema.

**Importante:** el ZIP incluye el espacio y la lógica para las fotos, pero **no incluye imágenes de la pareja si llegaron pegadas en el chat sin archivos descargables originales**. Los archivos numerados deben estar en `public/Nat_Emma(1)/`.

## 3. Editar la información de la boda

Edita `lib/wedding.ts`. Ya incluye los nombres completos de los novios, sus padres, la fecha, El Mesón de San Pablo y la dirección. La recepción de **4:30 p. m.** está indicada como *tentativa*. La ceremonia y la mesa de regalos están marcadas como pendientes. El código de vestimenta indica que se eviten los blancos y marfiles, sin imponer otra gama.

## 4. Estructura

- `/` · Portada, carrusel, cuenta regresiva.
- `/nuestra-historia` · Historia y padres de ambos.
- `/el-evento` · Lugar, hora tentativa, ceremonia, vestimenta.
- `/confirmacion` · RSVP (pendiente de conectar la base).
- `/recuerdos` · Carrusel y galería para invitados (pendiente de conectar almacenamiento).

## 5. Supabase: todavía no conectado

Por seguridad, los formularios estarán **deshabilitados** hasta que creemos y conectemos una base **nueva**, independiente de las demás. El proyecto ya incluye `supabase/schema.sql`, `/api/rsvp` y `/api/photos`, pero no aloja ni guarda datos reales en modo de vista previa.

Cuando se configure un proyecto propio de Supabase, agregar variables en el servidor de Vercel, **no** en el navegador ni en GitHub:

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
PHOTO_UPLOAD_ACCESS_CODE=
```

Las fotos subidas por invitados pasarán primero por moderación y sólo se mostrarán si se aprueban. Antes de abrir la galería públicamente hay que agregar protección antispam y rate limiting.

## 6. Publicación, sólo después de aprobar el diseño

Subiremos el código exclusivamente a `https://github.com/emmanuel-nava359/boda-natalia`, crearemos un nuevo proyecto Vercel desde ese repositorio y posteriormente una nueva base Supabase. La invitación se puede mantener en los planes gratuitos mientras no se superen sus cuotas.

## Paleta

| Uso | Hex |
| --- | --- |
| Marfil cálido | `#F7F5EF` |
| Azul polvo | `#BED0DB` |
| Dusty blue | `#90A9BB` |
| Azul gris | `#A3B1C2` |
| Verde salvia suave | `#A9B8B2` |
| Champagne taupe | `#B5A89B` |
| Azul profundo | `#415B70` |

Tipografías: **Great Vibes**, **Cormorant Garamond**, **DM Sans** (Google Fonts: la fuente requiere internet la primera vez).
