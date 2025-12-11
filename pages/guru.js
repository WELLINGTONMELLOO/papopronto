// pages/guru.js
import { useState } from "react";

export default function GuruPage() {
  const [mensagens, setMensagens] = useState([
    {
      autor: "guru",
      texto:
        "Fala, guerreiro(a)! Me conta o que a pessoa falou ou qual é a situação, que eu deixo o papo pronto pra você mandar.",
    },
  ]);

  const [textoUsuario, setTextoUsuario] = useState("");
  const [processando, setProcessando] = useState(false);

  function gerarRespostaSimulada(texto) {
    const t = texto.toLowerCase();

    // Exemplos simples de "inteligência" baseada em palavras-chave
    if (t.includes("emocionad")) {
      return (
        "Manda assim: \"Calma, então cancela o carro de som que eu ia mandar 😂 " +
        "Brincadeira. Vamos na moral: me conta o que você curte fazer no fim de semana?\""
      );
    }

    if (t.includes("sumiu") || t.includes("não responde") || t.includes("nao responde")) {
      return (
        "Uma opção é mandar algo leve, sem cobrança: " +
        "\"Sumiu, hein? Vou fingir que não senti falta… mas só dessa vez 😂\" " +
        "Se a pessoa responder de boa, você puxa assunto em cima."
      );
    }

    if (
      t.includes("primeiro encontro") ||
      t.includes("primeiro rolê") ||
      t.includes("primeiro role")
    ) {
      return (
        "Você pode mandar algo tipo: " +
        "\"Curti muito conversar com você por aqui. Bora transformar esse papo em um café ou um barzinho essa semana?\" " +
        "Simples, direto e sem pressão."
      );
    }

    if (t.includes("termin") || t.includes("termino") || t.includes("terminou")) {
      return (
        "Aqui é terreno delicado. Tenta algo sincero e leve: " +
        "\"Eu sei que a fase não é fácil e respeito totalmente seu tempo. " +
        "Se você quiser alguém pra distrair a cabeça, ouvir e dar risada, tô por aqui.\""
      );
    }

    if (t.includes("bom dia")) {
      return (
        "Sugestão de bom dia diferente: " +
        "\"Bom dia! Passei aqui só pra te lembrar que alguém torce pra seu dia ser incrível (no caso, eu).\""
      );
    }

    // Resposta padrão
    return (
      "Entendi a situação. Testa algo assim: " +
      "\"Tô sendo sincero(a): curti muito nossa conversa e queria continuar esse papo. " +
      "O que você acha da gente marcar um rolê com calma qualquer dia desses?\" " +
      "Se quiser, me manda mais detalhes que eu refino a resposta."
    );
  }

  function handleEnviar() {
    const texto = textoUsuario.trim();
    if (!texto || processando) return;

    // Adiciona mensagem do usuário
    const novaMensagemUsuario = {
      autor: "usuario",
      texto,
    };

    setMensagens((msgs) => [...msgs, novaMensagemUsuario]);
    setTextoUsuario("");
    setProcessando(true);

    // Simula "pensando"
    setTimeout(() => {
      const resposta = gerarRespostaSimulada(texto);

      const novaMensagemGuru = {
        autor: "guru",
        texto: resposta,
      };

      setMensagens((msgs) => [...msgs, novaMensagemGuru]);
      setProcessando(false);
    }, 600); // atraso de 0,6s só pra dar sensação de resposta
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEnviar();
    }
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
            Guru IA
          </h1>
          <p className="text-xs text-slate-500">
            Me conta a situação, eu deixo o papo pronto.
          </p>
        </div>
      </header>

      {/* Área de mensagens */}
      <main className="flex-1 px-4 py-3 pb-24 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {mensagens.map((msg, index) => {
            const isGuru = msg.autor === "guru";
            return (
              <div
                key={index}
                className={`flex ${
                  isGuru ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                    isGuru
                      ? "bg-slate-200 text-slate-800 rounded-bl-sm"
                      : "bg-sky-600 text-white rounded-br-sm"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.texto}</p>
                </div>
              </div>
            );
          })}

          {processando && (
            <div className="flex justify-start">
              <div className="max-w-[60%] rounded-2xl px-3 py-2 text-xs bg-slate-200 text-slate-600 rounded-bl-sm">
                Digitando...
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Input fixo embaixo */}
      <form
        className="fixed bottom-0 left-0 right-0 border-t bg-white px-3 py-2 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleEnviar();
        }}
      >
        <textarea
          className="flex-1 text-xs border rounded-lg px-2 py-2 resize-none max-h-24 focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800 placeholder:text-slate-400 bg-white"
          placeholder="Cole aqui o print (ou descreva a situação) e eu te ajudo a responder..."
          rows={1}
          value={textoUsuario}
          onChange={(e) => setTextoUsuario(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="text-xs px-3 py-2 rounded-lg bg-sky-600 text-white font-semibold disabled:opacity-50"
          disabled={!textoUsuario.trim() || processando}
        >
          Enviar
        </button>
      </form>

      {/* Menu inferior (escondido por enquanto para não conflitar com o input) */}
      <nav className="hidden">
        {/* Mantido apenas se no futuro quisermos unificar rodapé. */}
      </nav>
    </div>
  );
}
