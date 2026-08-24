# IIA Hub

Página interna para estudiantes de Ingeniería en Inteligencia Artificial: plan de estudios, correlativas, calendario, PPS, intercambios, novedades y recursos útiles.

Es un sitio estático hecho con **Jekyll**, pensado para publicarse gratis con **GitHub Pages** sin necesidad de instalar nada ni correr un build manual: GitHub lo compila solo.

## Estructura

```
iia-web/
├── _config.yml            # configuración del sitio (título, etc)
├── _layouts/default.html  # plantilla base (sidebar + header + footer)
├── _includes/nav.html     # menú de navegación (un solo lugar para editarlo)
├── _data/
│   ├── materias.yml           # plan de estudios: materias, códigos, correlativas
│   ├── optativas.yml          # listado de materias optativas pre-aprobadas
│   └── incompatibilidades.yml # incompatibilidades de horario para recursantes
├── assets/css/styles.css
├── assets/js/main.js
├── index.html              # Inicio
├── plan-de-estudios.html
├── recursada.html
├── calendario.html
├── faq.html
├── pps.html
├── intercambios.html
├── novedades.html
└── recursos.html
```

Las tablas de **Plan de estudios** y **Si recursás una materia** se generan automáticamente a partir de los archivos en `_data/`. Para actualizarlas, alcanza con editar esos `.yml` — no hace falta tocar el HTML.

## Cómo publicarlo en GitHub Pages (paso a paso)

1. **Creá el repositorio en GitHub**
   - Andá a [github.com/new](https://github.com/new), elegí un nombre (ej: `iia-hub`) y creálo (puede ser público o privado — con privado hace falta un plan de pago para Pages).

2. **Subí este código**
   Desde la carpeta `iia-web/`:
   ```bash
   cd iia-web
   git init
   git add .
   git commit -m "Primera versión del sitio IIA Hub"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```

3. **Activá GitHub Pages**
   - En el repo, andá a **Settings → Pages**.
   - En "Build and deployment" → **Source**, elegí **Deploy from a branch**.
   - Elegí la branch **main** y la carpeta **/ (root)**.
   - Guardá. En unos minutos el sitio va a estar publicado en:
     `https://TU-USUARIO.github.io/TU-REPO/`

4. **Ajustá el `baseurl`**
   - Abrí `_config.yml` y poné en `baseurl` el nombre del repo con una barra adelante, ej: `baseurl: "/iia-hub"`.
   - Hacé commit y push de ese cambio para que todos los links internos funcionen bien.

   > Si en cambio publicás en un repo que se llama `TU-USUARIO.github.io` (sitio de usuario), dejá `baseurl: ""` tal como está.

5. **Listo.** Cada vez que hagas push a `main`, GitHub recompila el sitio automáticamente (tarda 1-2 minutos).

## Cómo editar contenido sin tocar código

- **Materias y correlativas**: editar `_data/materias.yml`.
- **Optativas**: editar `_data/optativas.yml`.
- **Incompatibilidades de recursada**: editar `_data/incompatibilidades.yml` (ver la skill `horarios-iia` para recalcularlas si cambia la programación de horarios).
- **Texto de cualquier página**: abrir el `.html` correspondiente y editar el texto normal (todo lo que está fuera de las etiquetas Liquid `{% %}` es texto plano/HTML).
- **Menú de navegación**: `_includes/nav.html`.
- **Colores y estilo**: `assets/css/styles.css` (las variables están arriba de todo, en `:root`).

## Contenido pendiente

Varias páginas quedaron con recuadros marcados **"📌 Para completar"** porque no teníamos la info real al armar el sitio (fechas del calendario académico, contactos de Recursos útiles, links de redes sociales, contenido de PPS y del FAQ). Buscá `todo` en el código o el emoji 📌 para encontrarlos todos.

## Probarlo en tu computadora (opcional)

Si querés ver el sitio localmente antes de publicarlo, necesitás Ruby y Jekyll instalados:

```bash
gem install bundler jekyll
bundle init
bundle add jekyll
bundle exec jekyll serve
```

Y abrís `http://localhost:4000` en el navegador. Esto es opcional — GitHub Pages compila el sitio automáticamente sin que hagas nada de esto.
