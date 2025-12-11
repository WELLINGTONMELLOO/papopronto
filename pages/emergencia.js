// pages/emergencia.js
import { useState } from "react";

const opcoesContexto = [
  {
    id: "bar",
    titulo: "Barzinho / Happy Hour",
    descricao: "Quando o assunto morreu no meio do chopp.",
    frases: [
      "Esse bar é legal, mas ainda não decidiu se é o melhor da cidade… diferente de você, que já tá no topo do ranking.",
      "Tô em dúvida se gostei mais da música, do lugar ou da companhia. Acho que foi da companhia mesmo.",
      "Se esse bar fechar agora, já tá bom. O importante é que a parte boa da noite eu já encontrei aqui do meu lado.",
    ],
  },
  {
    id: "restaurante",
    titulo: "Restaurante / Jantar",
    descricao: "Clima mais calmo, mas você travou.",
    frases: [
      "Esse prato tá bonito, mas sinceramente, você continua sendo a melhor coisa da mesa.",
      "Prometo não roubar sua comida… mas um pouquinho da sua atenção eu vou precisar.",
      "Se todo jantar fosse assim, eu ia parar de pedir delivery só pra ter desculpa de te ver.",
    ],
  },
  {
    id: "cinema",
    titulo: "Cinema / Filme",
    descricao: "Silêncio demais e você quer quebrar o gelo.",
    frases: [
      "Tô tentando prestar atenção no filme, mas o protagonista da minha mente é você.",
      "Se o filme estiver ruim, pelo menos a companhia já valeu o ingresso.",
      "Prometo não falar durante o filme… mas depois vou precisar de um debate detalhado com você.",
    ],
  },
  {
    id: "casa",
    titulo: "Em casa / Rolê mais íntimo",
    descricao: "Netflix, jogo, conversa… e você não quer deixar o clima estranho.",
    frases: [
      "Eu ia fingir que vim só pra assistir, mas acho que você já sabe que a melhor parte é estar aqui com você.",
      "Se eu disser que tô muito confortável aqui, você promete não me expulsar mais cedo?",
      "Não sei se foi o sofá, o clima ou você… mas eu poderia acostumar com isso fácil.",
    ],
  },
];

export default function EmergenciaPage() {
  const [contextoSelecionado, setContextoSelecionado] = useState(null);

  function handleSelecionarContexto(contexto) {
    setContextoSelecionado(contexto);
  }

  function copiarFrase(frase) {
    navigator.clipboard.writeText(frase);
    alert("Papo copiado. Agora é com você 😉");
  }

  function mandarNoZap(frase) {
    const url = `https://wa.me/?text=${encodeURIComponent(frase)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Cabeçalho */}
      <header className="flex items-center gap-2 px-4 py-3 border-b bg-white">
        <a href="/" className="text-xl mr-2">
          ←
        </a>
        <div>
          <h1 className="text-base font-semibold text-slate-800">
            Botão de Emergência
          </h1>
          <p className="text-xs text-slate-500">
            Escolha o tipo de rolê e eu te dou frases prontas pra destravar.
          </p>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 px-4 py-4 pb-20">
        <section className="mb-4">
          <h2 className="text-sm font-semibold text-slate-700 mb-2">
            Onde você está agora?
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {opcoesContexto.map((ctx) => (
              <button
                key={ctx.id}
                className={`text-left rounded-xl px-3 py-2 border shadow-sm text-sm ${
                  contextoSelecionado?.id === ctx.id
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-white text-slate-800 border-slate-200"
                }`}
                onClick={() => handleSelecionarContexto(ctx)}
              >
                <div className="font-semibold">{ctx.titulo}</div>
                <div className="text-[11px] mt-0.5 opacity-80">
                  {ctx.descricao}
                </div>
              </button>
            ))}
          </div>
        </section>

        {contextoSelecionado && (
          <section className="mt-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">
              Frases pra usar agora ({contextoSelecionado.titulo})
            </h3>
            <div className="flex flex-col gap-3">
              {contextoSelecionado.frases.map((frase, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-white border px-3 py-3 shadow-sm"
                >
                  <p className="text-sm text-slate-800 mb-3">{frase}</p>
                  <div className="flex gap-2">
                    <button
                      className="text-xs px-3 py-1 rounded-full border border-sky-400 text-sky-700"
                      onClick={() => copiarFrase(frase)}
                    >
                      Copiar
                    </button>
                    <button
                      className="text-xs px-3 py-1 rounded-full border border-emerald-400 text-emerald-700"
                      onClick={() => mandarNoZap(frase)}
                    >
                      Mandar no Zap
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {!contextoSelecionado && (
          <p className="text-xs text-slate-500 mt-4">
            Toque em uma das opções acima para ver frases prontas específicas
            pro seu rolê.
          </p>
        )}
      </main>

      {/* Menu inferior */}
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-white px-4 py-2 flex justify-between">
        <a href="/" className="flex flex-col items-center text-xs text-slate-500">
          <span>🏠</span>
          <span>Início</span>
        </a>
        <a href="/vibes" className="flex flex-col items-center text-xs text-slate-500">
          <span>📂</span>
          <span>Frases</span>
        </a>
        <a href="/guru" className="flex flex-col items-center text-xs text-slate-500">
          <span>🤖</span>
          <span>Guru IA</span>
        </a>
        <a href="/perfil" className="flex flex-col items-center text-xs text-slate-500">
          <span>👤</span>
          <span>Perfil</span>
        </a>
      </nav>
    </div>
  );
}
