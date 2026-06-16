#!/usr/bin/env python3
"""Ensambla la guía-libro: src/*.md + divisores de parte -> pandoc -> guide.html.

Uso:  python3 build.py
Requisitos: pandoc. Después, renderiza guide.html a PDF con Google Chrome (ver README).
"""
import base64, pathlib, subprocess, sys

BASE = pathlib.Path(__file__).resolve().parent
SRC = BASE / "src"
ASSETS = BASE / "assets"

def datauri(name, mime):
    b = base64.b64encode((ASSETS / name).read_bytes()).decode()
    return f"data:{mime};base64,{b}"

LOGO4G = datauri("4geeks-logo.png", "image/jpeg")
BANNER = datauri("nexova.png", "image/png")

PARTS = {
    "I":   ("Parte I", "Fundamentos", "Los cimientos: qué estás construyendo, los conceptos que necesitas y cómo dejar el entorno listo. Pensado para quien empieza desde cero."),
    "II":  ("Parte II", "Construyendo Nexova, hito a hito", "Recorremos el proyecto real pieza a pieza: de la web pública a la lógica de scoring, las apps Next.js y las dos APIs."),
    "III": ("Parte III", "De usuario a experto", "Operar el sistema completo, entender la arquitectura y sus decisiones, cuidar la calidad y dominar el flujo de entrega."),
    "AP":  ("Apéndices", "Referencia", "Material de consulta rápida: comandos, glosario y el mapa completo del repositorio."),
}

ORDER = [
    ("sec", "00-prefacio"),
    ("part", "I"),
    ("sec", "01-que-es"), ("sec", "02-conceptos"), ("sec", "03-entorno"),
    ("part", "II"),
    ("sec", "04-hito01"), ("sec", "05-hito2"), ("sec", "06-hito3"),
    ("sec", "07-hito4"), ("sec", "08-talent-api"), ("sec", "09-supplier"),
    ("part", "III"),
    ("sec", "10-operar"), ("sec", "11-arquitectura"), ("sec", "12-calidad"), ("sec", "13-entrega"),
    ("part", "AP"),
    ("sec", "apA-comandos"), ("sec", "apB-glosario"), ("sec", "apC-mapa"),
]

def part_divider(code):
    kicker, title, desc = PARTS[code]
    return (
        '\n```{=html}\n'
        f'<section class="part">\n'
        f'  <div class="pnum">{kicker}</div>\n'
        f'  <div class="prule"></div>\n'
        f'  <div class="ptitle">{title}</div>\n'
        f'  <div class="pdesc">{desc}</div>\n'
        f'</section>\n'
        '```\n\n'
    )

chunks, missing = [], []
for kind, k in ORDER:
    if kind == "part":
        chunks.append(part_divider(k))
    else:
        f = SRC / (k + ".md")
        if not f.exists():
            missing.append(k); chunks.append(f"\n# (FALTA: {k})\n")
        else:
            chunks.append("\n" + f.read_text().strip() + "\n")
if missing:
    print("AVISO: faltan secciones:", missing, file=sys.stderr)

(BASE / "master.md").write_text("\n".join(chunks))

cover = f'''<section class="cover">
  <img class="logo4g" src="{LOGO4G}" alt="4Geeks Academy">
  <div class="kicker">Proyecto de Compañía · AI Engineering</div>
  <h1 class="title">Nexova</h1>
  <div class="subtitle">De 0 a Experto — Guía profesional del monorepo full-stack con IA: arquitectura, código y operación, paso a paso</div>
  <img class="banner" src="{BANNER}" alt="Nexova — AI Engineering Company Project">
  <div class="byline">
    Elaborado por <strong>Dragcessa1998</strong><br>
    <span class="role">Estudiante del programa AI Engineering · 4Geeks Academy · junio de 2026</span>
  </div>
</section>'''

colophon = '''<section class="colophon">
  <h2>Sobre esta guía</h2>
  <div class="rule"></div>
  <p><strong>Nexova — Guía profesional de 0 a Experto</strong> documenta de principio a fin el Proyecto de
  Compañía del programa <em>AI Engineering</em> de 4Geeks Academy: un monorepo full-stack que reúne la web
  pública, la lógica de negocio en TypeScript, los paneles internos en Next.js y dos APIs (FastAPI y Express).</p>
  <p>Está escrita para que cualquier persona —incluso sin experiencia previa en programación— pueda entender el
  proyecto, ejecutarlo y, capítulo a capítulo, alcanzar un dominio experto de su arquitectura.</p>
  <p>La obra sigue la estructura editorial de los libros técnicos de O'Reilly: prefacio, partes temáticas,
  capítulos con recuadros de apoyo (<em>Tip</em>, <em>Nota</em>, <em>Aviso</em> e <em>Importante</em>),
  listados de código reales tomados del repositorio y apéndices de referencia.</p>
  <p style="margin-top:8mm;color:#90a0ae;font-size:9pt">Logotipo de 4Geeks Academy © 4Geeks Academy. Documento
  generado para uso académico. Todos los nombres de producto pertenecen a sus respectivos propietarios.</p>
</section>'''

raw = BASE / "guide.raw.html"
cmd = [
    "pandoc", str(BASE / "master.md"),
    "--from", "markdown", "--to", "html5",
    "--template", str(BASE / "template.html"),
    "--toc", "--toc-depth=1",
    "--highlight-style", "tango",
    "--standalone",
    "-o", str(raw),
]
print("Ejecutando pandoc...", file=sys.stderr)
subprocess.run(cmd, check=True)

html = raw.read_text().replace("@@COVER@@", cover).replace("@@COLOPHON@@", colophon)
(BASE / "guide.html").write_text(html)
raw.unlink(missing_ok=True)
print("HTML final:", BASE / "guide.html", len(html), "bytes")
