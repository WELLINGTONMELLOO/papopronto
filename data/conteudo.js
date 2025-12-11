// data/conteudo.js

// Lista de vibes (categorias)
export const vibes = [
  {
    id: "amor_boletos",
    nome: "Amor & Boletos (CLT)",
    descricao:
      "Cantadas cansadas porém carentes. Humor de quem enfrenta segunda-feira e ainda acredita no amor.",
    icone: "🧾",
    premium: false,
  },
  {
    id: "sofrencia",
    nome: "Modo Sofrência (Sertanejo)",
    descricao: "Pra conquistar no ritmo do modão.",
    icone: "🤠",
    premium: false,
  },
  {
    id: "reality",
    nome: "Vibe Reality Show",
    descricao: "Frases dignas de final de BBB.",
    icone: "🎭",
    premium: false,
  },
  {
    id: "cria_zap",
    nome: "Cria do Zap",
    descricao: "Direto, mandrake e sem enrolação.",
    icone: "😎",
    premium: false,
  },
  {
    id: "reconcilia",
    nome: "Reconcilia Aí",
    descricao: "Textos pra pedir desculpa sem ser 'volta bb'.",
    icone: "💔",
    premium: false,
  },
  {
    id: "psico_pro",
    nome: "Cantadas Infalíveis (Psico) 🔒",
    descricao: "Coleção PRO baseada em contexto e psicologia.",
    icone: "🧠",
    premium: true,
  },
];

// Frases organizadas por vibe (id da vibe)
export const frasesPorVibe = {
  sofrencia: [
    "Não sou o Gusttavo Lima, mas queria ser o Embaixador do seu coração, bebê.",
    "Se meu coração fosse um show, você seria ingresso esgotado.",
  ],
  amor_boletos: [
    "Gata, você não é 13º salário, mas cheguei no fim do ano só esperando por você.",
    "Não sou o seu holerite, mas queria ter um pouco da sua atenção todo mês.",
  ],
  reality: [
    "Se a vida fosse um reality, você seria finalista com 99% dos meus votos.",
  ],
  cria_zap: [
    "Sem muita curva pra não capotar: qual é a fita de hoje? Brota?",
  ],
  reconcilia: [
    "Fiz besteira, eu sei. Não vou te encher de texto, só quero uma chance de te ouvir e consertar olhando no teu olho.",
  ],
  psico_pro: [
    "Se eu sumir por uns dias, é só estratégia pra ver se você sente minha falta. Mas confesso que sou péssimo em fingir que não ligo.",
  ],
};
