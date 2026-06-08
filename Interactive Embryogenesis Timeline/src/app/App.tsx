import { useState, useRef } from "react";
import { EventDetailModal } from "./components/event-modal";
import { EventDef } from "./types";

/* ─── TOKENS ─────────────────────────────────────────────────────────────── */
const C = {
  bg:        "#f8fafc",
  card:      "#ffffff",
  border:    "rgba(0,0,0,0.08)",
  text:      "#0f172a",
  muted:     "#64748b",
  anterior:  "#3b82f6",
  medio:     "#06b6d4",
  posterior: "#818cf8",
  branch:    "#d7eb00",
  single:    "#475569",
};

/* ─── EVENTS ─────────────────────────────────────────────────────────────── */
const EVENTS: EventDef[] = [

  /* ══════════════════  FASE 1 — TRILHO ÚNICO  ══════════════════ */

  {
    id:"fecundacao", code:"PRE-01", title:"Fecundação",
    organ:"Zigoto", organIcon:"🥚", track:"single",
    startWeek:1, endWeek:1.4, day:1,
    period:"Dia 1 — Semana 1",
    mainEvent:"A fecundação do oócito secundário pelo espermatozoide completa a meiose II e origina o zigoto diplóide (2n), marcando o início do desenvolvimento embrionário.",
    development:[
      "O espermatozoide penetra no oócito secundário completando a **meiose II**",
      "Formação dos **pronúcleos masculino e feminino** com fusão posterior",
      "Zigoto formado com **genoma completo (2n)** — início das clivagens",
    ],
    question:"Qual estrutura é formada imediatamente após a fecundação?",
    options:[{letter:"a",text:"Mórula"},{letter:"b",text:"Zigoto"},{letter:"c",text:"Blastocisto"},{letter:"d",text:"Gástrula"}],
    correctIndex:1,
    explanation:"A fecundação origina o zigoto (2n). A mórula forma-se ~D4 por clivagem, e o blastocisto ~D5.",
  },
  {
    id:"bilaminar", code:"PRE-02", title:"Disco bilaminar",
    organ:"Embrião", organIcon:"🔵", track:"single",
    startWeek:1.6, endWeek:2.5, day:8,
    period:"Dia 8 — Semana 2",
    mainEvent:"O embrioblasto diferencia-se em epiblasto (camada superior) e hipoblasto (camada inferior), formando o disco embrionário bilaminar por volta do dia 8.",
    development:[
      "O embrioblasto diferencia-se em **epiblasto** (superior) e **hipoblasto** (inferior)",
      "O hipoblasto origina o **endoderma visceral primário** e o saco vitelino",
      "Formação da **cavidade amniótica** acima do epiblasto",
    ],
    question:"O disco bilaminar é formado por quais duas camadas?",
    options:[{letter:"a",text:"Ectoderma e mesoderma"},{letter:"b",text:"Mesoderma e endoderma"},{letter:"c",text:"Epiblasto e hipoblasto"},{letter:"d",text:"Trofoblasto e embrioblasto"}],
    correctIndex:2,
    explanation:"Epiblasto + hipoblasto = disco bilaminar (~D8). O trofoblasto forma a placenta, não o disco embrionário.",
  },
  {
    id:"trilaminar", code:"PRE-03", title:"Disco trilaminar",
    organ:"Embrião", organIcon:"🔷", track:"single",
    startWeek:2.6, endWeek:3.5, day:16,
    period:"Dia 16 — Semana 3",
    mainEvent:"A gastrulação (semana 3) forma a linha primitiva: células do epiblasto migram para originar o mesoderma intraembrionário e o endoderma definitivo, estabelecendo o disco trilaminar.",
    development:[
      "Células do epiblasto migram pela **linha primitiva** para formar o mesoderma",
      "Algumas células substituem o hipoblasto → **endoderma definitivo**",
      "As células remanescentes do epiblasto formam o **ectoderma**",
    ],
    question:"O mesoderma intraembrionário é formado pela migração de células de qual estrutura?",
    options:[{letter:"a",text:"Neurulação"},{letter:"b",text:"Invaginação pelo nó primitivo"},{letter:"c",text:"Clivagem do blastocisto"},{letter:"d",text:"Implantação trofoblástica"}],
    correctIndex:1,
    explanation:"Células do epiblasto migram pela linha e nó primitivos, originando o mesoderma e substituindo o hipoblasto pelo endoderma definitivo.",
  },
  {
    id:"gi01", code:"GI-01", title:"Intestino Primitivo",
    organ:"Intestino Primitivo", organIcon:"🌀", track:"single",
    startWeek:3.6, endWeek:4.1, day:24,
    period:"Semana 4 — Dia 24",
    mainEvent:"O dobramento cefálico, caudal e lateral do embrião plano (semana 4, dia 24) incorpora parte do saco vitelínico ao interior do embrião, originando o intestino primitivo revestido por endoderma.",
    development:[
      "Dobramento **cefálico, caudal e lateral** incorpora o saco vitelínico ao embrião",
      "Resultado: tubo de endoderma → **intestino primitivo** (revestimento epitelial interno)",
      "Porção não incorporada permanece ligada pelo **ducto onfalomesentérico** (vitelínico) no cordão umbilical",
      "**Membrana bucofaríngea** (cranial) rompe no dia 24–26; **membrana cloacal** (caudal) rompe na semana 7–8",
      "Suspenso pelo **mesentério dorsal** (toda a extensão) e **mesentério ventral** (esôfago, estômago, duodeno proximal)",
      "**Correlação:** falha no dobramento lateral → gastrosquise ou onfalocele; ducto onfalomesentérico persistente → **divertículo de Meckel**",
    ],
    images:[
      {src:"/eventos/GI-01_langman_p342_img2.jpeg", caption:"Dobramento embrionário (A–D): incorporação do saco vitelínico e formação dos intestinos anterior, médio e posterior."},
      {src:"/eventos/GI-01_moore_p192_img1.jpeg", caption:"Dobramentos cefálico, caudal e lateral (cortes A–F), com o septo transverso e o cordão umbilical."},
      {src:"/eventos/GI-01_langman_p345_img1.jpeg", caption:"Dobramento lateral em corte transversal: mesentério dorsal e conexão com a vesícula vitelínica."},
      {src:"/eventos/GI-01_moore_p194_img1.jpeg", caption:"Septo transverso, ducto onfaloentérico e comunicação dos celomas intra e extraembrionário."},
    ],
    question:"O intestino primitivo é revestido internamente por epitélio derivado de qual folheto embrionário?",
    options:[{letter:"a",text:"Ectoderma"},{letter:"b",text:"Mesoderma esplâncnico"},{letter:"c",text:"Endoderma"},{letter:"d",text:"Notocorda"}],
    correctIndex:2,
    explanation:"O dobramento incorpora o endoderma (teto do saco vitelínico) ao embrião, formando o tubo intestinal primitivo com revestimento epitelial endodérmico. A musculatura e o tecido conjuntivo da parede derivam do mesoderma esplâncnico.",
  },
  {
    id:"tressegmentos", code:"GI-∑", title:"Três Segmentos",
    organ:"Intestino Primitivo", organIcon:"📐", track:"single",
    startWeek:4.1, endWeek:4.9, day:28,
    period:"Dia 28 — Semana 4",
    mainEvent:"O intestino primitivo subdivide-se em três segmentos definidos pela irrigação arterial: intestino anterior (tronco celíaco), intestino médio (A. mesentérica superior) e intestino posterior (A. mesentérica inferior).",
    development:[
      "**Intestino Anterior (Foregut):** faringe, esôfago, estômago, duodeno proximal (até ampola de Vater), fígado, vesícula biliar, pâncreas, baço → irrigação pelo **Tronco Celíaco**",
      "**Intestino Médio (Midgut):** duodeno distal, jejuno, íleo, cólon ascendente, 2/3 direitos do transverso → irrigação pela **A. Mesentérica Superior**",
      "**Intestino Posterior (Hindgut):** 1/3 esquerdo do transverso, cólon descendente, sigmoide, reto, 2/3 superiores do canal anal → irrigação pela **A. Mesentérica Inferior**",
    ],
    question:"Qual artéria irriga o intestino médio, que origina o jejuno, íleo e cólon ascendente?",
    options:[{letter:"a",text:"Tronco celíaco"},{letter:"b",text:"A. mesentérica superior"},{letter:"c",text:"A. mesentérica inferior"},{letter:"d",text:"A. ilíaca comum"}],
    correctIndex:1,
    explanation:"A artéria mesentérica superior irriga o intestino médio. O tronco celíaco irriga o intestino anterior; a A. mesentérica inferior irriga o intestino posterior.",
  },

  /* ══════════════════  INTESTINO ANTERIOR — Tronco Celíaco  ══════════════════ */

  {
    id:"gi02_estomago", code:"GI-02", title:"Primórdio do Estômago",
    organ:"Estômago", organIcon:"🟠", track:"anterior",
    startWeek:4.1, endWeek:4.9, day:26,
    period:"Semana 4 — Dia 26",
    mainEvent:"No dia 26, o intestino anterior apresenta uma dilatação fusiforme que origina o primórdio do estômago, suspenso pelos mesentérios dorsal e ventral.",
    development:[
      "**Dia 26:** o intestino anterior sofre uma **dilatação fusiforme** → primórdio do **estômago**",
      "Suspenso pelo **mesentério dorsal** (futuro mesogástrio dorsal) e pelo **mesentério ventral**",
      "Crescimento assimétrico das paredes → **grande curvatura** (convexa) e **pequena curvatura** (côncava)",
      "A posição definitiva é estabelecida pela **rotação gástrica** na semana 5 (ver Rotação + Bolsa Omental)",
    ],
    images:[
      {src:"/eventos/GI-02_moore_p193_img1.jpeg", caption:"Cortes transversais do intestino anterior: estômago, mesentério ventral e artéria do intestino anterior."},
      {src:"/eventos/GI-02_moore_p271_img1.jpeg", caption:"Embrião em corte sagital: regiões esofágica e gástrica do intestino anterior e a irrigação (tronco celíaco, AMS, AMI)."},
    ],
    question:"O primórdio do estômago surge no dia 26 como qual alteração do intestino anterior?",
    options:[{letter:"a",text:"Evaginação ventral (divertículo)"},{letter:"b",text:"Dilatação fusiforme"},{letter:"c",text:"Septação por pregas laterais"},{letter:"d",text:"Herniação para o cordão umbilical"}],
    correctIndex:1,
    explanation:"No dia 26 o intestino anterior apresenta uma dilatação fusiforme que se torna o primórdio gástrico. A evaginação ventral origina o fígado (divertículo hepático) e a septação por pregas laterais separa traqueia e esôfago.",
  },
  {
    id:"gi02_esofago", code:"GI-02", title:"Primórdio do Esôfago",
    organ:"Esôfago", organIcon:"🫧", track:"anterior",
    startWeek:4.1, endWeek:4.9, day:26,
    period:"Semana 4 — Dia 26",
    mainEvent:"O segmento cranial ao primórdio gástrico torna-se o primórdio do esôfago, que se alonga rapidamente nas semanas 5–7 conforme o coração e os pulmões descem.",
    development:[
      "Segmento **cranial** ao primórdio gástrico → primórdio do **esôfago** (inicialmente ≈3 mm)",
      "Alonga-se rapidamente nas **semanas 5–7** conforme coração e pulmões descem caudalmente",
      "**Semana 7:** atinge o comprimento relativo definitivo",
      "Parede: 1/3 superior = músculo **estriado** (arcos faríngeos); 2/3 inferiores = músculo **liso** (mesoderma esplâncnico)",
      "Inervação motora pelo nervo **vago (X)**",
      "Passa por **obliteração transitória** e recanaliza na semana 8 (ver Recanalização do Esôfago)",
    ],
    images:[
      {src:"/eventos/GI-02_langman_p344_img1.jpeg", caption:"Primórdios de esôfago, estômago e pâncreas e o padrão molecular de regionalização (SOX2/PDX1/CDX/HOX)."},
      {src:"/eventos/GI-02_moore_p271_img1.jpeg", caption:"Embrião em corte sagital: regiões esofágica e gástrica do intestino anterior."},
    ],
    question:"A musculatura do terço superior do esôfago é estriada porque deriva de qual estrutura embrionária?",
    options:[{letter:"a",text:"Mesoderma esplâncnico"},{letter:"b",text:"Arcos faríngeos"},{letter:"c",text:"Crista neural"},{letter:"d",text:"Septo transverso"}],
    correctIndex:1,
    explanation:"O 1/3 superior do esôfago tem músculo estriado derivado dos arcos faríngeos; os 2/3 inferiores têm músculo liso do mesoderma esplâncnico. Em ambos a inervação motora é feita pelo nervo vago (X).",
  },
  {
    id:"gi03", code:"GI-03", title:"Divertículo Hepático",
    organ:"Fígado / Via Biliar", organIcon:"🟤", track:"anterior",
    startWeek:4.1, endWeek:5, day:26,
    period:"Semana 4 — Dia 26",
    mainEvent:"No dia 26, o endoderma ventral do duodeno primitivo forma o divertículo hepático, que cresce para dentro do septo transverso e origina o parênquima hepático, a vesícula biliar e os ductos biliares.",
    development:[
      "**Dia 26:** endoderma ventral do duodeno → **divertículo hepático** cresce para dentro do **septo transverso**",
      "Porção **cranial:** prolifera → **parênquima hepático** (hepatócitos + ductos biliares intra-hepáticos)",
      "Porção **caudal:** → **vesícula biliar** + ducto cístico + ducto biliar comum (coledócus)",
      "Semana 10: fígado ≈ **10% do peso fetal** → maior órgão fetal; inicia eritropoiese (ver GI-13)",
      "Ligamentos: **falciforme** (mesentério ventral), **ligamentum teres** (veia umbilical esq.), **ligamentum venosum** (ducto venoso)",
      "**Correlação:** Atresia biliar → destruição dos ductos → cirurgia de **Kasai antes dos 60 dias**; Cisto de colédoco → tríade de Todani (icterícia + massa + dor)",
    ],
    images:[
      {src:"/eventos/GI-03_langman_p358_img1.jpeg", caption:"Divertículo hepático: broto hepático, vesícula biliar e ductos hepático, cístico e biliar."},
      {src:"/eventos/GI-03_moore_p279_img1.jpeg", caption:"Divertículo hepático crescendo no septo transverso; fígado, ligamento falciforme e omento menor."},
      {src:"/eventos/GI-03_langman_p359_img1.jpeg", caption:"Indução do campo hepático pelo endoderma e pelo mesoderma cardíaco (FGF2/BMP)."},
    ],
    question:"A atresia das vias biliares extra-hepáticas deve ser corrigida idealmente antes dos 60 dias de vida por qual procedimento?",
    options:[{letter:"a",text:"Cirurgia de Kasai (hepatoportoenterostomia)"},{letter:"b",text:"Procedimento de Whipple"},{letter:"c",text:"Colecistectomia simples"},{letter:"d",text:"Derivação portossistêmica"}],
    correctIndex:0,
    explanation:"A portoenterostomia de Kasai restabelece a drenagem biliar e tem melhor prognóstico se feita antes dos 60 dias, antes da fibrose hepática avançada. A porção caudal do divertículo hepático origina a vesícula e os ductos biliares.",
  },
  {
    id:"gi04", code:"GI-04", title:"Broto Pancreático",
    organ:"Pâncreas", organIcon:"⚡", track:"anterior",
    startWeek:5, endWeek:5.8, day:35,
    period:"Semana 5",
    mainEvent:"Dois brotos surgem do duodeno na semana 5: o broto ventral (próximo ao divertículo hepático) e o broto dorsal. Com a rotação duodenal, o broto ventral migra posteriormente e funde-se com o dorsal, formando o pâncreas definitivo.",
    development:[
      "**Broto ventral:** nasce próximo ao divertículo hepático (com o ducto biliar comum)",
      "**Broto dorsal:** nasce diretamente do duodeno, cresce mais rapidamente",
      "Semanas 5–7: duodeno gira → broto ventral migra **posteriormente** → fusão com broto dorsal",
      "Broto ventral → **processo uncinado** + parte inferior da cabeça pancreática",
      "Broto dorsal → **corpo, cauda** + parte superior da cabeça",
      "Ducto de **Wirsung** (principal → papila maior); ducto de **Santorini** (acessório → papila menor, 2 cm acima)",
      "**Correlação:** Pâncreas **divisum** (5–10%) → falha de fusão → pancreatite recorrente; Pâncreas **anular** → broto ventral bifurcado → obstrução duodenal neonatal",
    ],
    images:[
      {src:"/eventos/GI-04_moore_p281_img1.jpeg", caption:"Desenvolvimento do pâncreas (A–G): brotos ventral e dorsal, rotação, fusão e formação dos ductos."},
      {src:"/eventos/GI-04_langman_p358_img2.jpeg", caption:"Ductos definitivos: principal (Wirsung) e acessório (Santorini), processo uncinado e papilas maior e menor."},
      {src:"/eventos/GI-04_moore_p283_img1.jpeg", caption:"Pâncreas anular: broto ventral bífido envolve o duodeno → obstrução duodenal."},
    ],
    question:"O pâncreas divisum, anomalia pancreática congênita mais comum, resulta de qual falha embriológica?",
    options:[{letter:"a",text:"Rotação incompleta do estômago"},{letter:"b",text:"Falha de fusão dos brotos pancreáticos ventral e dorsal"},{letter:"c",text:"Bifurcação do broto ventral ao redor do duodeno"},{letter:"d",text:"Persistência do ducto onfalomesentérico"}],
    correctIndex:1,
    explanation:"No pâncreas divisum os ductos dos brotos ventral e dorsal não se fundem, e a maior parte do pâncreas drena pela papila menor (ducto de Santorini) → predispõe a pancreatite recorrente. A bifurcação do broto ventral, por sua vez, causa o pâncreas anular.",
  },
  {
    id:"gi05", code:"GI-05", title:"Septação Traqueoesofágica",
    organ:"Esôfago / Traqueia", organIcon:"🔀", track:"anterior",
    startWeek:4, endWeek:5.5, day:28,
    period:"Semanas 4–5",
    mainEvent:"As pregas laterais traqueoesofágicas crescem medialmente e formam o septo traqueoesofágico, separando o intestino anterior único em esôfago (posterior) e traqueia/pulmões (anterior), de caudal para cranial.",
    development:[
      "Intestino anterior na região do pescoço inicialmente é um **tubo único**",
      "**Pregas laterais traqueoesofágicas** crescem medialmente → formam o **septo traqueoesofágico**",
      "Anterior → primórdio da traqueia e pulmões; Posterior → **esôfago**",
      "Separação ocorre de **caudal para cranial**; septo une-se à membrana bucofaríngea anteriormente",
      "**Atresia esofágica Tipo C** (≈85%): AE proximal + **fístula traqueoesofágica distal** — falha parcial do septo",
      "**Diagnóstico pré-natal:** polidrâmnio (feto não deglute líquido amniótico); pós-natal: sialorreia, engasgos, cianose na alimentação, pneumonia de aspiração",
    ],
    images:[
      {src:"/eventos/GI-05_langman_p347_img2.jpeg", caption:"Formação do septo traqueoesofágico (A–C): separação do divertículo respiratório (traqueia) e do esôfago."},
      {src:"/eventos/GI-05_langman_p347_img1.jpeg", caption:"Embrião em corte sagital: divertículo traqueoesofágico, esôfago e estômago."},
      {src:"/eventos/GI-05_langman_p348_img1.jpeg", caption:"Variantes de atresia esofágica e fístula traqueoesofágica (tipos A–E)."},
    ],
    question:"Qual é a variante mais comum (~85%) de atresia esofágica?",
    options:[{letter:"a",text:"Atresia esofágica isolada, sem fístula"},{letter:"b",text:"Fístula traqueoesofágica em 'H' isolada"},{letter:"c",text:"Atresia proximal + fístula traqueoesofágica distal (tipo C)"},{letter:"d",text:"Atresia com fístula proximal e distal"}],
    correctIndex:2,
    explanation:"O tipo C (atresia proximal em fundo cego + fístula traqueoesofágica distal) responde por ~85% dos casos. Manifesta-se com polidrâmnio pré-natal e, ao nascer, sialorreia, engasgos e pneumonia aspirativa.",
  },
  {
    id:"rotacao", code:"GI-06", title:"Rotação do Estômago e Bolsa Omental",
    organ:"Estômago", organIcon:"🔄", track:"anterior",
    startWeek:5, endWeek:7, day:35,
    period:"Semana 5",
    mainEvent:"O estômago realiza duas rotações simultâneas (semana 5): 90° no sentido horário ao redor do eixo longitudinal, posicionando a grande curvatura à esquerda, e uma segunda rotação que eleva o piloro à direita — criando a bolsa omental e o epíploo maior.",
    development:[
      "**1ª rotação (eixo longitudinal, 90° horário):** parede direita → posterior; parede esquerda → anterior",
      "Consequência nervosa: vago **esquerdo** → nervo gástrico **anterior**; vago **direito** → nervo gástrico **posterior**",
      "**2ª rotação (eixo ântero-posterior):** piloro sobe e vai para a **direita**; cárdia desce e vai para a **esquerda**",
      "A rotação cria a **bolsa omental** (bursa omental / cavidade peritoneal menor) posterior ao estômago",
      "**Epíploo maior (grande omento):** mesentério dorsal gástrico cresce caudalmente como 'avental' → funde-se com cólon transverso",
      "**Forame de Winslow:** comunicação entre bolsa omental e cavidade peritoneal maior; **Correlação:** vólvulo gástrico → emergência cirúrgica",
    ],
    images:[
      {src:"/eventos/GI-06_moore_p273_img1.jpeg", caption:"Rotação gástrica (A–G): curvaturas, bolsa omental, forame omental e omento maior."},
      {src:"/eventos/GI-06_langman_p350_img1.jpeg", caption:"Formação da bolsa omental por coalescência de vacúolos no mesogástrio dorsal."},
      {src:"/eventos/GI-06_langman_p351_img1.jpeg", caption:"Omento menor, baço e ligamentos gástricos (falciforme, lienorrenal e gastrolienal)."},
      {src:"/eventos/GI-06_langman_p352_img1.jpeg", caption:"Omento maior em 'avental' e sua fusão com o mesocólon transverso."},
    ],
    question:"Após a rotação gástrica de 90° no sentido horário, o nervo vago esquerdo passa a inervar qual face do estômago?",
    options:[{letter:"a",text:"Face posterior (nervo gástrico posterior)"},{letter:"b",text:"Face anterior (nervo gástrico anterior)"},{letter:"c",text:"Grande curvatura"},{letter:"d",text:"Piloro"}],
    correctIndex:1,
    explanation:"A rotação 90° horária arrasta o vago esquerdo (que estava à esquerda) para a face anterior → nervo gástrico anterior. O vago direito → nervo gástrico posterior.",
  },
  {
    id:"gi07_duodeno", code:"GI-07", title:"Rotação Duodenal",
    organ:"Duodeno", organIcon:"🔄", track:"anterior",
    startWeek:5, endWeek:7, day:35,
    period:"Semanas 5–7",
    mainEvent:"Com a rotação gástrica, o duodeno em alça em C gira no sentido horário, desloca-se para a direita e fixa-se secundariamente no retroperitônio.",
    development:[
      "Duodeno primitivo (intestino anterior + médio) forma **alça em C** voltada para a direita",
      "Gira **no sentido horário** (junto com o estômago) → desloca-se para a **direita** e torna-se **retroperitoneal**",
      "Sofre **obstrução fisiológica** (proliferação epitelial sólida) entre as semanas 5–8",
      "Recanaliza até a semana 8 (ver Recanalização do Duodeno)",
      "**Atresia duodenal:** falha de recanalização → vômitos biliosos + sinal da **'dupla bolha'** → associada à **trissomia 21** (≈30%)",
      "**Estenose duodenal:** falha parcial → obstrução incompleta com sintomas mais tardios",
    ],
    images:[
      {src:"/eventos/GI-01_langman_p356_img1.jpeg", caption:"Rotação duodenal em corte transversal: duodeno e pâncreas tornam-se retroperitoneais."},
      {src:"/eventos/GI-07_moore_p278_img1.jpeg", caption:"Ultrassom pré-natal — sinal da 'dupla bolha' (estômago + duodeno) na atresia duodenal."},
    ],
    question:"Durante a rotação no sentido horário, o duodeno em alça em 'C' assume qual posição em relação ao peritônio?",
    options:[{letter:"a",text:"Intraperitoneal com mesentério longo"},{letter:"b",text:"Retroperitoneal (secundariamente)"},{letter:"c",text:"Livre dentro da bolsa omental"},{letter:"d",text:"Subseroso no septo transverso"}],
    correctIndex:1,
    explanation:"A rotação horária empurra a alça duodenal para a direita e contra a parede posterior, tornando-a secundariamente retroperitoneal. Esse mesmo giro leva o broto pancreático ventral a migrar posteriormente.",
  },
  {
    id:"gi07_pancreas", code:"GI-07", title:"Fusão Pancreática",
    organ:"Pâncreas", organIcon:"🔗", track:"anterior",
    startWeek:5, endWeek:7, day:35,
    period:"Semanas 5–7",
    mainEvent:"Com a rotação duodenal, o broto pancreático ventral migra posteriormente e funde-se com o broto dorsal, definindo o pâncreas e seus ductos.",
    development:[
      "O **broto pancreático ventral** gira **posteriormente** ao redor do duodeno",
      "Encontra o **broto dorsal** → **fusão** dos dois brotos e de seus ductos (semanas 5–7)",
      "Broto ventral → **processo uncinado** + parte inferior da cabeça; broto dorsal → **corpo, cauda** e parte superior",
      "Ductos: **Wirsung** (principal → papila maior) + **Santorini** (acessório → papila menor)",
      "**Pâncreas anular:** broto ventral **bifurcado** envolve o duodeno em anel → obstrução duodenal neonatal",
      "**Pâncreas divisum:** falha de fusão dos ductos → drenagem pela papila menor (ver Brotos Pancreáticos)",
    ],
    images:[
      {src:"/eventos/GI-07_langman_p362_img1.jpeg", caption:"Pâncreas definitivo após a fusão dos brotos ventral e dorsal e seus ductos."},
      {src:"/eventos/GI-04_moore_p283_img1.jpeg", caption:"Pâncreas anular: broto ventral bífido envolve o duodeno → obstrução duodenal."},
    ],
    question:"O pâncreas anular, que pode causar obstrução duodenal no neonato, resulta de qual mecanismo?",
    options:[{letter:"a",text:"Falha de fusão dos ductos pancreáticos"},{letter:"b",text:"Broto ventral bifurcado que circunda o duodeno"},{letter:"c",text:"Persistência do ducto onfalomesentérico"},{letter:"d",text:"Ausência do broto dorsal"}],
    correctIndex:1,
    explanation:"No pâncreas anular o broto ventral bífido gira em duas direções e envolve o duodeno em anel → obstrução. A falha de fusão dos ductos, por outro lado, causa o pâncreas divisum.",
  },
  {
    id:"gi10_esofago", code:"GI-10", title:"Recanalização do Esôfago",
    organ:"Esôfago", organIcon:"💧", track:"anterior",
    startWeek:8, endWeek:8.5, day:56,
    period:"Semana 8",
    mainEvent:"Na semana 8, vacúolos surgem no epitélio esofágico — antes obliterado por proliferação — e coalescem, restaurando o lúmen do esôfago.",
    development:[
      "Semanas 5–8: o esôfago sofre **obliteração transitória** por proliferação epitelial intensa",
      "**Semana 8:** surgem **vacúolos** que coalescem → restauração do lúmen (recanalização)",
      "Falha de recanalização → **atresia/estenose esofágica** (variantes com fístula: ver Septação Traqueoesofágica)",
      "Quadro clínico: **polidrâmnio** pré-natal; sialorreia e engasgos pós-natais",
    ],
    images:[
      {src:"/eventos/GI-01_langman_p356_img2.jpeg", caption:"Estágio sólido e recanalização do tubo por coalescência de vacúolos."},
      {src:"/eventos/GI-05_langman_p348_img1.jpeg", caption:"Variantes de atresia esofágica e fístula traqueoesofágica (tipos A–E)."},
    ],
    question:"A repermeabilização (recanalização) do lúmen esofágico na semana 8 ocorre por qual mecanismo?",
    options:[{letter:"a",text:"Apoptose do septo traqueoesofágico"},{letter:"b",text:"Coalescência de vacúolos no tampão epitelial"},{letter:"c",text:"Reabsorção da membrana bucofaríngea"},{letter:"d",text:"Dobramento lateral do embrião"}],
    correctIndex:1,
    explanation:"Após uma fase sólida de proliferação epitelial, vacúolos surgem e coalescem, restaurando o lúmen. A falha desse processo gera atresia ou estenose esofágica.",
  },
  {
    id:"gi10_duodeno", code:"GI-10", title:"Recanalização do Duodeno",
    organ:"Duodeno", organIcon:"💧", track:"anterior",
    startWeek:8, endWeek:8.5, day:56,
    period:"Semana 8",
    mainEvent:"Na semana 8, o duodeno — que passou por uma fase sólida entre as semanas 5–8 — recanaliza pela coalescência de vacúolos; a falha gera atresia ou estenose.",
    development:[
      "Semanas 5–8: o duodeno passa por uma **fase sólida** (proliferação epitelial oblitera o lúmen)",
      "**Semana 8:** **vacúolos** coalescem → lúmen restaurado",
      "Falha total → **atresia duodenal** (sinal da **'dupla bolha'**, associada à **trissomia 21**)",
      "Falha parcial → **estenose duodenal**",
      "Atresia intestinal também pode resultar de **isquemia vascular** durante a herniação umbilical",
    ],
    images:[
      {src:"/eventos/GI-10_moore_p277_img1.jpeg", caption:"Recanalização do duodeno: tampão epitelial → vacúolos → lúmen normal, estenose ou atresia."},
    ],
    question:"A atresia duodenal por falha de recanalização produz qual achado radiológico característico?",
    options:[{letter:"a",text:"Sinal da 'dupla bolha'"},{letter:"b",text:"Pneumoperitônio"},{letter:"c",text:"Sinal do 'grão de café'"},{letter:"d",text:"Imagem em 'pilha de moedas'"}],
    correctIndex:0,
    explanation:"O duodeno passa por uma fase sólida (semanas 5–8); se não recanaliza, surge atresia duodenal → estômago e duodeno proximal distendidos = sinal da 'dupla bolha'. Associa-se à trissomia 21.",
  },
  {
    id:"gi13", code:"GI-13", title:"Funções Hepáticas Fetais",
    organ:"Fígado", organIcon:"🩸", track:"anterior",
    startWeek:10, endWeek:13, day:70,
    period:"Semanas 10–13",
    mainEvent:"A partir da semana 10, o fígado inicia a eritropoiese (função hematopoiética dominante até a semana 28) e nas semanas 12–13 começa a síntese de bile, que é armazenada na vesícula e excretada no duodeno, compondo o mecônio.",
    development:[
      "**Semana 10:** fígado inicia **eritropoiese** → função hematopoiética dominante até semana 28 (medula óssea assume)",
      "**Semanas 12–13:** início da síntese de **bile** pelos hepatócitos → armazenada na vesícula → excretada no duodeno → componente do mecônio (cor verde-escura)",
      "Fígado = órgão com crescimento mais rápido no período fetal precoce",
      "**Circulação fetal:** veia umbilical esquerda → **ducto venoso** → VCI (desvia o fígado)",
      "Pós-natal: ducto venoso fecha → **ligamentum venosum**; veia umbilical → **ligamentum teres**",
      "**Correlação:** icterícia neonatal fisiológica (imaturidade de UGT1A1); **mecônio** deve ser eliminado nas primeiras 48h — mecônio intra-útero → síndrome de aspiração meconial",
    ],
    images:[
      {src:"/eventos/GI-13_moore_p280_img1.jpeg", caption:"Relações do fígado fetal: veia umbilical (sangue oxigenado), ligamentos hepáticos e área nua."},
      {src:"/eventos/GI-03_moore_p279_img1.jpeg", caption:"Crescimento do fígado no septo transverso e o ligamento falciforme."},
    ],
    question:"Qual é a principal função hematológica do fígado fetal entre a semana 10 e ~28, antes de a medula óssea assumir?",
    options:[{letter:"a",text:"Síntese de fatores de coagulação"},{letter:"b",text:"Eritropoiese (hematopoiese)"},{letter:"c",text:"Conjugação de bilirrubina"},{letter:"d",text:"Produção de bile"}],
    correctIndex:1,
    explanation:"Da semana 10 até ~28, o fígado é o principal sítio de eritropoiese fetal. A síntese de bile começa nas semanas 12–13, e a medula óssea assume a hematopoiese por volta da semana 28.",
  },

  /* ══════════════════  INTESTINO MÉDIO — A. Mesentérica Superior  ══════════════════ */

  {
    id:"hernia", code:"GI-08", title:"Herniação Umbilical Fisiológica",
    organ:"Int. Médio", organIcon:"💫", track:"medio",
    startWeek:6, endWeek:10, day:42,
    period:"Semana 6",
    mainEvent:"Na semana 6, o crescimento acelerado do intestino médio supera a capacidade abdominal: as alças herniam para o celoma do cordão umbilical e giram 90° anti-horários em torno da artéria mesentérica superior.",
    development:[
      "Semana 6: intestino médio cresce rapidamente — **excede a capacidade da cavidade abdominal**",
      "Alças herniam para o **celoma extraembrionário** no cordão umbilical — processo **fisiológico**",
      "Giram **90° anti-horários** em torno da artéria mesentérica superior (eixo)",
      "Alça cefálica (jejuno + íleo proximal) → **esquerda**; alça caudal (íleo distal + ceco) → **direita** com **divertículo cecal**",
      "**Onfalocele:** falha no retorno → alças revestidas por saco amniótico (defeito central) → associada a cromossomopatias (T13, T18)",
      "**Gastrosquise:** defeito paraumbilical à direita → alças **sem** cobertura membranosa → peritonite química → emergência → NÃO associada a cromossomopatias",
    ],
    images:[
      {src:"/eventos/GI-08_moore_p289_img1.jpeg", caption:"Alça do intestino médio (A–E): porções cranial e caudal, divertículo cecal e ducto onfaloentérico."},
      {src:"/eventos/GI-10_langman_p371_img1.jpeg", caption:"Rotação da alça do intestino médio em torno da artéria mesentérica superior (A–D)."},
      {src:"/eventos/GI-08_langman_p368_img1.jpeg", caption:"Onfalocele e gastrosquise: diagramas, peças anatômicas e ultrassonografia."},
    ],
    question:"Qual é a rotação total das alças intestinais ao longo do processo de herniação e retorno fisiológico?",
    options:[{letter:"a",text:"90° anti-horários"},{letter:"b",text:"180° anti-horários"},{letter:"c",text:"270° anti-horários"},{letter:"d",text:"360° horários"}],
    correctIndex:2,
    explanation:"90° anti-horários durante a herniação (semana 6) + 180° no retorno (semana 10) = 270° anti-horários totais em torno da artéria mesentérica superior.",
  },
  {
    id:"gi12", code:"GI-12", title:"Retorno das Alças Intestinais",
    organ:"Int. Médio", organIcon:"↩️", track:"medio",
    startWeek:10, endWeek:11, day:70,
    period:"Semana 10",
    mainEvent:"Na semana 10, a cavidade abdominal cresceu o suficiente para receber as alças. Elas retornam com mais 180° de rotação anti-horária, totalizando 270°, e o cólon fixa-se retroperitonealmente pela fáscia de Toldt.",
    development:[
      "**Semana 10:** cavidade abdominal cresceu → alças retornam + mais **180° anti-horários** (total: **270° anti-horários**)",
      "Jejuno e íleo → porção **central e esquerda** do abdome",
      "Ceco → quadrante superior direito → **desce para a fossa ilíaca direita** (semanas 10–14)",
      "Cólon ascendente e descendente → tornam-se **retroperitoneais** (fáscia de Toldt)",
      "Sigmoide e reto → mantêm mesentério",
      "**Má-rotação intestinal:** < 270° → bandas de **Ladd** comprimem duodeno; **vólvulo do intestino médio** → isquemia da AMS → emergência com alta mortalidade",
      "**Divertículo de Meckel (regra dos 2s):** 2% da população, 2 pés da válvula ileocecal, ≈2 pol de comprimento, 2 tipos de mucosa ectópica (gástrica + pancreática) → sangramento retal indolor",
    ],
    images:[
      {src:"/eventos/GI-12_langman_p364_img1.jpeg", caption:"Alças após o retorno ao abdome: ceco, alças jejunais e cólon em posição definitiva."},
      {src:"/eventos/GI-12_moore_p293_img1.jpeg", caption:"Má-rotação intestinal e vólvulo do intestino médio (A–F) e imagem de TC."},
      {src:"/eventos/GI-12_langman_p369_img1.jpeg", caption:"Divertículo de Meckel, cisto vitelino e fístula vitelina."},
    ],
    question:"O divertículo de Meckel, remanescente do ducto onfalomesentérico, segue a 'regra dos 2'. Qual alternativa a descreve corretamente?",
    options:[{letter:"a",text:"2% da população, a ~2 pés da válvula ileocecal, ~2 polegadas, 2 mucosas ectópicas"},{letter:"b",text:"20% da população, a 2 cm do ceco, sempre sintomático"},{letter:"c",text:"2% da população, localizado no cólon sigmoide"},{letter:"d",text:"2% da população, sem mucosa ectópica"}],
    correctIndex:0,
    explanation:"Regra dos 2: 2% da população; ~2 pés (60 cm) proximal à válvula ileocecal; ~2 polegadas de comprimento; 2 tipos de mucosa ectópica (gástrica e pancreática). A mucosa gástrica ectópica causa sangramento retal indolor.",
  },
  {
    id:"gi14", code:"GI-14", title:"Maturação Funcional Fetal",
    organ:"Trato GI", organIcon:"🧬", track:"medio",
    startWeek:16, endWeek:38, day:112,
    period:"Semanas 16–38",
    mainEvent:"Entre as semanas 16 e 38, o trato digestório amadurece progressivamente: o feto deglute líquido amniótico, desenvolve enzimas digestivas e, nas semanas 36–38, alcança a coordenação sução-deglutição-respiração necessária para a amamentação.",
    development:[
      "**Semana 9:** vilosidades intestinais formam-se; início dos movimentos peristálticos rudimentares",
      "**Semana 14–16:** feto **deglute** líquido amniótico ativamente → estimula maturação do TGI",
      "**Semana 20:** enzimas digestivas (sacarase, maltase, **lactase**) detectáveis na mucosa intestinal",
      "**Semana 28:** medula óssea assume eritropoiese do fígado; **semana 36–38:** coordenação sução-deglutição-respiração madura",
      "**Hirschsprung:** falha na migração das **células da crista neural** (semanas 5–12) → ausência do plexo mioentérico de Auerbach → aganglionose retal → sem mecônio 48h → biópsia diagnóstica",
      "**Enterocolite necrosante (NEC):** prematuro + intestino imaturo + isquemia + bactérias → necrose transmural; fortemente prevenida pelo leite materno",
    ],
    images:[
      {src:"/eventos/GI-14_moore_p301_img1.jpeg", caption:"Enema contrastado — zona de transição na doença de Hirschsprung (megacólon aganglionar)."},
      {src:"/eventos/GI-14_moore_p303_img1.jpeg", caption:"Espectro das malformações anorretais (A–I)."},
    ],
    question:"A doença de Hirschsprung resulta da falha de migração de quais células — e por que sempre acomete o reto?",
    options:[{letter:"a",text:"Células da crista neural; a migração é cranial→caudal, deixando o segmento mais distal aganglionar"},{letter:"b",text:"Células endodérmicas; o reto é o último segmento a se formar"},{letter:"c",text:"Mioblastos; o reto tem menor massa muscular"},{letter:"d",text:"Células mesodérmicas; migram caudal→cranial"}],
    correctIndex:0,
    explanation:"As células da crista neural migram em sentido cranial→caudal (semanas 5–12) para formar os plexos entéricos. A interrupção deixa o segmento mais distal — sempre incluindo o reto — sem gânglios → aganglionose → obstrução funcional e ausência de mecônio em 48h.",
  },

  /* ══════════════════  INTESTINO POSTERIOR — A. Mesentérica Inferior  ══════════════════ */

  {
    id:"cloaca", code:"GI-09", title:"Divisão da Cloaca",
    organ:"Cloaca", organIcon:"✂️", track:"posterior",
    startWeek:6, endWeek:8, day:42,
    period:"Semana 7",
    mainEvent:"O septo urorectal (mesoderma) cresce caudalmente entre as semanas 4–7 e divide a cloaca em compartimento anterior (seio urogenital → bexiga/uretra) e posterior (canal anorretal → reto + 2/3 superiores do canal anal).",
    development:[
      "**Cloaca:** câmara comum ao intestino posterior e ao alantoide, fechada pela membrana cloacal",
      "Semanas 4–7: **septo urorectal** (mesoderma) cresce caudalmente → divide a cloaca",
      "**Anterior:** seio urogenital → bexiga, uretra, partes do trato genital",
      "**Posterior:** canal anorretal primitivo → reto + 2/3 superiores do canal anal",
      "**Semana 7:** septo alcança a membrana cloacal → divide-a em membrana urogenital (anterior) e **membrana anal** (posterior) → perfura-se semana 8–9",
      "O ponto de contato do septo com a membrana cloacal → **corpo do períneo**",
      "**Correlação:** ânus imperfurado → lesões altas (fístula para bexiga/vagina) vs. baixas (prognóstico melhor); associação com **síndrome VACTERL**",
    ],
    images:[
      {src:"/eventos/GI-09_langman_p372_img1.jpeg", caption:"Divisão da cloaca (A–C): o septo urorretal separa o seio urogenital do canal anorretal."},
      {src:"/eventos/GI-09_moore_p298_img1.jpeg", caption:"Septação da cloaca em detalhe (A–F): reto, seio urogenital e períneo."},
      {src:"/eventos/GI-09_langman_p373_img1.jpeg", caption:"Malformações anorretais: fístulas urorretais e retovaginais."},
    ],
    question:"Qual estrutura separa as origens embrionárias distintas do canal anal e representa um marco clínico-cirúrgico importante?",
    options:[{letter:"a",text:"Septo urorectal"},{letter:"b",text:"Membrana cloacal"},{letter:"c",text:"Linha pectínea (denteada)"},{letter:"d",text:"Corpo do períneo"}],
    correctIndex:2,
    explanation:"A linha pectínea separa os 2/3 superiores (endoderma/hindgut) do 1/3 inferior (ectoderma/proctodeo), com diferente vascularização, inervação e drenagem linfática.",
  },
  {
    id:"gi11", code:"GI-11", title:"Canal Anal e Linha Pectínea",
    organ:"Canal Anal", organIcon:"📏", track:"posterior",
    startWeek:7, endWeek:8.5, day:49,
    period:"Semanas 7–8",
    mainEvent:"O canal anal tem dupla origem embriológica: os 2/3 superiores derivam do hindgut (endoderma) e o 1/3 inferior do proctodeu (ectoderma). A linha pectínea marca essa junção e define diferenças clínicas essenciais de epitélio, vascularização, inervação e drenagem linfática.",
    development:[
      "**2/3 superiores:** hindgut (endoderma) → epitélio **colunar simples** → transicional; A. retal superior (ramo AMS → A. mesentérica inf.); linfonodos **ilíacos internos**",
      "**1/3 inferior:** proctodeu (ectoderma) → epitélio **escamoso estratificado**; A. retal inferior (ramo da A. pudenda interna); linfonodos **inguinais**",
      "**Linha pectínea (denteada):** marca a junção embriológica — referência clínico-cirúrgica essencial",
      "Acima da linha: hemorroidas **internas** (indolores, sangramento vermelho-vivo); abaixo: hemorroidas **externas** (dolorosas, trombo)",
      "Câncer acima → **adenocarcinoma** → metástase para linfonodos ilíacos internos",
      "Câncer abaixo → **carcinoma escamocelular** → metástase para linfonodos inguinais",
    ],
    images:[
      {src:"/eventos/GI-11_moore_p299_img1.jpeg", caption:"Canal anal: a linha pectínea marca a junção entre o intestino posterior (endoderma) e a fosseta anal (ectoderma)."},
      {src:"/eventos/GI-11_langman_p372_img1.jpeg", caption:"Origem do canal anorretal a partir da cloaca: proctodeu e membrana anal."},
    ],
    question:"Um carcinoma surgido ABAIXO da linha pectínea tende a apresentar qual histologia e drenagem linfática?",
    options:[{letter:"a",text:"Adenocarcinoma → linfonodos ilíacos internos"},{letter:"b",text:"Carcinoma escamocelular → linfonodos inguinais"},{letter:"c",text:"Adenocarcinoma → linfonodos inguinais"},{letter:"d",text:"Carcinoma escamocelular → linfonodos ilíacos internos"}],
    correctIndex:1,
    explanation:"Abaixo da linha pectínea o epitélio é escamoso (ectoderma/proctodeu) → carcinoma escamocelular, com drenagem para os linfonodos inguinais. Acima da linha: epitélio colunar (endoderma) → adenocarcinoma, com drenagem para os ilíacos internos.",
  },
];

/* ─── LAYOUT (SWIMLANES / GANTT) ──────────────────────────────────────────────
   Cada estrutura é uma lane; cada card é uma BARRA cuja largura = duração
   (semana inicial → final). Barras que se sobrepõem no tempo numa mesma lane
   são empilhadas em sub-linhas. O Tubo Primitivo é o fio de origem (S1→S4),
   de onde se ramificam os 3 segmentos (tronco celíaco e mesentéricas).         */

// eixo de tempo — linear até a semana de "quebra"; depois comprimido
// (o período fetal S13→S38 tem poucos eventos discretos)
const WEEK_MIN  = 1;
const WEEK_MAX  = 38;
const WK_BREAK  = 13;            // a partir daqui a escala comprime
const PXW_EARLY = 165;           // px/semana no período embrionário (S1–S13)
const PXW_FETAL = 44;            // px/semana no período fetal (S13–S38)
const LABEL_W   = 212;           // gutter esquerdo (rótulos das lanes)
const TIME_X0   = LABEL_W + 40;  // x da semana 1
const BREAK_X   = TIME_X0 + (WK_BREAK - WEEK_MIN) * PXW_EARLY;
const weekToX = (w: number) =>
  w <= WK_BREAK
    ? TIME_X0 + (w - WEEK_MIN) * PXW_EARLY
    : BREAK_X + (w - WK_BREAK) * PXW_FETAL;

// barras
const MIN_W     = 82;            // largura mínima da barra
const MAX_LABEL = 210;           // largura máxima do rótulo (pode exceder a barra)
const ROW_H     = 56;            // altura de uma barra
const ROW_GAP   = 8;             // gap entre sub-linhas
const LANE_VPAD = 16;            // padding vertical interno da lane

type Group = "single" | "anterior" | "medio" | "posterior";

// lanes (ordem vertical) + grupo arterial (cor)
const LANES: Array<{ id: string; label: string; group: Group }> = [
  { id:"tubo",      label:"Tubo Primitivo",      group:"single"    },
  { id:"esofago",   label:"Esôfago",             group:"anterior"  },
  { id:"estomago",  label:"Estômago",            group:"anterior"  },
  { id:"figado",    label:"Fígado e Via Biliar", group:"anterior"  },
  { id:"pancreas",  label:"Pâncreas",            group:"anterior"  },
  { id:"duodeno",   label:"Duodeno",             group:"anterior"  },
  { id:"medio",     label:"Intestino Médio",     group:"medio"     },
  { id:"maturacao", label:"Maturação Funcional", group:"medio"     },
  { id:"cloaca",    label:"Cloaca / Reto",       group:"posterior" },
  { id:"canal",     label:"Canal Anal",          group:"posterior" },
];

// evento → lane
const LANE_OF: Record<string, string> = {
  fecundacao:"tubo", bilaminar:"tubo", trilaminar:"tubo", gi01:"tubo", tressegmentos:"tubo",
  gi02_esofago:"esofago", gi05:"esofago", gi10_esofago:"esofago",
  gi02_estomago:"estomago", rotacao:"estomago",
  gi03:"figado", gi13:"figado",
  gi04:"pancreas", gi07_pancreas:"pancreas",
  gi07_duodeno:"duodeno", gi10_duodeno:"duodeno",
  hernia:"medio", gi12:"medio",
  gi14:"maturacao",
  cloaca:"cloaca",
  gi11:"canal",
};

const TRACK_COLOR: Record<string, string> = {
  single: C.single, anterior: C.anterior, medio: C.medio, posterior: C.posterior,
};

const GROUP_META: Record<Group, { label: string; sub: string; color: string }> = {
  single:    { label:"Fase 1",           sub:"Tubo Primitivo",      color:C.single    },
  anterior:  { label:"Tronco Celíaco",   sub:"Intestino Anterior",  color:C.anterior  },
  medio:     { label:"A. Mes. Superior", sub:"Intestino Médio",     color:C.medio     },
  posterior: { label:"A. Mes. Inferior", sub:"Intestino Posterior", color:C.posterior },
};

const LANE_GAP  = 12;
const GROUP_GAP = 22;
const TOP_PAD   = 18;

const eventsOfLane = (laneId: string) =>
  EVENTS.filter(e => LANE_OF[e.id] === laneId)
        .sort((a, b) => (a.startWeek - b.startWeek) || (a.day - b.day));

// empilhamento em sub-linhas (agendamento guloso de intervalos)
const ROW_OF: Record<string, number> = {};
const ROWS_IN_LANE: Record<string, number> = {};
for (const lane of LANES) {
  const rowEnds: number[] = [];   // última semana ocupada por cada sub-linha
  for (const e of eventsOfLane(lane.id)) {
    let r = rowEnds.findIndex(end => e.startWeek >= end);
    if (r === -1) { r = rowEnds.length; rowEnds.push(e.endWeek); }
    else rowEnds[r] = e.endWeek;
    ROW_OF[e.id] = r;
  }
  ROWS_IN_LANE[lane.id] = Math.max(1, rowEnds.length);
}

const laneHeight = (laneId: string) =>
  ROWS_IN_LANE[laneId] * ROW_H + (ROWS_IN_LANE[laneId] - 1) * ROW_GAP + LANE_VPAD * 2;

// posição vertical das lanes (altura variável conforme nº de sub-linhas)
const LANE_Y: Record<string, number> = {};
const LANE_H: Record<string, number> = {};
{
  let y = TOP_PAD;
  let prev: Group | null = null;
  for (const lane of LANES) {
    if (prev && lane.group !== prev) y += GROUP_GAP;
    LANE_Y[lane.id] = y;
    LANE_H[lane.id] = laneHeight(lane.id);
    y += LANE_H[lane.id] + LANE_GAP;
    prev = lane.group;
  }
}

// barras: x e largura pelo tempo; y pela sub-linha.
// labelW deixa o rótulo de barras curtas transbordar até a próxima barra da sub-linha.
const NODE_POS: Record<string, { x: number; y: number; w: number; h: number; row: number; labelW: number }> = {};
for (const lane of LANES) {
  for (let r = 0; r < ROWS_IN_LANE[lane.id]; r++) {
    const bars = eventsOfLane(lane.id).filter(e => ROW_OF[e.id] === r);
    bars.forEach((e, i) => {
      const x = weekToX(e.startWeek);
      const w = Math.max(MIN_W, weekToX(e.endWeek) - x);
      const next = bars[i + 1];
      const room = next ? weekToX(next.startWeek) - x : Infinity;
      const labelW = Math.max(w, Math.min(MAX_LABEL, room - 10));
      const y = LANE_Y[lane.id] + LANE_VPAD + r * (ROW_H + ROW_GAP);
      NODE_POS[e.id] = { x, y, w, h: ROW_H, row: r, labelW };
    });
  }
}

// ramificação: o tubo primitivo (S1→S4) divide-se nos 3 segmentos em ~S4
const BRANCH_X = weekToX(4);

// faixas verticais por grupo arterial (rótulos/brackets à esquerda + ramificação)
const GROUP_SPAN: Array<{ group: Group; top: number; bottom: number; cy: number }> = (() => {
  const acc: Partial<Record<Group, { top: number; bottom: number }>> = {};
  for (const lane of LANES) {
    const top = LANE_Y[lane.id], bottom = top + LANE_H[lane.id];
    const s = acc[lane.group];
    acc[lane.group] = s
      ? { top: Math.min(s.top, top), bottom: Math.max(s.bottom, bottom) }
      : { top, bottom };
  }
  return (Object.keys(acc) as Group[]).map(group => {
    const s = acc[group]!;
    return { group, top: s.top, bottom: s.bottom, cy: (s.top + s.bottom) / 2 };
  });
})();
const groupCY = (g: Group) => GROUP_SPAN.find(s => s.group === g)!.cy;

const LANES_BOTTOM = Math.max(...LANES.map(l => LANE_Y[l.id] + LANE_H[l.id]));
const CARDS_RIGHT  = Math.max(...Object.values(NODE_POS).map(p => p.x + p.w));
const CANVAS_W = Math.max(weekToX(WEEK_MAX) + 70, CARDS_RIGHT + 60);
const CANVAS_H = LANES_BOTTOM + 16;

/* ─── WEEK RULER TICKS — escala de tempo linear contínua (S1 … S38) ────────── */
const LABELED_WEEKS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 20, 24, 28, 38]);
const RULER_TICKS: Array<{ x: number; label: string; major: boolean }> =
  Array.from({ length: WEEK_MAX - WEEK_MIN + 1 }, (_, i) => {
    const w = WEEK_MIN + i;
    const labeled = LABELED_WEEKS.has(w);
    return { x: weekToX(w), label: labeled ? `S${w}` : "", major: labeled };
  });

/* ─── APP ────────────────────────────────────────────────────────────────── */
export default function App() {
  const [scale,      setScale]      = useState(0.62);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered,   setAnswered]   = useState<Set<string>>(new Set());
  const [hoveredId,  setHoveredId]  = useState<string | null>(null);
  const [rulerSL,    setRulerSL]    = useState(0);

  const scrollRef    = useRef<HTMLDivElement>(null);
  const wasDragging  = useRef(false);

  const markAnswered = (id: string) =>
    setAnswered(prev => new Set([...prev, id]));

  /* ── drag-to-pan ─────────────────────────────────────────────────────── */
  const startDrag = (e: React.MouseEvent) => {
    wasDragging.current = false;            // always reset BEFORE the early-return guard
    if ((e.target as HTMLElement).closest("[data-node]")) return;
    const el = scrollRef.current!;
    const sx = e.pageX + el.scrollLeft;
    const sy = e.pageY + el.scrollTop;
    const onMove = (me: MouseEvent) => {
      const dx = Math.abs(me.pageX - e.pageX);
      const dy = Math.abs(me.pageY - e.pageY);
      if (dx > 3 || dy > 3) wasDragging.current = true;
      el.style.cursor = "grabbing";
      el.scrollLeft   = sx - me.pageX;
      el.scrollTop    = sy - me.pageY;
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
      el.style.cursor = "grab";
    };
    el.style.cursor = "grabbing";
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
  };

  /* ── zoom (Ctrl+scroll, centred on cursor) ───────────────────────────── */
  const handleWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const rect  = el.getBoundingClientRect();
    const mx    = e.clientX - rect.left;
    const my    = e.clientY - rect.top;
    const oldSL = el.scrollLeft;
    const oldST = el.scrollTop;
    setScale(prev => {
      const next = Math.max(0.25, Math.min(1.8, prev - e.deltaY * 0.002));
      requestAnimationFrame(() => {
        const el2 = scrollRef.current;
        if (!el2) return;
        el2.scrollLeft = (mx + oldSL) / prev * next - mx;
        el2.scrollTop  = (my + oldST) / prev * next - my;
      });
      return next;
    });
  };

  /* ── zoom buttons (centred on viewport centre) ───────────────────────── */
  const zoom = (delta: number) => {
    const el = scrollRef.current;
    if (!el) { setScale(s => Math.max(0.25, Math.min(1.8, s + delta))); return; }
    const cx    = el.clientWidth  / 2;
    const cy    = el.clientHeight / 2;
    const oldSL = el.scrollLeft;
    const oldST = el.scrollTop;
    setScale(prev => {
      const next = Math.max(0.25, Math.min(1.8, prev + delta));
      requestAnimationFrame(() => {
        const el2 = scrollRef.current;
        if (!el2) return;
        el2.scrollLeft = (cx + oldSL) / prev * next - cx;
        el2.scrollTop  = (cy + oldST) / prev * next - cy;
      });
      return next;
    });
  };

  /* ── ruler sync ──────────────────────────────────────────────────────── */
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setRulerSL(e.currentTarget.scrollLeft);
  };

  const totalAnswered = answered.size;
  const totalEvents   = EVENTS.length;
  const selectedEvent = selectedId ? EVENTS.find(ev => ev.id === selectedId) ?? null : null;

  return (
    <div style={{
      width:"100%", height:"100vh",
      display:"flex", flexDirection:"column",
      background:C.bg, fontFamily:"'Inter',-apple-system,sans-serif",
      color:C.text, overflow:"hidden",
    }}>

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <div style={{ position:"relative", padding:"11px 20px 9px", flexShrink:0, overflow:"hidden" }}>
        {[
          { left:-30, color:"#3b82f6", w:260, h:160 },
          { left:180, color:"#06b6d4", w:220, h:130 },
          { left:370, color:"#d7eb00", w:180, h:120 },
        ].map((b, i) => (
          <div key={i} style={{
            position:"absolute", top:-50, left:b.left, pointerEvents:"none",
            width:b.w, height:b.h,
            background:`radial-gradient(ellipse,${b.color}44 0%,transparent 70%)`,
            filter:"blur(36px)",
          }} />
        ))}

        <div style={{ position:"relative", display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
          <div style={{ minWidth:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:C.branch, boxShadow:`0 0 8px ${C.branch}`, flexShrink:0 }} />
              <span style={{ fontSize:9, color:C.muted, letterSpacing:2.5, textTransform:"uppercase", fontWeight:700 }}>
                Embriologia · Sistema Digestório · Seminário 4
              </span>
            </div>
            <h1 style={{ margin:0, fontSize:19, fontWeight:800, color:C.text, letterSpacing:-0.5, lineHeight:1.2 }}>
              Embriogênese do Sistema Digestório
            </h1>
          </div>

          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
            {/* progress pill */}
            <div style={{
              display:"flex", alignItems:"center", gap:8,
              padding:"5px 12px", borderRadius:20,
              background:C.card, border:`1px solid ${C.border}`,
            }}>
              <div style={{ width:56, height:3, borderRadius:4, background:C.border, overflow:"hidden" }}>
                <div style={{
                  height:"100%", borderRadius:4,
                  width:`${(totalAnswered / totalEvents) * 100}%`,
                  background:`linear-gradient(90deg,${C.anterior},${C.medio})`,
                  transition:"width .4s",
                }} />
              </div>
              <span style={{ fontSize:10, color:C.text, fontWeight:600 }}>
                {totalAnswered}/{totalEvents} respondidas
              </span>
            </div>

            {/* zoom controls */}
            <div style={{
              display:"flex", alignItems:"center", gap:4,
              padding:"3px 8px", borderRadius:10,
              background:C.card, border:`1px solid ${C.border}`,
            }}>
              <ZBtn onClick={() => zoom(-0.1)}>−</ZBtn>
              <button
                onClick={() => setScale(0.62)}
                title="Resetar zoom"
                style={{
                  fontSize:9, color:C.muted, width:44, textAlign:"center",
                  background:"none", border:"none", cursor:"pointer",
                  fontFamily:"inherit", fontWeight:600, letterSpacing:0.3,
                }}
              >
                {Math.round(scale * 100)}%
              </button>
              <ZBtn onClick={() => zoom(+0.1)}>+</ZBtn>
            </div>

            <span style={{ fontSize:8.5, color:C.muted, opacity:.4, whiteSpace:"nowrap" }}>Ctrl+scroll</span>
          </div>
        </div>
      </div>

      {/* ── WEEK RULER ───────────────────────────────────────────────────── */}
      <div style={{
        flexShrink:0, height:34, overflow:"hidden",
        borderTop:`1px solid ${C.border}`,
        borderBottom:`1px solid ${C.border}`,
        background:`${C.bg}f0`,
        position:"relative", zIndex:10,
      }}>
        {/* "SEMANAS" label — fades out over the ticks */}
        <div style={{
          position:"absolute", left:0, top:0, bottom:0, width:76,
          display:"flex", alignItems:"center", paddingLeft:14,
          background:`linear-gradient(to right, ${C.bg} 60%, transparent)`,
          zIndex:2, pointerEvents:"none",
        }}>
          <span style={{ fontSize:7, color:C.muted, fontWeight:700, letterSpacing:1.8, textTransform:"uppercase", opacity:.45 }}>
            SEMANAS
          </span>
        </div>

        {/* scrollable tick strip */}
        <div style={{
          position:"absolute", top:0, left:0,
          width:CANVAS_W * scale, height:34,
          transform:`translateX(-${rulerSL}px)`,
        }}>
          {/* baseline */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:C.border }} />

          {RULER_TICKS.map((tick, i) => {
            const tx = tick.x * scale;
            return (
              <div key={i} style={{
                position:"absolute", left:tx, bottom:0,
                display:"flex", flexDirection:"column", alignItems:"center",
                transform:"translateX(-50%)",
                pointerEvents:"none",
              }}>
                <span style={{
                  fontSize: 8,
                  color: `${C.text}bb`,
                  fontWeight: 700,
                  letterSpacing: 0.3,
                  marginBottom: 4,
                  whiteSpace:"nowrap",
                }}>
                  {tick.label}
                </span>
                <div style={{
                  width: 1,
                  height: tick.major ? 10 : 5,
                  background: tick.major ? `${C.text}55` : `${C.muted}44`,
                  borderRadius: 1,
                }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CANVAS ───────────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        onMouseDown={startDrag}
        onWheel={handleWheel}
        onScroll={handleScroll}
        style={{
          flex:1, overflow:"auto", cursor:"grab", position:"relative",
          scrollbarWidth:"thin", scrollbarColor:`${C.card} ${C.bg}`,
        }}
      >
        {/* scroll-size wrapper */}
        <div style={{
          position:"relative",
          width:  Math.max(CANVAS_W * scale, 10),
          height: Math.max(CANVAS_H * scale, 10),
          minWidth:"100%", minHeight:"100%",
        }}>
          {/* scaled canvas */}
          <div style={{
            position:"absolute", top:0, left:0,
            width:CANVAS_W, height:CANVAS_H,
            transformOrigin:"0 0",
            transform:`scale(${scale})`,
          }}>

            {/* dot grid */}
            <div style={{
              position:"absolute", inset:0, pointerEvents:"none",
              backgroundImage:"radial-gradient(circle,rgba(0,0,0,0.04) 1px,transparent 1px)",
              backgroundSize:"28px 28px",
            }} />

            {/* lane bands */}
            {LANES.map(lane => {
              const color = TRACK_COLOR[lane.group];
              return (
                <div key={lane.id} style={{
                  position:"absolute", left:0, right:0,
                  top:LANE_Y[lane.id], height:LANE_H[lane.id],
                  background:`linear-gradient(to right, ${color}12, ${color}07 45%, transparent)`,
                  borderTop:`1px solid ${color}14`,
                  borderBottom:`1px solid ${color}14`,
                  pointerEvents:"none",
                }} />
              );
            })}

            {/* group accent bars + rotated group labels */}
            {GROUP_SPAN.map(({ group, top, bottom }) => {
              const meta = GROUP_META[group];
              return (
                <div key={group} style={{ pointerEvents:"none" }}>
                  <div style={{
                    position:"absolute", left:16, top:top + 3,
                    width:3, height:(bottom - top) - 6, borderRadius:2,
                    background:meta.color, opacity:0.85,
                    boxShadow:`0 0 10px ${meta.color}66`,
                  }} />
                  <div style={{
                    position:"absolute", left:-4, top, width:20, height:bottom - top,
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <span style={{
                      transform:"rotate(-90deg)", whiteSpace:"nowrap",
                      fontSize:8.5, fontWeight:800, letterSpacing:1.6,
                      textTransform:"uppercase", color:meta.color, opacity:0.92,
                    }}>
                      {meta.label}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* lane labels (gutter) */}
            {LANES.map(lane => {
              const color = TRACK_COLOR[lane.group];
              return (
                <div key={`lbl-${lane.id}`} style={{
                  position:"absolute", left:30, top:LANE_Y[lane.id],
                  width:LABEL_W - 40, height:LANE_H[lane.id],
                  display:"flex", flexDirection:"column", justifyContent:"center",
                  pointerEvents:"none",
                }}>
                  <span style={{ fontSize:12.5, fontWeight:700, color:C.text, letterSpacing:-0.2, lineHeight:1.2 }}>
                    {lane.label}
                  </span>
                  <span style={{ fontSize:7.5, fontWeight:600, color:`${color}aa`, letterSpacing:0.6, textTransform:"uppercase", marginTop:3 }}>
                    {GROUP_META[lane.group].sub}
                  </span>
                </div>
              );
            })}

            {/* gutter divider */}
            <div style={{
              position:"absolute", left:LABEL_W, top:0, height:CANVAS_H, width:1,
              background:`${C.text}12`, pointerEvents:"none",
            }} />

            {/* marcador de quebra de escala (período fetal comprimido) */}
            <div style={{
              position:"absolute", left:BREAK_X, top:0, height:CANVAS_H, width:0,
              borderLeft:`1px dashed ${C.muted}77`, pointerEvents:"none",
            }} />
            <div style={{
              position:"absolute", left:BREAK_X + 6, top:LANE_Y["tubo"] + 4,
              fontSize:7.5, fontWeight:600, color:C.muted, opacity:0.7,
              letterSpacing:0.4, whiteSpace:"nowrap", pointerEvents:"none",
            }}>
              ⟿ período fetal (escala comprimida)
            </div>

            {/* ── WITHIN-LANE CONNECTORS ───────────────────────────────── */}
            <svg style={{ position:"absolute", inset:0, overflow:"visible" }} width={CANVAS_W} height={CANVAS_H}>
              <defs>
                {(["single","anterior","medio","posterior"] as Group[]).map(g => (
                  <marker key={g} id={`arr-${g}`}
                    markerWidth="9" markerHeight="9" refX="8" refY="4.5"
                    orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M0,1 L8,4.5 L0,8 z" fill={TRACK_COLOR[g]} opacity={0.7} />
                  </marker>
                ))}
              </defs>
              {LANES.flatMap(lane => {
                const color = TRACK_COLOR[lane.group];
                const out: React.ReactNode[] = [];
                for (let r = 0; r < ROWS_IN_LANE[lane.id]; r++) {
                  const bars = eventsOfLane(lane.id)
                    .filter(e => ROW_OF[e.id] === r)
                    .map(e => NODE_POS[e.id])
                    .sort((a, b) => a.x - b.x);
                  for (let i = 1; i < bars.length; i++) {
                    const prev = bars[i - 1], cur = bars[i];
                    const x1 = prev.x + prev.w, x2 = cur.x;
                    if (x2 - x1 < 4) continue;
                    const cy = cur.y + cur.h / 2;
                    out.push(
                      <line key={`conn-${lane.id}-${r}-${i}`}
                        x1={x1} y1={cy} x2={x2} y2={cy}
                        stroke={color} strokeWidth={2} strokeLinecap="round"
                        markerEnd={`url(#arr-${lane.group})`} opacity={0.45}
                      />
                    );
                  }
                }
                return out;
              })}

              {/* ── ramificação: tubo primitivo (S1→S4) → 3 segmentos ──────── */}
              <line
                x1={BRANCH_X} y1={groupCY("single")} x2={BRANCH_X} y2={groupCY("posterior")}
                stroke={C.branch} strokeWidth={2} strokeDasharray="4 5" opacity={0.45}
              />
              <circle cx={BRANCH_X} cy={groupCY("single")} r={4.5} fill={C.branch} opacity={0.95} />
              {(["anterior", "medio", "posterior"] as Group[]).map(g => (
                <g key={`branch-${g}`}>
                  <line
                    x1={BRANCH_X} y1={groupCY(g)} x2={BRANCH_X + 34} y2={groupCY(g)}
                    stroke={TRACK_COLOR[g]} strokeWidth={2} strokeLinecap="round"
                    markerEnd={`url(#arr-${g})`} opacity={0.75}
                  />
                  <circle cx={BRANCH_X} cy={groupCY(g)} r={3.5} fill={TRACK_COLOR[g]} opacity={0.9} />
                </g>
              ))}
            </svg>

            {/* ── EVENT CARDS (barras) ─────────────────────────────────── */}
            {EVENTS.map(ev => {
              const pos      = NODE_POS[ev.id];
              if (!pos) return null;
              const isBranch = ev.id === "tressegmentos";
              const color    = isBranch ? C.branch : TRACK_COLOR[ev.track];
              const sel      = selectedId === ev.id;
              const hov      = hoveredId  === ev.id;
              const done     = answered.has(ev.id);

              return (
                <div
                  key={ev.id}
                  data-node="1"
                  title={ev.title}
                  onClick={() => { if (!wasDragging.current) setSelectedId(ev.id); }}
                  onMouseEnter={() => setHoveredId(ev.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    position:"absolute",
                    left:pos.x, top:pos.y,
                    width:pos.w, height:pos.h,
                    borderRadius:10,
                    background: sel ? `${color}26` : hov ? `${color}1e` : isBranch ? `${color}18` : `${color}12`,
                    border:`1.5px solid ${sel || hov ? color : color + "4a"}`,
                    boxShadow: sel
                      ? `0 0 0 2px ${color}44, 0 0 30px ${color}55, 0 4px 18px #00000055`
                      : hov
                        ? `0 0 0 1px ${color}33, 0 0 18px ${color}44, 0 3px 14px #00000055`
                        : isBranch
                          ? `0 0 16px ${color}33, 0 2px 10px #00000044`
                          : `0 2px 10px #00000044`,
                    cursor:"pointer",
                    transition:"border-color .12s, box-shadow .15s, background .12s",
                    zIndex: sel ? 7 : hov ? 6 : isBranch ? 5 : 4,
                    userSelect:"none",
                  }}
                >
                  {/* accent bar */}
                  <div style={{
                    position:"absolute", left:0, top:0, bottom:0, width:3,
                    borderRadius:"10px 0 0 10px",
                    background:color, opacity: sel || hov ? 1 : 0.55,
                  }} />

                  {/* conteúdo — pode transbordar barras curtas até a próxima barra */}
                  <div style={{
                    position:"absolute", left:12, top:0, height:"100%",
                    width:Math.max(pos.labelW - 16, 40),
                    display:"flex", flexDirection:"column", justifyContent:"center", gap:3,
                    overflow:"hidden",
                  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                      <span style={{ fontSize:13, lineHeight:1, filter:`drop-shadow(0 0 5px ${color}88)` }}>
                        {ev.organIcon}
                      </span>
                      <span style={{ fontSize:7.5, fontWeight:700, color:`${color}cc`, letterSpacing:0.8 }}>
                        {ev.code}
                      </span>
                      {done && (
                        <span style={{ marginLeft:2, fontSize:9, color:"#22c55e", fontWeight:700, lineHeight:1 }}>✓</span>
                      )}
                    </div>
                    <div style={{
                      fontSize:10, fontWeight:700,
                      color: sel || hov ? C.text : `${C.text}d0`,
                      lineHeight:1.18,
                      display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical",
                      overflow:"hidden", textOverflow:"ellipsis",
                    }}>
                      {ev.title}
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <div style={{
        padding:"5px 20px 7px", flexShrink:0,
        borderTop:`1px solid ${C.border}`,
        display:"flex", alignItems:"center", gap:16, flexWrap:"wrap",
      }}>
        {[
          { label:"Fase 1 · Tubo Primitivo",           color:C.single    },
          { label:"Tronco Celíaco (Int. Anterior)",     color:C.anterior  },
          { label:"A. Mes. Superior (Int. Médio)",      color:C.medio     },
          { label:"A. Mes. Inferior (Int. Posterior)",  color:C.posterior },
        ].map(({ label, color }) => (
          <div key={label} style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:8, height:8, borderRadius:3, background:color, opacity:0.75 }} />
            <span style={{ fontSize:9, color:C.muted }}>{label}</span>
          </div>
        ))}
        <div style={{ marginLeft:"auto", fontSize:9, color:C.muted, opacity:.4, whiteSpace:"nowrap" }}>
          ← arraste · Ctrl+scroll para zoom →
        </div>
      </div>

      {/* ── MODAL ────────────────────────────────────────────────────────── */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedId(null)}
          onAnswered={markAnswered}
          preAnswered={answered.has(selectedEvent.id)}
        />
      )}
    </div>
  );
}

/* ─── ZOOM BUTTON ────────────────────────────────────────────────────────── */
function ZBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      width:24, height:24, borderRadius:6,
      background:"rgba(0,0,0,0.05)",
      border:"1px solid rgba(0,0,0,0.1)",
      color:"#475569", fontSize:16, cursor:"pointer",
      display:"inline-flex", alignItems:"center", justifyContent:"center",
      fontFamily:"inherit", lineHeight:1, padding:0,
    }}>
      {children}
    </button>
  );
}
