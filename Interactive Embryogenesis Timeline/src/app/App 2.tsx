import { useState, useRef } from "react";
import { EventDetailModal } from "./components/event-modal";
import { EventDef } from "./types";

/* ─── TOKENS ─────────────────────────────────────────────────────────────── */
const C = {
  bg:        "#070d1a",
  card:      "#0d1829",
  border:    "rgba(255,255,255,0.07)",
  text:      "#f1f5f9",
  muted:     "#475569",
  anterior:  "#3b82f6",
  medio:     "#06b6d4",
  posterior: "#818cf8",
  branch:    "#d7eb00",
  single:    "#64748b",
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
    id:"gi01", code:"GI-01", title:"Formação do Intestino Primitivo",
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
    id:"gi02", code:"GI-02", title:"Primórdios do Estômago e Esôfago",
    organ:"Estômago / Esôfago", organIcon:"🟠", track:"anterior",
    startWeek:4.1, endWeek:4.9, day:26,
    period:"Semana 4 — Dia 26",
    mainEvent:"No dia 26, o intestino anterior apresenta uma dilatação fusiforme que origina o primórdio do estômago; o segmento cranial torna-se o primórdio do esôfago, que alonga-se rapidamente nas semanas 5–7.",
    development:[
      "**Dia 26:** dilatação fusiforme do intestino anterior → primórdio do **estômago**",
      "Segmento cranial ao estômago → primórdio do **esôfago** (inicialmente ≈3mm)",
      "Esôfago alonga-se nas semanas 5–7 conforme coração e pulmões deslocam-se caudalmente",
      "**Semana 7:** esôfago atinge comprimento relativo definitivo",
      "Parede esofágica: 1/3 superior = músculo **estriado** (arcos faríngeos); 2/3 inferiores = músculo **liso** (mesoderma esplâncnico)",
      "Inervação: nervo **vago (X)** — redistribuído pela rotação gástrica (ver GI-06)",
    ],
    images:[
      {src:"/eventos/GI-02_moore_p271_img1.jpeg", caption:"Embrião em corte sagital: regiões esofágica e gástrica do intestino anterior e a irrigação (tronco celíaco, AMS, AMI)."},
      {src:"/eventos/GI-02_langman_p344_img1.jpeg", caption:"Primórdios de esôfago, estômago e pâncreas e o padrão molecular de regionalização (SOX2/PDX1/CDX/HOX)."},
      {src:"/eventos/GI-02_moore_p193_img1.jpeg", caption:"Cortes transversais do intestino anterior: estômago, mesentério ventral e artéria do intestino anterior."},
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
    id:"recanalizacao", code:"GI-07", title:"Rotação do Duodeno e Fusão Pancreática",
    organ:"Duodeno / Pâncreas", organIcon:"🔓", track:"anterior",
    startWeek:5, endWeek:7, day:35,
    period:"Semanas 5–7",
    mainEvent:"Com a rotação gástrica, o duodeno gira no sentido horário, fixa-se retroperitonealmente em alça em C, e o broto pancreático ventral migra posteriormente fundindo-se com o broto dorsal. O duodeno sofre obstrução fisiológica transitória entre as semanas 5 e 8.",
    development:[
      "Duodeno primitivo (intestino anterior + médio) forma **alça em C** voltada para a direita",
      "Duodeno gira **no sentido horário** → move-se para a **direita** e torna-se **retroperitoneal**",
      "Broto pancreático ventral gira **posteriormente** ao redor do duodeno → encontra broto dorsal → **fusão**",
      "O duodeno sofre **obstrução fisiológica** (proliferação epitelial sólida) entre as semanas 5–8",
      "**Atresia duodenal:** falha completa de recanalização → vômitos biliosos neonatais → sinal da **'dupla bolha'** ao ultrassom → **associada à síndrome de Down** (trissomia 21) em 30% dos casos",
      "**Estenose duodenal:** falha parcial → obstrução incompleta → sintomas mais tardios",
    ],
    images:[
      {src:"/eventos/GI-01_langman_p356_img1.jpeg", caption:"Rotação duodenal em corte transversal: duodeno e pâncreas tornam-se retroperitoneais."},
      {src:"/eventos/GI-07_langman_p362_img1.jpeg", caption:"Pâncreas definitivo após a fusão dos brotos ventral e dorsal e seus ductos."},
      {src:"/eventos/GI-07_moore_p278_img1.jpeg", caption:"Ultrassom pré-natal — sinal da 'dupla bolha' (estômago + duodeno) na atresia duodenal."},
    ],
    question:"A falha na recanalização do duodeno origina qual malformação, reconhecida pelo sinal da 'dupla bolha' na radiografia?",
    options:[{letter:"a",text:"Megacólon"},{letter:"b",text:"Atresia esofágica"},{letter:"c",text:"Atresia duodenal"},{letter:"d",text:"Hérnia de Bochdalek"}],
    correctIndex:2,
    explanation:"A fase sólida do duodeno não recanalizada resulta em atresia duodenal. O sinal da dupla bolha reflete o estômago e o duodeno proximal distendidos. Associada a síndrome de Down em 30% dos casos.",
  },
  {
    id:"gi10", code:"GI-10", title:"Recanalização do Esôfago e Duodeno",
    organ:"Esôfago / Duodeno", organIcon:"💧", track:"anterior",
    startWeek:8, endWeek:8.5, day:56,
    period:"Semana 8",
    mainEvent:"Na semana 8, vacúolos surgem no epitélio do esôfago e do duodeno — previamente obliterados por proliferação epitelial — e coalescem, restaurando os lúmens (recanalização). A falha gera atresia ou estenose.",
    development:[
      "Semanas 5–8: esôfago e duodeno sofrem **obliteração transitória** por proliferação epitelial intensa",
      "**Semana 8:** vacúolos surgem → coalescem → lúmen restaurado (recanalização)",
      "Simultâneo ao retorno das alças intestinais e à fixação gástrica final",
      "**Atresia esofágica** (falha de recanalização) — ver GI-05 (septação traqueoesofágica)",
      "**Atresia/estenose duodenal** (falha de recanalização) — ver GI-07 (rotação duodenal)",
      "Atresia intestinal pode resultar de falha de recanalização **OU** de **isquemia vascular** durante a herniação umbilical",
    ],
    images:[
      {src:"/eventos/GI-10_moore_p277_img1.jpeg", caption:"Recanalização do duodeno: tampão epitelial → vacúolos → lúmen normal, estenose ou atresia."},
      {src:"/eventos/GI-01_langman_p356_img2.jpeg", caption:"Estágio sólido e recanalização do tubo intestinal por coalescência de vacúolos."},
    ],
    question:"A atresia duodenal por falha de recanalização produz qual achado radiológico característico?",
    options:[{letter:"a",text:"Sinal da 'dupla bolha'"},{letter:"b",text:"Pneumoperitônio"},{letter:"c",text:"Sinal do 'grão de café'"},{letter:"d",text:"Imagem em 'pilha de moedas'"}],
    correctIndex:0,
    explanation:"O duodeno passa por uma fase sólida (semanas 5–8); se não recanaliza, surge atresia duodenal → estômago e duodeno proximal distendidos = sinal da 'dupla bolha'. Associa-se à trissomia 21 (síndrome de Down).",
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

/* ─── LAYOUT CONSTANTS ───────────────────────────────────────────────────── */
const NW = 176;
const NH = 72;
const HW = 164;
const HH = 50;

const ANT_CY  = 148;
const P1_CY   = 310;
const POST_CY = 472;

const P1_XS = [60, 296, 532, 768, 1004];

const TRESS_RX = P1_XS[4] + NW;       // 1180
const HUB_LX   = TRESS_RX + 80;       // 1260
const HUB_RX   = HUB_LX + HW;         // 1424
const P2_LX    = HUB_RX + 64;         // 1488
const P2_SP    = 240;

const CANVAS_W = P2_LX + P2_SP * 7 + NW + 90;  // 3434
const CANVAS_H = 620;

const NODE_POS: Record<string, { x: number; y: number }> = {
  fecundacao:    { x: P1_XS[0], y: P1_CY   - NH / 2 },
  bilaminar:     { x: P1_XS[1], y: P1_CY   - NH / 2 },
  trilaminar:    { x: P1_XS[2], y: P1_CY   - NH / 2 },
  gi01:          { x: P1_XS[3], y: P1_CY   - NH / 2 },
  tressegmentos: { x: P1_XS[4], y: P1_CY   - NH / 2 },
  gi02:          { x: P2_LX + P2_SP * 0, y: ANT_CY  - NH / 2 },
  gi03:          { x: P2_LX + P2_SP * 1, y: ANT_CY  - NH / 2 },
  gi04:          { x: P2_LX + P2_SP * 2, y: ANT_CY  - NH / 2 },
  gi05:          { x: P2_LX + P2_SP * 3, y: ANT_CY  - NH / 2 },
  rotacao:       { x: P2_LX + P2_SP * 4, y: ANT_CY  - NH / 2 },
  recanalizacao: { x: P2_LX + P2_SP * 5, y: ANT_CY  - NH / 2 },
  gi10:          { x: P2_LX + P2_SP * 6, y: ANT_CY  - NH / 2 },
  gi13:          { x: P2_LX + P2_SP * 7, y: ANT_CY  - NH / 2 },
  hernia:        { x: P2_LX + P2_SP * 0, y: P1_CY   - NH / 2 },
  gi12:          { x: P2_LX + P2_SP * 1, y: P1_CY   - NH / 2 },
  gi14:          { x: P2_LX + P2_SP * 2, y: P1_CY   - NH / 2 },
  cloaca:        { x: P2_LX + P2_SP * 0, y: POST_CY - NH / 2 },
  gi11:          { x: P2_LX + P2_SP * 1, y: POST_CY - NH / 2 },
};

const HUBS = [
  { id:"hub-anterior",  label:"Tronco Celíaco",   sub:"Intestino Anterior",  color:C.anterior,  cy:ANT_CY  },
  { id:"hub-medio",     label:"A. Mes. Superior", sub:"Intestino Médio",     color:C.medio,     cy:P1_CY   },
  { id:"hub-posterior", label:"A. Mes. Inferior", sub:"Intestino Posterior", color:C.posterior, cy:POST_CY },
];

const TRACK_COLOR: Record<string, string> = {
  single: C.single, anterior: C.anterior, medio: C.medio, posterior: C.posterior,
};

/* ─── WEEK RULER TICKS ───────────────────────────────────────────────────── */
const RULER_TICKS: Array<{ x: number; label: string; major: boolean; branch?: boolean }> = [
  { x: P1_XS[0] + NW / 2,          label: "Sem 1",   major: true  },
  { x: P1_XS[1] + NW / 2,          label: "Sem 2",   major: true  },
  { x: P1_XS[2] + NW / 2,          label: "Sem 3",   major: true  },
  { x: P1_XS[3] + NW / 2,          label: "Sem 4",   major: true  },
  { x: P1_XS[4] + NW / 2,          label: "Sem 4–5", major: false },
  { x: HUB_LX + HW / 2,            label: "↓ ramos", major: false, branch: true },
  { x: P2_LX + P2_SP * 0 + NW / 2, label: "S4–6",    major: false },
  { x: P2_LX + P2_SP * 1 + NW / 2, label: "S4–10",   major: false },
  { x: P2_LX + P2_SP * 2 + NW / 2, label: "S5–16",   major: false },
  { x: P2_LX + P2_SP * 3 + NW / 2, label: "S4–5",    major: false },
  { x: P2_LX + P2_SP * 4 + NW / 2, label: "S5–7",    major: false },
  { x: P2_LX + P2_SP * 5 + NW / 2, label: "S5–7",    major: false },
  { x: P2_LX + P2_SP * 6 + NW / 2, label: "Sem 8",   major: true  },
  { x: P2_LX + P2_SP * 7 + NW / 2, label: "Sem 10",  major: true  },
];

/* ─── BEZIER ─────────────────────────────────────────────────────────────── */
function bz(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
}

/* ─── APP ────────────────────────────────────────────────────────────────── */
export default function App() {
  const [scale,      setScale]      = useState(0.72);
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
              <div style={{ width:56, height:3, borderRadius:4, background:"rgba(255,255,255,0.07)", overflow:"hidden" }}>
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
                onClick={() => setScale(0.72)}
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
            const isBr = !!tick.branch;
            return (
              <div key={i} style={{
                position:"absolute", left:tx, bottom:0,
                display:"flex", flexDirection:"column", alignItems:"center",
                transform:"translateX(-50%)",
                pointerEvents:"none",
              }}>
                <span style={{
                  fontSize: tick.major ? 8 : 7,
                  color: isBr ? C.branch : tick.major ? `${C.text}bb` : `${C.muted}99`,
                  fontWeight: tick.major ? 700 : 400,
                  letterSpacing: 0.3,
                  marginBottom: 4,
                  whiteSpace:"nowrap",
                }}>
                  {tick.label}
                </span>
                <div style={{
                  width: 1,
                  height: tick.major ? 10 : isBr ? 14 : 6,
                  background: isBr ? C.branch : tick.major ? `${C.text}55` : `${C.muted}44`,
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
              backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)",
              backgroundSize:"28px 28px",
            }} />

            {/* lane tint bands */}
            {[
              { cy:ANT_CY,  color:C.anterior  },
              { cy:P1_CY,   color:C.single     },
              { cy:POST_CY, color:C.posterior  },
            ].map(({ cy, color }) => (
              <div key={cy} style={{
                position:"absolute", left:0, right:0,
                top:cy - 56, height:112,
                background:`linear-gradient(to right,${color}09,${color}04,transparent)`,
                pointerEvents:"none",
              }} />
            ))}

            {/* ── SVG CONNECTIONS ──────────────────────────────────────── */}
            <svg style={{ position:"absolute", inset:0, overflow:"visible" }} width={CANVAS_W} height={CANVAS_H}>
              <defs>
                {[
                  { id:"arr-single",    col:C.single    },
                  { id:"arr-anterior",  col:C.anterior  },
                  { id:"arr-medio",     col:C.medio     },
                  { id:"arr-posterior", col:C.posterior },
                ].map(({ id, col }) => (
                  <marker key={id} id={id}
                    markerWidth="10" markerHeight="10"
                    refX="10" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M0,1 L10,5 L0,9 z" fill={col} opacity={0.85} />
                  </marker>
                ))}
              </defs>

              {/* Phase-1 chain */}
              {[0,1,2,3].map(i => (
                <path key={`p1-${i}`}
                  d={bz(P1_XS[i]+NW, P1_CY, P1_XS[i+1], P1_CY)}
                  fill="none" stroke={C.single} strokeWidth={2}
                  strokeLinecap="round" markerEnd="url(#arr-single)" opacity={0.55}
                />
              ))}

              {/* tressegmentos → hubs */}
              {HUBS.map(hub => (
                <path key={`to-${hub.id}`}
                  d={bz(TRESS_RX, P1_CY, HUB_LX, hub.cy)}
                  fill="none" stroke={hub.color} strokeWidth={2.5}
                  strokeLinecap="round"
                  markerEnd={`url(#arr-${hub.id === "hub-anterior" ? "anterior" : hub.id === "hub-medio" ? "medio" : "posterior"})`}
                  opacity={0.9}
                />
              ))}

              {/* hubs → first phase-2 nodes */}
              {[
                { cy:ANT_CY,  color:C.anterior,  mk:"anterior"  },
                { cy:P1_CY,   color:C.medio,     mk:"medio"     },
                { cy:POST_CY, color:C.posterior, mk:"posterior" },
              ].map(({ cy, color, mk }) => (
                <path key={`hub-out-${mk}`}
                  d={bz(HUB_RX, cy, P2_LX, cy)}
                  fill="none" stroke={color} strokeWidth={2.5}
                  strokeLinecap="round" markerEnd={`url(#arr-${mk})`} opacity={0.85}
                />
              ))}

              {/* Anterior chain: 7 connections */}
              {[0,1,2,3,4,5,6].map(i => (
                <path key={`ant-${i}`}
                  d={bz(P2_LX+P2_SP*i+NW, ANT_CY, P2_LX+P2_SP*(i+1), ANT_CY)}
                  fill="none" stroke={C.anterior} strokeWidth={2.5}
                  strokeLinecap="round" markerEnd="url(#arr-anterior)" opacity={0.85}
                />
              ))}

              {/* Medio chain: 2 connections */}
              {[0,1].map(i => (
                <path key={`med-${i}`}
                  d={bz(P2_LX+P2_SP*i+NW, P1_CY, P2_LX+P2_SP*(i+1), P1_CY)}
                  fill="none" stroke={C.medio} strokeWidth={2.5}
                  strokeLinecap="round" markerEnd="url(#arr-medio)" opacity={0.85}
                />
              ))}

              {/* Posterior chain: 1 connection */}
              <path
                d={bz(P2_LX+NW, POST_CY, P2_LX+P2_SP, POST_CY)}
                fill="none" stroke={C.posterior} strokeWidth={2.5}
                strokeLinecap="round" markerEnd="url(#arr-posterior)" opacity={0.85}
              />

              {/* Port dots */}
              {EVENTS.map(ev => {
                const pos = NODE_POS[ev.id];
                if (!pos) return null;
                const color = ev.id === "tressegmentos" ? C.branch : TRACK_COLOR[ev.track];
                const cy = pos.y + NH / 2;
                return (
                  <g key={`ports-${ev.id}`}>
                    <circle cx={pos.x}      cy={cy} r={3} fill={color} opacity={0.25} />
                    <circle cx={pos.x + NW} cy={cy} r={3} fill={color} opacity={0.25} />
                  </g>
                );
              })}
              {HUBS.map(hub => (
                <g key={`hports-${hub.id}`}>
                  <circle cx={HUB_LX} cy={hub.cy} r={3} fill={hub.color} opacity={0.25} />
                  <circle cx={HUB_RX} cy={hub.cy} r={3} fill={hub.color} opacity={0.25} />
                </g>
              ))}
            </svg>

            {/* ── HUB NODES ────────────────────────────────────────────── */}
            {HUBS.map(hub => (
              <div key={hub.id} style={{
                position:"absolute",
                left:HUB_LX, top:hub.cy - HH / 2,
                width:HW, height:HH,
                borderRadius:12,
                background:`${hub.color}18`,
                border:`1.5px solid ${hub.color}`,
                boxShadow:`0 0 28px ${hub.color}28, 0 2px 14px #00000044`,
                display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center",
                gap:2, userSelect:"none",
              }}>
                <span style={{ fontSize:9.5, fontWeight:800, color:hub.color, letterSpacing:0.2 }}>
                  {hub.label}
                </span>
                <span style={{ fontSize:7.5, color:`${hub.color}70`, letterSpacing:0.5 }}>
                  {hub.sub}
                </span>
              </div>
            ))}

            {/* ── EVENT NODES ──────────────────────────────────────────── */}
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
                  onClick={() => { if (!wasDragging.current) setSelectedId(ev.id); }}
                  onMouseEnter={() => setHoveredId(ev.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    position:"absolute",
                    left:pos.x, top:pos.y,
                    width:NW, height:NH,
                    borderRadius:12,
                    background: sel
                      ? `${color}22`
                      : hov
                        ? `${color}1c`
                        : isBranch ? `${color}14` : `${color}0d`,
                    border:`1.5px solid ${sel || hov ? color : color + "4a"}`,
                    boxShadow: sel
                      ? `0 0 0 2px ${color}44, 0 0 32px ${color}55, 0 4px 20px #00000055`
                      : hov
                        ? `0 0 0 1px ${color}33, 0 0 22px ${color}44, 0 4px 16px #00000055`
                        : isBranch
                          ? `0 0 18px ${color}33, 0 2px 12px #00000044`
                          : `0 2px 12px #00000044`,
                    cursor:"pointer",
                    overflow:"hidden",
                    transition:"border-color .12s, box-shadow .15s, background .12s",
                    zIndex: sel ? 6 : hov ? 5 : isBranch ? 4 : 3,
                    userSelect:"none",
                    display:"flex", flexDirection:"column", justifyContent:"center",
                    padding:"0 10px 0 16px", gap:4,
                  }}
                >
                  {/* left accent bar */}
                  <div style={{
                    position:"absolute", left:0, top:0, bottom:0, width:3,
                    borderRadius:"12px 0 0 12px",
                    background:color, opacity: sel || hov ? 1 : 0.5,
                    transition:"opacity .12s",
                  }} />

                  {/* icon + code + status */}
                  <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <span style={{ fontSize:15, lineHeight:1, filter:`drop-shadow(0 0 5px ${color}88)` }}>
                      {ev.organIcon}
                    </span>
                    <span style={{ fontSize:7.5, fontWeight:700, color:`${color}bb`, letterSpacing:0.9 }}>
                      {ev.code}
                    </span>
                    <span style={{
                      marginLeft:"auto",
                      fontSize:8, fontWeight:600,
                      color: done ? "#22c55e" : `${color}70`,
                      transition:"opacity .12s",
                      opacity: done || hov || sel ? 1 : 0,
                    }}>
                      {done ? "✓" : "Ver →"}
                    </span>
                  </div>

                  {/* title */}
                  <div style={{
                    fontSize:10.5, fontWeight:700,
                    color: sel || hov ? C.text : `${C.text}cc`,
                    whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
                    lineHeight:1.25,
                    transition:"color .12s",
                  }}>
                    {ev.title}
                  </div>

                  {/* organ */}
                  <div style={{
                    fontSize:8, color:C.muted,
                    whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
                  }}>
                    {ev.organ}
                  </div>
                </div>
              );
            })}

            {/* Phase labels */}
            {[
              { x:P1_XS[0],   y:P1_CY  + NH/2 + 14, color:C.single,    label:"FASE 1 · Tubo Primitivo"     },
              { x:P2_LX,      y:ANT_CY + NH/2 + 14,  color:C.anterior,  label:"FASE 2 · Intestino Anterior" },
              { x:P2_LX,      y:P1_CY  + NH/2 + 14,  color:C.medio,     label:"FASE 2 · Intestino Médio"    },
              { x:P2_LX,      y:POST_CY+ NH/2 + 14,  color:C.posterior, label:"FASE 2 · Intestino Posterior"},
            ].map(({ x, y, color, label }) => (
              <div key={label} style={{
                position:"absolute", left:x, top:y,
                fontSize:7.5, fontWeight:700, letterSpacing:2,
                textTransform:"uppercase", color, opacity:0.32, pointerEvents:"none",
              }}>
                {label}
              </div>
            ))}

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
      background:"rgba(255,255,255,0.05)",
      border:"1px solid rgba(255,255,255,0.1)",
      color:"#94a3b8", fontSize:16, cursor:"pointer",
      display:"inline-flex", alignItems:"center", justifyContent:"center",
      fontFamily:"inherit", lineHeight:1, padding:0,
    }}>
      {children}
    </button>
  );
}
