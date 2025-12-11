// pages/guru.js
import { useState } from "react";
import Layout from "../components/Layout";

export default function GuruPage() {
  const [modo, setModo] = useState("chat"); // "chat" | "foto"
  const [textoDuvida, setTextoDuvida] = useState("");
  const [respostasDemo, setRespostasDemo] = useState([]);

  const [arquivo, setArquivo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [comentariosExemplo, setComentariosExemplo] = useState([]);

  function mudarParaChat() {
    setModo("chat");
  }

  function mudarParaFoto() {
    setModo("foto");
  }

  function copiarTexto(texto) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(texto);
      alert("Texto copiado. Agora é só colar lá. 😉");
    }
  }

  // ----- MODO CHAT: gerar respostas demo sem IA -----
  function handleGerarRespostasDemo() {
    const texto = textoDuvida.trim();

    if (!texto) {
      alert(
        "Escreve rapidinho o que aconteceu ou cola a mensagem da pessoa, que eu te dou umas ideias de resposta."
      );
      return;
    }

    // Regras bem simples só para deixar mais “vivo”
    const isEla = /ela|menina|garota|mulher/i.test(texto);
    const isEle = /ele|cara|rapaz|homem/i.test(texto);
    const isSeco = /\bkk\b|blz|ok|tá\b|ta\b|td bem/i.test(texto);
    const isSumico = /sumiu|sumida|sumido|visualizou e não respondeu|não responde/i.test(
      texto
    );
    const isEmocionado = /emocionad[oa]/i.test(texto);

    const genero = isEla ? "ela" : isEle ? "ele" : "pessoa";

    const lista = [];

    if (isSeco) {
      lista.push(
        "Você pode responder algo leve tipo: \"Tô em dúvida se você tá sem assunto ou só me testando pra ver se eu desisto 😏\"."
      );
      lista.push(
        "Outra opção é: \"Vou considerar esse 'kk' como um 'continua falando que tô gostando'.\""
      );
    }

    if (isSumico) {
      lista.push(
        `Algo assim funciona bem: \"Vou fingir que não notei seu sumiço... mas só dessa vez. E aí, ${genero}, como você tá?\"`
      );
      lista.push(
        "Ou mais direto: \"Se eu te mandar um 'sumido(a)?', você responde ou some de novo?\""
      );
    }

    if (isEmocionado) {
      lista.push(
        "Você pode brincar: \"Calma, então vou cancelar o carro de som que eu ia mandar pra sua casa 😂\"."
      );
      lista.push(
        "Ou algo mais suave: \"Relaxa, também não curto gente grudada demais. Bora no equilíbrio: nem sumir, nem morar no WhatsApp.\""
      );
    }

    if (!lista.length) {
      // Respostas genéricas quando não encaixa nas “regrinhas”
      lista.push(
        "Você pode responder algo que puxe mais conversa, tipo: \"Achei interessante o que você falou. Me conta mais sobre isso.\""
      );
      lista.push(
        "Outra opção é: \"Tô gostando da nossa conversa, mas quero te conhecer de verdade. O que você curte fazer no tempo livre?\""
      );
      lista.push(
        "Se quiser algo mais ousado: \"Se eu continuar falando assim, corro risco de você marcar um café comigo?\""
      );
    }

    setRespostasDemo(lista);
  }

  // ----- MODO FOTO: apenas visual/demo -----
  function handleArquivoChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setArquivo(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Exemplo de como os comentários podem aparecer no futuro
    setComentariosExemplo([
      "Esse cenário aí tá bonito, mas você conseguiu roubar a cena fácil.",
      "Gostei do detalhe na foto (fundo, pose, expressão), dá pra puxar assunto só sobre isso.",
      "Se eu comentar que a foto tá boa, ainda assim vai ficar abaixo do tanto que você entregou nela.",
    ]);
  }

  function handleGerarIdeiasFake() {
    if (!arquivo) {
      alert(
        "No futuro, aqui vamos analisar a foto de verdade com IA. Por enquanto, suba uma imagem só pra ver como a interface fica."
      );
      return;
    }

    // Aqui, no futuro, vamos chamar a API com IA de visão.
    alert(
      "Versão demo: quando a IA estiver conectada, esse botão vai gerar comentários específicos pra essa foto."
    );
  }

  return (
    <Layout
      showBack={false}
      title="Guru IA"
      subtitle="Peça ajuda para puxar papo, responder mensagens ou comentar foto."
      activeTab="guru"
    >
      {/* Seleção de modo (abas) */}
      <section className="mb-4">
        <div className="inline-flex rounded-full border bg-slate-100 border-slate-200 p-1 text-xs">
          <button
            type="button"
            onClick={mudarParaChat}
            className={`px-3 py-1 rounded-full ${
              modo === "chat"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500"
            }`}
          >
            Chat de conselhos
          </button>
          <button
            type="button"
            onClick={mudarParaFoto}
            className={`px-3 py-1 rounded-full flex items-center gap-1 ${
              modo === "foto"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500"
            }`}
          >
            <span>🖼️</span>
            <span>Comentar foto</span>
          </button>
        </div>
      </section>

      {modo === "chat" ? (
        /* MODO CHAT DE CONSELHOS (demo funcional) */
        <section className="flex flex-col gap-3">
          <div className="rounded-xl bg-white border border-slate-200 px-3 py-3 shadow-sm">
            <p className="text-xs text-slate-500 mb-2">
              Cole aqui a mensagem da pessoa ou explique a situação. O Guru vai
              te dar ideias de resposta com tom leve e brasileiro.
            </p>
            <textarea
              className="w-full h-24 text-sm border border-slate-300 rounded-lg px-2 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800 bg-white placeholder:text-slate-400"
              placeholder="Ex.: Ela disse que odeia gente 'emocionada'. O que eu respondo?"
              value={textoDuvida}
              onChange={(e) => setTextoDuvida(e.target.value)}
            />

            <button
              type="button"
              className="mt-2 text-xs px-3 py-1.5 rounded-full bg-sky-600 text-white font-semibold"
              onClick={handleGerarRespostasDemo}
            >
              Gerar ideias de resposta (demo)
            </button>

            <p className="mt-1 text-[11px] text-slate-500">
              Na versão com IA, as respostas vão considerar seu estilo e o
              contexto da conversa em tempo real.
            </p>
          </div>

          {respostasDemo.length > 0 && (
            <div className="rounded-xl bg-white border border-slate-200 px-3 py-3 shadow-sm">
              <p className="text-xs font-semibold text-slate-700 mb-1">
                Sugestões de resposta:
              </p>
              <p className="text-[11px] text-slate-500 mb-2">
                Ajuste para ficar com a sua cara antes de enviar. O objetivo é
                te tirar do “branco” na hora de responder.
              </p>

              <div className="flex flex-col gap-2">
                {respostasDemo.map((texto, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-slate-200 px-2 py-2 text-xs text-slate-700 bg-slate-50 flex flex-col gap-1"
                  >
                    <p>{texto}</p>
                    <div>
                      <button
                        type="button"
                        className="text-[11px] px-2 py-1 rounded-full border border-sky-400 text-sky-700"
                        onClick={() => copiarTexto(texto)}
                      >
                        Copiar resposta
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ) : (
        /* MODO COMENTAR FOTO (visual, sem IA por enquanto) */
        <section className="flex flex-col gap-3">
          <div className="rounded-xl bg-white border border-slate-200 px-3 py-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs font-semibold text-slate-700">
                  O que comentar na foto?
                </p>
                <p className="text-[11px] text-slate-500">
                  Envie uma foto do feed, story ou print. O PapoPronto vai
                  gerar comentários específicos para essa imagem.
                </p>
              </div>
              <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-[2px] rounded-full">
                Recurso PRO · em breve
              </span>
            </div>

            {/* Área de upload da foto */}
            <label className="mt-2 flex flex-col items-center justify-center border border-dashed border-slate-300 rounded-lg px-3 py-4 cursor-pointer hover:border-sky-400 hover:bg-slate-50">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleArquivoChange}
              />
              <span className="text-xl mb-1">📷</span>
              <p className="text-xs text-slate-700">
                Toque aqui para enviar uma foto
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Evite fotos íntimas ou de menores de idade.
              </p>
            </label>

            {/* Preview da foto selecionada */}
            {previewUrl && (
              <div className="mt-3">
                <p className="text-[11px] text-slate-500 mb-1">
                  Pré-visualização da imagem:
                </p>
                <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Pré-visualização"
                    className="w-full max-h-64 object-cover"
                  />
                </div>
              </div>
            )}

            {/* Botão de gerar ideias (demo) */}
            <button
              type="button"
              className="mt-3 text-xs px-3 py-1.5 rounded-full bg-sky-600 text-white font-semibold"
              onClick={handleGerarIdeiasFake}
            >
              Gerar ideias de comentário (demo)
            </button>

            <p className="mt-1 text-[11px] text-slate-500">
              Na versão completa, a IA vai analisar a foto (cenário, roupas,
              detalhes) e sugerir comentários específicos que fogem do padrão
              “linda” e “gostosa”.
            </p>
          </div>

          {/* Lista de comentários de exemplo */}
          {comentariosExemplo.length > 0 && (
            <div className="rounded-xl bg-white border border-slate-200 px-3 py-3 shadow-sm">
              <p className="text-xs font-semibold text-slate-700 mb-1">
                Exemplos de comentários que o PapoPronto pode sugerir:
              </p>
              <p className="text-[11px] text-slate-500 mb-2">
                Aqui estamos mostrando um comportamento simulado. Depois, isso
                vai ser gerado de verdade, baseado na foto enviada.
              </p>

              <div className="flex flex-col gap-2">
                {comentariosExemplo.map((texto, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-slate-200 px-2 py-2 text-xs text-slate-700 bg-slate-50 flex flex-col gap-1"
                  >
                    <p>{texto}</p>
                    <div>
                      <button
                        type="button"
                        className="text-[11px] px-2 py-1 rounded-full border border-sky-400 text-sky-700"
                        onClick={() => copiarTexto(texto)}
                      >
                        Copiar comentário
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </Layout>
  );
}
