# Plan: Fill [Placeholder] content in EVENTS array

## Context

The app (`src/app/App.tsx`) is an interactive embryology timeline. All 10 events in the `EVENTS` array have `[Placeholder]` text in their `mainEvent`, `question`, and `explanation` fields. The user has provided a rich markdown file (`src/imports/Embrioge_nese_do_sistema_digesto_rio.md`) with accurate, detailed embryology content. The task is to replace every `[Placeholder]` string with real content drawn from the markdown and standard embryology knowledge.

## Mapping: App events → Markdown content

| App event id       | App code | Topic                             | Markdown source              |
| ------------------ | -------- | --------------------------------- | ---------------------------- |
| `fecundacao`       | GI-01    | Fecundação (week 1)               | General embryology (pre-MD)  |
| `bilaminar`        | GI-02    | Disco bilaminar (week 2)          | General embryology (pre-MD)  |
| `trilaminar`       | GI-03    | Disco trilaminar / gastrulação    | General embryology (pre-MD)  |
| `dobramento`       | GI-04    | Dobramento embrionário            | MD GI-01                     |
| `tressegmentos`    | GI-05    | Três segmentos / suprimento       | MD "Estrutura Geral"         |
| `rotacao`          | GI-06    | Rotação do Estômago               | MD GI-06                     |
| `recanalizacao`    | GI-07    | Rotação do Duodeno + Pâncreas     | MD GI-07                     |
| `atresibiliar`     | GI-08    | Atresia Biliar (clínica)          | MD GI-03 + clinical context  |
| `hernia`           | GI-09    | Hérnia Umbilical Fisiológica      | MD GI-08                     |
| `cloaca`           | GI-10    | Divisão da Cloaca + Linha Pectínea| MD GI-09 + GI-11             |

## What to change

**File:** `src/app/App.tsx` — only the `EVENTS` array.

For each event, replace `[Placeholder]` in:
- `mainEvent` — 1–2 sentence summary of the embryological event
- `question` — a clear MCQ question testing the key concept
- `explanation` — concise explanation of why the correct answer is right

The `development` bullet arrays and `options` arrays are already correct (no `[Placeholder]`).

## Replacement content (per event)

### fecundacao
- **mainEvent:** "A fecundação do oócito secundário pelo espermatozoide completa a meiose II e origina o zigoto diplóide (2n), marcando o início do desenvolvimento embrionário."
- **question:** "Qual estrutura é formada imediatamente após a fecundação?"
- **explanation:** "A fecundação origina o zigoto (2n). A mórula forma-se ~D4 por clivagem, e o blastocisto ~D5."

### bilaminar
- **mainEvent:** "O embrioblasto diferencia-se em epiblasto (camada superior) e hipoblasto (camada inferior), formando o disco embrionário bilaminar por volta do dia 8."
- **question:** "O disco bilaminar é formado por quais duas camadas?"
- **explanation:** "Epiblasto + hipoblasto = disco bilaminar (~D8). O trofoblasto forma a placenta, não o disco."

### trilaminar
- **mainEvent:** "A gastrulação (semana 3) forma a linha primitiva: células do epiblasto migram para originar o mesoderma intraembrionário e o endoderma definitivo, estabelecendo o disco trilaminar."
- **question:** "O mesoderma intraembrionário é formado pela migração de células de qual estrutura?"
- **explanation:** "Células do epiblasto migram pela linha e nó primitivos, originando o mesoderma e o endoderma definitivo."

### dobramento
- **mainEvent:** "O dobramento céfalo-caudal e lateral do embrião plano (semana 4) transforma-o em estrutura cilíndrica e incorpora parte do saco vitelínico, originando o intestino primitivo revestido por endoderma."
- **question:** "Qual estrutura é incorporada ao embrião durante o dobramento embrionário para formar o intestino primitivo?"
- **explanation:** "O dobramento incorpora o saco vitelínico; o endoderma do saco reveste o intestino primitivo nascente."

### tressegmentos
- **mainEvent:** "O intestino primitivo subdivide-se em três segmentos definidos pela irrigação arterial: intestino anterior (tronco celíaco), intestino médio (A. mesentérica superior) e intestino posterior (A. mesentérica inferior)."
- **question:** "Qual artéria irriga o intestino médio, que origina o jejuno, íleo e cólon ascendente?"
- **explanation:** "A artéria mesentérica superior irriga o intestino médio. O tronco celíaco irriga o anterior; a A. mesentérica inferior, o posterior."

### rotacao
- **mainEvent:** "O estômago realiza duas rotações simultâneas (semanas 5–7): 90° no sentido horário ao redor do eixo longitudinal, posicionando a grande curvatura à esquerda, e uma segunda rotação que eleva o piloro à direita, formando a bolsa omental."
- **question:** "Após a rotação gástrica de 90° no sentido horário, o nervo vago esquerdo passa a inervar qual face do estômago?"
- **explanation:** "A rotação 90° horária leva o vago esquerdo → nervo gástrico anterior; o vago direito → nervo gástrico posterior."

### recanalizacao
- **mainEvent:** "O duodeno primitivo, ao girar no sentido horário junto com o estômago (semanas 5–7), arrasta o broto pancreático ventral posteriormente, fundindo-o com o broto dorsal. O lúmen duodenal é temporariamente obliterado e recanalizado até a semana 8."
- **question:** "A falha na recanalização do duodeno origina qual malformação clínica, reconhecida pelo sinal da 'dupla bolha' na radiografia?"
- **explanation:** "A fase sólida do duodeno não recanalizada resulta em atresia duodenal — o sinal da dupla bolha reflete estômago e duodeno proximal distendidos."

### atresibiliar
- **mainEvent:** "A atresia biliar é uma obliteração fibro-inflamatória progressiva dos ductos biliares extra-hepáticos que se instala no período pós-natal, levando a colestase neonatal, icterícia obstrutiva e cirrose se não tratada precocemente."
- **question:** "Qual é o tratamento cirúrgico de primeira escolha na atresia biliar neonatal e qual o prazo ideal para realizá-lo?"
- **explanation:** "A portoenterostomia de Kasai deve ser realizada antes dos 60 dias de vida para maximizar o fluxo biliar e retardar a progressão da cirrose."

### hernia
- **mainEvent:** "Na semana 6, o crescimento acelerado do intestino médio supera a capacidade da cavidade abdominal: as alças herniam para o celoma extraembrionário do cordão umbilical e giram 90° anti-horários. Na semana 10, retornam com mais 180°, totalizando 270° anti-horários em torno da A. mesentérica superior."
- **question:** "Qual é a rotação total das alças intestinais ao longo do processo de herniação e retorno fisiológico?"
- **explanation:** "90° anti-horários durante a herniação (semana 6) + 180° no retorno (semana 10) = 270° anti-horários totais em torno da A. mesentérica superior."

### cloaca
- **mainEvent:** "O septo urorectal (mesoderma) divide a cloaca em canal anorretal (posterior) e seio urogenital (anterior) na semana 7. A linha pectínea marca a junção endoderma/ectoderma no canal anal, com importantes diferenças clínicas acima e abaixo dela."
- **question:** "Qual estrutura separa as origens embrionárias distintas do canal anal e representa um marco clínico-cirúrgico importante?"
- **explanation:** "A linha pectínea (denteada) separa os 2/3 superiores (endoderma/hindgut) dos 1/3 inferior (ectoderma/proctodeo), com diferente vascularização, inervação e drenagem linfática."

## Verification

After editing, visually confirm in the app preview that:
- No event card modal shows `[Placeholder]` text
- Questions and explanations display correctly in the `EventDetailModal`
- All 10 events render proper content
