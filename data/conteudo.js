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
    descricao: "Baseadas em contexto, timing e comportamento. Conteúdo exclusivo.",
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
