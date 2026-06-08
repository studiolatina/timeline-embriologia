"""
Extrai imagens dos capítulos de Sistema Digestório de Moore (10ª ed.)
e Langman (13ª ed.) e organiza por marco do desenvolvimento.

Moore  — Capítulo 11: Sistema Digestório (pp. 270–305)
           Capítulo 8:  Cavidades, Mesentérios e Diafragma (pp. 191–204) [bolsa omental]
Langman — Capítulo 15: Sistema Digestório (pp. 342–375)
            Capítulo 7:  Tubo Intestinal e Cavidades Corporais (pp. 159–170)
"""

import fitz
import os
import json
from pathlib import Path

# ── Caminhos ──────────────────────────────────────────────────────────────────
MOORE   = Path("/Users/sprioli/Library/Mobile Documents/iCloud~md~obsidian/Documents/Medicina-kb/_bibliography/Clinical Embryology Moore 10th Edition.pdf")
LANGMAN = Path("/Users/sprioli/Library/Mobile Documents/iCloud~md~obsidian/Documents/Medicina-kb/_bibliography/Embriologia Médica - Langman - 13ªEd.pdf")
OUTPUT  = Path("/Users/sprioli/Documents/GitHub/embriologia-assets/sistema-digestorio")

# Resolução para renderização de página inteira
DPI = 180
MIN_IMG_PX = 180   # largura/altura mínima para imagens embutidas

# ── Intervalos de capítulo (páginas PDF, 1-indexed → converter para 0-indexed) ──
CHAPTERS = {
    "moore": [
        (191, 204),   # Cap.8: Cavidades/Mesentérios
        (270, 305),   # Cap.11: Sistema Digestório
    ],
    "langman": [
        (159, 170),   # Cap.7: Tubo Intestinal
        (342, 375),   # Cap.15: Sistema Digestório
    ],
}

# ── Marcos e keywords (buscados dentro das páginas dos capítulos) ─────────────
MILESTONES = [
    {
        "id": "GI-01",
        "nome": "intestino-primitivo",
        "desc": "Formação do Intestino Primitivo (Semana 4, Dia 24)",
        "moore":   ["intestino primitivo", "foregut", "hindgut", "midgut", "tubo intestinal", "dobramento"],
        "langman": ["intestino primitivo", "intestino anterior", "intestino médio", "intestino posterior",
                    "tubo intestinal", "dobramento embrionário"],
    },
    {
        "id": "GI-02",
        "nome": "esofago-estomago-primordios",
        "desc": "Primórdios do Estômago e Esôfago (Semana 4, Dia 26)",
        "moore":   ["estômago", "esôfago", "gástrico", "dilatação fusiforme", "stomach", "esophagus"],
        "langman": ["estômago", "esôfago", "dilatação fusiforme", "intestino anterior esôfago"],
    },
    {
        "id": "GI-03",
        "nome": "diverticulo-hepatico",
        "desc": "Divertículo Hepático — Fígado e Via Biliar (Semana 4, Dia 26)",
        "moore":   ["divertículo hepático", "fígado", "vesícula biliar", "septo transverso",
                    "hepatic diverticulum", "liver", "gallbladder"],
        "langman": ["divertículo hepático", "fígado", "vesícula biliar", "septo transverso",
                    "ducto biliar", "hepatócitos"],
    },
    {
        "id": "GI-04",
        "nome": "broto-pancreatico",
        "desc": "Brotos Pancreáticos — Ventral e Dorsal (Semana 5)",
        "moore":   ["pâncreas", "broto pancreático", "broto ventral", "broto dorsal",
                    "pancreas", "pancreatic bud", "wirsung", "santorini"],
        "langman": ["pâncreas", "broto pancreático", "broto ventral", "broto dorsal",
                    "ducto de Wirsung", "ducto de Santorini", "pâncreas anular", "pâncreas divisum"],
    },
    {
        "id": "GI-05",
        "nome": "septo-traqueoesofagico",
        "desc": "Septação Traqueoesofágica (Semanas 4–5)",
        "moore":   ["septo traqueoesofágico", "traqueoesofágico", "atresia esofágica",
                    "tracheoesophageal", "esophageal atresia", "fístula"],
        "langman": ["septo traqueoesofágico", "atresia esofágica", "fístula traqueoesofágica",
                    "traqueia esôfago", "separação"],
    },
    {
        "id": "GI-06",
        "nome": "rotacao-estomago-bolsa-omental",
        "desc": "Rotação do Estômago e Bolsa Omental (Semana 5)",
        "moore":   ["rotação do estômago", "bolsa omental", "epíploo", "omento",
                    "stomach rotation", "omental bursa", "lesser sac", "greater omentum"],
        "langman": ["rotação do estômago", "bolsa omental", "epíploo maior", "epíploo menor",
                    "omento", "curvatura maior", "curvatura menor"],
    },
    {
        "id": "GI-07",
        "nome": "rotacao-duodeno-fusao-pancreatica",
        "desc": "Rotação do Duodeno e Fusão Pancreática (Semanas 5–7)",
        "moore":   ["rotação duodenal", "duodeno", "pâncreas anular", "fusão pancreática",
                    "duodenal rotation", "annular pancreas"],
        "langman": ["rotação duodenal", "duodeno", "pâncreas anular", "fusão dos brotos",
                    "broto ventral", "rotação do duodeno"],
    },
    {
        "id": "GI-08",
        "nome": "herniacao-umbilical-fisiologica",
        "desc": "Herniação Umbilical Fisiológica (Semana 6)",
        "moore":   ["herniação umbilical", "herniação fisiológica", "onfalocele", "gastrosquise",
                    "umbilical herniation", "omphalocele", "gastroschisis", "midgut loop"],
        "langman": ["herniação umbilical", "herniação fisiológica", "onfalocele", "gastrosquise",
                    "alça umbilical", "retorno das alças"],
    },
    {
        "id": "GI-09",
        "nome": "divisao-cloaca",
        "desc": "Divisão da Cloaca — Septo Uroretal (Semana 7)",
        "moore":   ["cloaca", "septo uroretal", "membrana cloacal", "ânus imperfurado",
                    "urorectal septum", "cloacal membrane", "imperforate anus", "anorectal"],
        "langman": ["cloaca", "septo uroretal", "membrana cloacal", "ânus imperfurado",
                    "malformações anorretais", "seio urogenital"],
    },
    {
        "id": "GI-10",
        "nome": "recanalizacao-esofago-duodeno",
        "desc": "Recanalização do Esôfago e Duodeno (Semana 8)",
        "moore":   ["recanalização", "atresia duodenal", "dupla bolha",
                    "recanalization", "duodenal atresia", "double bubble"],
        "langman": ["recanalização", "atresia duodenal", "dupla bolha",
                    "obliteração", "vacuolização"],
    },
    {
        "id": "GI-11",
        "nome": "canal-anal-linha-pectinea",
        "desc": "Canal Anal e Linha Pectínea (Semanas 7–8)",
        "moore":   ["linha pectínea", "canal anal", "proctodeu", "pectinate line",
                    "anal canal", "proctodeum", "dentate line"],
        "langman": ["linha pectínea", "canal anal", "proctodeu", "linha denteada",
                    "ectoderma anal", "endoderma anal"],
    },
    {
        "id": "GI-12",
        "nome": "retorno-alcas-270-graus",
        "desc": "Retorno das Alças Intestinais — 270° (Semana 10)",
        "moore":   ["rotação intestinal", "270", "má-rotação", "vólvulo", "ceco",
                    "intestinal rotation", "malrotation", "volvulus", "cecum", "Ladd", "Meckel"],
        "langman": ["rotação intestinal", "270", "má-rotação", "vólvulo", "ceco",
                    "divertículo de Meckel", "bandas de Ladd", "retorno das alças"],
    },
    {
        "id": "GI-13",
        "nome": "funcoes-hepaticas-fetais",
        "desc": "Funções Hepáticas Fetais — Eritropoiese + Bile (Semanas 10–13)",
        "moore":   ["eritropoiese", "hematopoiese", "bile", "fígado fetal",
                    "hematopoiesis", "fetal liver", "bile synthesis"],
        "langman": ["eritropoiese hepática", "hematopoiese hepática", "síntese de bile",
                    "fígado fetal", "mecônio"],
    },
    {
        "id": "GI-14",
        "nome": "maturacao-funcional-fetal",
        "desc": "Maturação Funcional Fetal do Sistema Digestório (Semanas 16–38)",
        "moore":   ["mecônio", "Hirschsprung", "aganglionose", "deglutição fetal",
                    "meconium", "aganglionic", "fetal swallowing"],
        "langman": ["mecônio", "Hirschsprung", "aganglionose", "deglutição fetal",
                    "doença de Hirschsprung", "maturação digestiva"],
    },
]

# ── Funções auxiliares ────────────────────────────────────────────────────────

def get_chapter_pages(pdf_path: Path, ranges: list[tuple]) -> list[int]:
    """Retorna lista de índices de página (0-based) dentro dos intervalos informados."""
    pages = []
    for start, end in ranges:
        # TOC usa 1-based; converter para 0-based
        pages.extend(range(start - 1, end))
    return pages

def score_page(doc: fitz.Document, page_idx: int, keywords: list[str]) -> int:
    """Pontua uma página pelo número de keywords encontradas no texto."""
    text = doc[page_idx].get_text().lower()
    return sum(1 for kw in keywords if kw.lower() in text)

def extract_embedded_images(doc: fitz.Document, page_idx: int,
                             out_dir: Path, prefix: str) -> list[str]:
    """Extrai imagens embutidas maiores que MIN_IMG_PX. Retorna caminhos salvos."""
    saved = []
    for img_idx, img_info in enumerate(doc[page_idx].get_images(full=True)):
        xref = img_info[0]
        try:
            base = doc.extract_image(xref)
        except Exception:
            continue
        if base["width"] < MIN_IMG_PX or base["height"] < MIN_IMG_PX:
            continue
        ext  = base["ext"]
        path = out_dir / f"{prefix}_p{page_idx+1}_img{img_idx+1}.{ext}"
        with open(path, "wb") as f:
            f.write(base["image"])
        saved.append(str(path))
    return saved

def render_page(doc: fitz.Document, page_idx: int,
                out_dir: Path, prefix: str) -> str:
    """Renderiza a página inteira como PNG de referência."""
    mat  = fitz.Matrix(DPI / 72, DPI / 72)
    pix  = doc[page_idx].get_pixmap(matrix=mat)
    path = out_dir / f"{prefix}_p{page_idx+1}_pagina.png"
    pix.save(str(path))
    return str(path)

# ── Processamento principal ───────────────────────────────────────────────────

def process_milestone(milestone: dict) -> dict:
    mid   = milestone["id"]
    nome  = milestone["nome"]
    out_dir = OUTPUT / f"{mid}_{nome}"
    out_dir.mkdir(exist_ok=True)

    print(f"\n{'─'*60}")
    print(f"  {mid} | {milestone['desc']}")
    print(f"{'─'*60}")

    result = {"id": mid, "nome": nome, "desc": milestone["desc"], "arquivos": []}

    for pdf_path, keyword_key, label, ranges in [
        (MOORE,   "moore",   "moore",   CHAPTERS["moore"]),
        (LANGMAN, "langman", "langman", CHAPTERS["langman"]),
    ]:
        if not pdf_path.exists():
            print(f"  ⚠  {label}: arquivo não encontrado")
            continue

        keywords    = milestone[keyword_key]
        all_pages   = get_chapter_pages(pdf_path, ranges)

        doc = fitz.open(pdf_path)

        # Pontua cada página do capítulo
        scored = []
        for pg in all_pages:
            if pg < len(doc):
                s = score_page(doc, pg, keywords)
                imgs = doc[pg].get_images()
                scored.append((pg, s, len(imgs)))

        # Separa páginas com imagens das sem imagens
        with_imgs = [(pg, s, n) for pg, s, n in scored if n > 0]
        no_imgs   = [(pg, s, n) for pg, s, n in scored if n == 0]

        # Prioridade: páginas com imagens + score > 0, ordenadas por score desc
        candidates = sorted(
            [(pg, s, n) for pg, s, n in with_imgs if s > 0],
            key=lambda x: (-x[1], -x[2])
        )
        # Fallback: páginas SÓ com texto relevante (score > 0, sem imagens embutidas)
        text_only = sorted(
            [(pg, s) for pg, s, n in no_imgs if s > 0],
            key=lambda x: -x[1]
        )

        print(f"\n  📖 {label.upper()} ({pdf_path.name})")
        if not candidates and not text_only:
            print(f"     Sem páginas relevantes nos capítulos mapeados.")
            # Fallback: pega as 2 primeiras páginas do capítulo digestório com imagens
            fallback = sorted(with_imgs[:5], key=lambda x: -x[2])[:2]
            for pg, _, n in fallback:
                imgs = extract_embedded_images(doc, pg, out_dir, f"{mid}_{label}")
                result["arquivos"].extend(imgs)
                page_png = render_page(doc, pg, out_dir, f"{mid}_{label}")
                result["arquivos"].append(page_png)
                print(f"     📄 fallback p.{pg+1}: {n} imagens + página renderizada")
        else:
            # Extrai das 3 páginas com melhor pontuação + imagens
            top = candidates[:3]
            if len(top) < 2 and text_only:
                # Complementa com renderização de páginas texto-relevantes
                top_text = text_only[:2]
                for pg, s in top_text:
                    page_png = render_page(doc, pg, out_dir, f"{mid}_{label}_texto")
                    result["arquivos"].append(page_png)
                    print(f"     📝 p.{pg+1} (score={s}): página de texto renderizada")

            for pg, s, n_imgs in top:
                imgs = extract_embedded_images(doc, pg, out_dir, f"{mid}_{label}")
                if imgs:
                    result["arquivos"].extend(imgs)
                    print(f"     ✅ p.{pg+1} (score={s}): {len(imgs)} imagem(ns) extraída(s)")
                else:
                    # Página tem imagens embutidas não extraíveis → renderiza
                    page_png = render_page(doc, pg, out_dir, f"{mid}_{label}")
                    result["arquivos"].append(page_png)
                    print(f"     📄 p.{pg+1} (score={s}): página renderizada ({n_imgs} imgs embutidas)")

        doc.close()

    n = len(result["arquivos"])
    print(f"\n  → {n} arquivo(s) salvo(s) em {out_dir.name}/")
    return result


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)

    print("╔══════════════════════════════════════════════════════════╗")
    print("║  EXTRATOR — SISTEMA DIGESTÓRIO | Moore + Langman        ║")
    print("╚══════════════════════════════════════════════════════════╝")

    all_results = []
    for ms in MILESTONES:
        res = process_milestone(ms)
        all_results.append(res)

    # Salva índice
    index = OUTPUT / "INDEX.json"
    with open(index, "w", encoding="utf-8") as f:
        json.dump(all_results, f, ensure_ascii=False, indent=2)

    total = sum(len(r["arquivos"]) for r in all_results)
    print("\n╔══════════════════════════════════════════════════════════╗")
    print(f"║  CONCLUÍDO — {total} arquivo(s) extraído(s)              ")
    print(f"║  Pasta: {OUTPUT}")
    print(f"║  Índice: {index}")
    print("╚══════════════════════════════════════════════════════════╝")


if __name__ == "__main__":
    main()
