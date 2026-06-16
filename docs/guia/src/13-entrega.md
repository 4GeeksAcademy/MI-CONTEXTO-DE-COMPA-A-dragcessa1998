# Capítulo 13. Flujo de trabajo con Git y entrega en 4Geeks

Construir el proyecto de Nexova es la mitad del trabajo. La otra mitad es **entregarlo bien**: tenerlo versionado en un repositorio, organizado por hitos y presentado en la plataforma de 4Geeks de forma que un revisor pueda evaluarlo en pocos minutos. Este capítulo cierra el círculo. Verás cómo se gestiona el código con Git (el sistema de control de versiones que registra cada cambio que haces), cómo se conecta tu máquina con el repositorio remoto mediante SSH, cómo se organizan las ramas por hito sobre la rama `main` unificada y, sobre todo, cómo se entrega cada hito mediante un *Pull Request* (solicitud de incorporación de cambios) enlazado en la plataforma del curso.

En este capítulo aprenderás:

- Qué es un **fork** del repositorio de 4GeeksAcademy y por qué tu trabajo vive ahí.
- Cómo autenticarte con **SSH** (sin escribir tu contraseña en cada `push`).
- El ciclo diario de Git: editar, `git add`, `git commit`, `git push`.
- Cómo se relacionan las **ramas por hito** con la rama `main` que reúne el proyecto completo.
- Por qué la entrega es por **Pull Request** abierto desde la web (porque `gh` no está instalado).
- Una **checklist de entrega** por hito, con las capturas concretas del Supplier Directory.
- Cómo escribir **mensajes de commit** que un revisor agradezca.

## El fork: tu copia del repositorio del curso

Un **repositorio** es la carpeta de tu proyecto bajo control de versiones: contiene los archivos y, además, todo el historial de cómo llegaron a su estado actual. En 4Geeks no trabajas directamente sobre el repositorio de la academia; trabajas sobre un **fork**, que es una copia personal alojada en GitHub bajo el espacio de la organización. En este proyecto el fork es privado y se llama:

```
4GeeksAcademy/MI-CONTEXTO-DE-COMPA-A-dragcessa1998
```

Ese nombre coincide con el de la carpeta local del proyecto (`MI-CONTEXTO-DE-COMPA-A-dragcessa1998-main`). El fork es donde subes tu trabajo y desde donde se evalúa: el revisor abre tu repositorio, mira el código y revisa los Pull Requests.

::: {.callout .note}
**Nota:** "subir" en Git se dice *push*, y "remoto" (*remote*) es el repositorio en la nube (GitHub) frente a tu copia local. Cuando se dice "empuja a `origin`", `origin` es el nombre estándar del remoto principal.
:::

## Autenticación por SSH

Para que tu máquina pueda escribir en el fork sin pedirte la contraseña en cada operación, este proyecto usa **SSH** (*Secure Shell*), un protocolo que autentica con un par de claves: una **privada** que nunca sale de tu ordenador y una **pública** que registras en GitHub. La clave de este proyecto es de tipo Ed25519 y vive en `~/.ssh/id_ed25519` (privada) y `~/.ssh/id_ed25519.pub` (pública).

La configuración real de `~/.ssh/config` que hace funcionar todo es:

```text
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  AddKeysToAgent yes
```

La línea `IdentityFile` le dice a SSH qué clave usar al hablar con `github.com`, y `AddKeysToAgent yes` la añade al agente de claves para no reintroducirla. Por eso el remoto se configura con la forma SSH (`git@github.com:...`) y no con HTTPS. Puedes comprobar que la autenticación funciona con:

```bash
ssh -T git@github.com
```

Si responde con un saludo que incluye tu nombre de usuario, la clave está bien registrada.

::: {.callout .warning}
**Aviso:** nunca subas tu clave privada (`id_ed25519`, sin `.pub`) al repositorio. Tampoco subas archivos `.env` ni secretos. El `AGENTS.md` del proyecto marca como zona protegida cualquier `*/.env` o `*/.env.local`, y el flujo pre-commit obliga a verificar que no se cuela ninguno antes de cada commit.
:::

## El ciclo diario: editar, add, commit, push

El trabajo en Git sigue siempre el mismo patrón de cuatro pasos. Supongamos que has tocado un endpoint del Supplier Directory en `services/api/routes/suppliers.py`.

```bash
# 1. Editas el archivo en tu editor (ya hecho).

# 2. Revisas qué cambió y lo preparas (staging).
git status
git add services/api/routes/suppliers.py

# 3. Confirmas el cambio con un mensaje descriptivo.
git commit -m "feat(api): añade filtro por categoría en GET /suppliers"

# 4. Lo subes al fork.
git push origin <rama-del-hito>
```

El paso `git add` lleva los cambios al **área de preparación** (*staging*): es la lista de lo que entrará en el próximo commit. El `git commit` crea un punto en el historial, con su mensaje. El `git push` envía esos commits al fork en GitHub.

::: {.callout .tip}
**Tip:** antes de hacer `commit`, sigue el flujo pre-commit que define `AGENTS.md`: verifica que el cambio cumple `CONTEXT.md`, ejecuta `npm run typecheck` (o `tsc --noEmit`) en la pieza afectada, asegúrate de que la lógica compartida se **importa** desde `src/` vía el alias `@logic` y no se ha copiado, y actualiza `memory-bank/progress.md`. Un commit que rompe la compilación es un commit que el revisor te devolverá.
:::

## Ramas por hito y la rama `main` unificada

Una **rama** (*branch*) es una línea de trabajo independiente dentro del repositorio. La estrategia del proyecto es sencilla y eficaz:

- **`main`** es la rama unificada: contiene el **proyecto completo**, todos los hitos integrados. Es el estado "oficial" que un revisor ve al entrar al repositorio. El monorepo de Nexova reúne aquí la web pública, la lógica de negocio en `src/`, el backoffice y las APIs.
- **Una rama por hito** para el trabajo en curso. Cada hito (Hito 0 a Hito 4, más el Supplier Directory) se desarrolla en su propia rama, y cuando está listo se integra a `main` mediante un Pull Request.

El `AGENTS.md` lo deja explícito en su paso de "Higiene y entrega": *trabaja en una rama de hito y entrega por Pull Request hacia `main`*. Crear una rama de hito es:

```bash
git switch -c hito-supplier-directory
# ...trabajas, haces commits...
git push -u origin hito-supplier-directory
```

La opción `-u` (de *upstream*) enlaza tu rama local con la remota, de modo que en adelante basta con `git push`.

::: {.callout .important}
**Importante:** mantén separado el trabajo de cada hito. El `AGENTS.md` marca como zona protegida el "código de hitos ya entregados en otras apps de `uis/` o `services/` que no sea el objeto de la tarea actual". Si estás en el Hito 3 (`uis/talent-pipeline-tracker`), no toques de paso el backoffice del Hito 4.
:::

## La entrega: Pull Request desde la web

Aquí está la pieza clave del flujo de 4Geeks. La **entrega de cada hito se hace por Pull Request**. Un Pull Request (PR) es una propuesta de fusionar los cambios de una rama (la del hito) hacia otra (`main`); además de fusionar código, es el lugar donde queda documentado y revisado el trabajo.

En muchos proyectos se abre con la herramienta de línea de comandos `gh` (`gh pr create`). **En esta máquina `gh` no está instalado** (se verifica con `which gh`, que responde "gh not found"). Por tanto, el PR se abre **desde la interfaz web de GitHub**:

1. Haz `git push` de tu rama de hito al fork.
2. Entra a `https://github.com/4GeeksAcademy/MI-CONTEXTO-DE-COMPA-A-dragcessa1998` en el navegador. GitHub detecta la rama recién subida y muestra un botón **"Compare & pull request"**.
3. Elige `base: main` y `compare: <tu-rama-de-hito>`, escribe un título y una descripción claros, y crea el PR.
4. Copia la **URL del Pull Request** y pégala en el campo de entrega del hito **en la plataforma de 4Geeks**.

La plataforma del curso no recibe el código directamente: recibe el **enlace** a tu repositorio o a tu PR, y desde ahí el revisor evalúa.

## Checklist de entrega por hito

Una entrega completa no es solo "el código está subido". Es un paquete que el revisor puede verificar sin pedirte nada. Usa esta checklist como plantilla; el ejemplo está afinado para el **Supplier Directory** (el proyecto oficial "Lightweight Storage API" en `services/api`), que es el que más evidencia visual pide.

| Elemento | Qué entregar |
| --- | --- |
| Repositorio | URL del fork: `https://github.com/4GeeksAcademy/MI-CONTEXTO-DE-COMPA-A-dragcessa1998` |
| Pull Request | URL del PR de la rama del hito hacia `main` |
| Captura 1 | Salida de `uv run seed` (los 15 proveedores cargados) |
| Captura 2 | Filtro funcionando en Swagger UI (`/docs`) |
| Captura 3 | Lista web con el filtro aplicado (`/suppliers` en el backoffice) |

Las tres capturas se obtienen ejecutando lo siguiente.

**Captura 1 — el seed.** El comando `uv run seed` está declarado como script de consola en `services/api/pyproject.toml` (`seed = "seed:main"`) y carga los 15 proveedores del `CONTEXT.md`. Es **idempotente**: si un proveedor ya existe por nombre, no se duplica.

```bash
cd services/api
uv run seed
```

::: {.callout .warning}
**Aviso (macOS):** en carpetas del Escritorio o de iCloud, el sistema puede marcar `.venv` con el flag `UF_HIDDEN`, y entonces `uv run seed` falla con `ModuleNotFoundError`. La solución es quitar el flag y reintentar:
```bash
chflags -R nohidden .venv
uv run seed
# alternativa equivalente:
uv run python seed.py
```
:::

**Captura 2 — el filtro en Swagger.** Arranca la API y abre la documentación interactiva:

```bash
uv run uvicorn main:app --port 8000   # Swagger UI en http://localhost:8000/docs
```

En `/docs`, despliega `GET /suppliers` y prueba los filtros `?country=Spain` y `?category=job_boards` (definidos en `services/api/routes/suppliers.py`). Captura la respuesta `200` con la lista filtrada.

**Captura 3 — la lista web con filtro.** Con la API en `:8000` y el backoffice levantado (`uis/backoffice`, puerto `:3000`), abre la página `/suppliers`. El `SuppliersView.tsx` ofrece filtros por país y categoría sobre la tabla; aplica uno y captura el resultado, incluyendo la insignia de renovación para contratos a menos de 60 días.

## Buenas prácticas de mensajes de commit

El mensaje de commit es la nota que le dejas a tu yo del futuro y al revisor. Un buen mensaje resume **qué** cambió y **por qué**, en una línea corta y en presente. La convención recomendada es `tipo(ámbito): descripción`:

```bash
git commit -m "feat(suppliers): valida país↔moneda con model_validator de Pydantic"
git commit -m "fix(api): devuelve 422 ante monthly_rate con inf o nan"
git commit -m "feat(backoffice): badge de renovación para contratos a <60 días"
git commit -m "docs(memory-bank): actualiza progress.md tras cerrar el Supplier Directory"
```

Los tipos más útiles son `feat` (funcionalidad nueva), `fix` (corrección), `docs` (documentación), `refactor` (reorganización sin cambio de comportamiento) y `chore` (tareas de mantenimiento). El **ámbito** entre paréntesis (`api`, `suppliers`, `backoffice`) ubica el cambio en el monorepo de un vistazo.

::: {.callout .tip}
**Tip:** un commit, una idea. Si tu mensaje necesita un "y" para describir dos cambios sin relación (por ejemplo, "añade filtro y arregla CORS"), probablemente deberían ser dos commits. Eso hace el historial legible y los Pull Requests fáciles de revisar.
:::

Evita mensajes vacíos como "cambios", "wip" o "fix bug": no le dicen nada a quien lee el historial. Y nunca incluyas en el commit archivos de dependencias (`node_modules/`) ni de compilación (`dist/`, `*.tsbuildinfo`): el `.gitignore` del proyecto ya los excluye, junto con `.DS_Store` y los `*.log`.

## Resumen

- Tu trabajo vive en un **fork privado** del repositorio de 4GeeksAcademy; ahí subes el código y desde ahí se evalúa.
- La autenticación es por **SSH** con la clave `~/.ssh/id_ed25519`, configurada en `~/.ssh/config` para `github.com`; así el `push` no pide contraseña.
- El ciclo es siempre **editar → `git add` → `git commit` → `git push`**, precedido del flujo pre-commit de `AGENTS.md` (typecheck, no duplicar lógica, actualizar el banco de memoria).
- Se trabaja en **una rama por hito** y se integra a la rama **`main`** unificada; la entrega de cada hito es un **Pull Request** abierto desde la web de GitHub, porque `gh` no está instalado, y su URL se pega en la plataforma de 4Geeks.
- Cada entrega incluye la URL del repositorio o PR y, para el Supplier Directory, tres capturas: `uv run seed`, el filtro en Swagger (`/docs`) y la lista web filtrada en `/suppliers`.
- Los **mensajes de commit** siguen `tipo(ámbito): descripción`, en presente, una idea por commit, sin subir secretos, `node_modules/` ni artefactos de compilación.