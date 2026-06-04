# Cómo ejecutar el proyecto (Hito 1 — Web)

Sitio web público de **Nexova**: landing page + formulario de registro de talento con validación en JavaScript. HTML5 semántico, Tailwind CSS (Play CDN), Schema.org, responsive y accesible.

## Ejecutar en local / Codespaces

Desde la raíz del repositorio:

```bash
npx http-server . -p 3000 -a 0.0.0.0
```

Luego abre `http://localhost:3000` (en Codespaces, usa el puerto reenviado que aparece en la pestaña **Ports**).

> Alternativa sin Node: `python3 -m http.server 3000`

## Estructura

```
/
├── index.html        # Landing page (hero, servicios, por qué Nexova, contacto)
├── application.html  # Formulario de registro de talento
├── validation.js     # Validación del formulario (tiempo real + envío simulado)
└── CONTEXT.md        # Contexto de empresa del Hito 1 (datos, campos y validaciones)
```

## Qué probar

- Redimensiona la ventana (móvil / tablet / escritorio): el diseño es responsive *mobile-first*.
- En `application.html`, envía el formulario vacío: deben aparecer mensajes de error específicos por campo.
- Comprueba el contador de caracteres de *Comentarios* (máx. 500) y el botón **Limpiar formulario**.
- Con todos los campos válidos, al enviar aparece el mensaje de éxito (envío simulado, sin backend).
