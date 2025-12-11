// data/conteudo.js

// Lista de vibes disponíveis no app
export const vibes = [
  {
    id: "amor_boletos",
    nome: "Amor & Boletos (CLT)",
    descricao: "Pra quem tá cansado, mas carente.",
    icone: "🧾",
  },
  {
    id: "sofrencia",
    nome: "Modo Sofrência (Sertanejo)",
    descricao: "Pra conquistar no ritmo do modão.",
    icone: "🤠",
  },
  {
    id: "reality",
    nome: "Vibe Reality Show",
    descricao: "Frases dignas de final de BBB.",
    icone: "🎭",
  },
  // VIBE PRO TRAVADA
  {
    id: "psico_pro",
    nome: "Cantadas Psicológicas PRO",
    descricao:
      "Baseadas em contexto, timing e comportamento. Conteúdo exclusivo.",
    icone: "🧠",
    pro: true, // <- marca que é vibe PRO
  },
];

// Frases organizadas por vibe (MVP)
export const frasesPorVibe = {
  amor_boletos: [
    "Gata, você não é 13º salário, mas eu passei o ano inteiro esperando por você.",
    "Se relacionamento fosse igual boleto, eu aceitava até pagar adiantado só pra não te perder.",
    "Você não é minha conta de luz, mas clareou meu mês inteiro.",
  ],
  sofrencia: [
    "Não sou o Gusttavo Lima, mas queria ser o embaixador do seu coração, bebê.",
    "Se a gente fosse música sertaneja, certeza que ia tocar em todos os botecos da cidade.",
    "Tô igual moda de viola: antigo, intenso e difícil de tirar da cabeça.",
  ],
  reality: [
    "Se o Brasil fosse um reality, você já tava na final com 99% dos meus votos.",
    "A gente podia resolver isso como no reality: eu, você e um confessionário particular.",
    "Entre você e o prêmio de 1 milhão, ainda tô em dúvida... mas acho que escolho você.",
  ],

  // psico_pro propositalmente SEM frases acessíveis nesse momento
  // para ficar como conteúdo travado / em breve.
  psico_pro: [],
};

/**
 * Destaques do dia da Home
 *
 * Índice baseado em new Date().getDay():
 * 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
 */
export const destaquesPorDia = [
  // 0 - Domingo
  {
    id: "domingo",
    titulo: "Domingou do Contatinho",
    descricao: "Uma frase pronta pra mandar aquele 'sumido(a)?' de respeito.",
    fraseDoDia:
      "Domingão é dia de descanso, mas meu pensamento tá fazendo hora extra em você.",
    botaoTexto: "Ver frase do domingo",
  },
  // 1 - Segunda
  {
    id: "segunda",
    titulo: "Segunda da Reaproximação",
    descricao: "Pra retomar um papo que esfriou no fim de semana.",
    fraseDoDia:
      "Começando a semana daquele jeito: cansado(a), mas com energia pra te ver.",
    botaoTexto: "Usar agora na segunda",
  },
  // 2 - Terça
  {
    id: "terca",
    titulo: "Terça do Papo Leve",
    descricao: "Uma frase simples pra puxar assunto sem parecer carente.",
    fraseDoDia:
      "Tava aqui resolvendo uns pepinos e do nada lembrei de você. Coincidência ou sinal do universo?",
    botaoTexto: "Ver frase da terça",
  },
  // 3 - Quarta
  {
    id: "quarta",
    titulo: "Quarta do Meio do Caminho",
    descricao: "Pra esquentar o papo na metade da semana.",
    fraseDoDia:
      "Metade da semana já foi, metade ainda falta… a parte boa é que dá tempo de marcar algo com você.",
    botaoTexto: "Usar hoje",
  },
  // 4 - Quinta
  {
    id: "quinta",
    titulo: "Quinta do Pré-Rolê",
    descricao: "Preparando terreno pro fim de semana.",
    fraseDoDia:
      "Tô organizando a agenda do fim de semana e queria saber se devo reservar um horário pra você.",
    botaoTexto: "Puxar papo pra sexta",
  },
  // 5 - Sexta
  {
    id: "sexta",
    titulo: "A boa da sexta-feira",
    descricao: "3 frases prontas pra usar se for pro bar hoje.",
    fraseDoDia:
      "Sextou. Se eu te chamar pra um barzinho hoje, qual desculpa você vai inventar antes de aceitar?",
    botaoTexto: "Ver a boa da sexta",
  },
  // 6 - Sábado
  {
    id: "sabado",
    titulo: "Sábado do Convite Direto",
    descricao: "Sem enrolação, convite reto.",
    fraseDoDia:
      "Hoje é dia oficial de sair de casa. Bora provar que a gente combina mais ao vivo que no chat?",
    botaoTexto: "Convidar pro rolê",
  },
];

/**
 * Blocos da tela de Emergência
 */
export const blocosEmergencia = [
  {
    id: "encontro_travado",
    titulo: "Encontro travado",
    descricao: "Quando bate o silêncio na mesa.",
    frases: [
      "Tô aqui tentando fazer uma pergunta inteligente, mas minha mente só tá pensando em como você tá bonito(a) hoje.",
      "Você é mais do time série, filme ou ficar falando besteira até tarde?",
    ],
  },
  {
    id: "whats_travou",
    titulo: "Whats travou",
    descricao: "Quando o papo morre do nada.",
    frases: [
      "Sumiu ou a gente já pode marcar o casamento e eu não fiquei sabendo?",
      "Vou fingir que não notei seu sumiço… mas só dessa vez.",
    ],
  },
  {
    id: "resposta_seca",
    titulo: "Resposta seca",
    descricao: "Quando só vem 'kk', 'blz', 'uai'.",
    frases: [
      "Senti um 'tô sem assunto' aí… quer que eu puxe um tema aleatório ou a gente fala de coisa séria?",
      "Tô em dúvida se você tá com sono ou só me testando pra ver se eu desisto.",
    ],
  },
];
