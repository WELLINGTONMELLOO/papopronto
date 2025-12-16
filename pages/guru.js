// pages/guru.js
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function GuruPage() {
  const [modo, setModo] = useState("chat"); // "chat" | "foto"
  const [textoDuvida, setTextoDuvida] = useState("");
  const [respostasDemo, setRespostasDemo] = useState([]);

  const [arquivo, setArquivo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [comentariosExemplo, setComentariosExemplo] = useState([]);

  // Tema (mesma lógica do Perfil)
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("papopronto_tema");
    if (stored === "dark") {
      setIsDark(true);
      return;
    }
    if (stored === "light") {
      setIsDark(false);
      return;
    }

    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
  }, []);

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
    const isSumico =
      /sumiu|sumida|sumido|visualizou e não respondeu|não responde/i.test(texto);
    const isEmocionado = /emocionad[oa]/i.test(texto);

    const genero = isEla ? "ela" : isEle ? "ele" : "pessoa";

    const lista = [];

    if (isSeco) {
      lista.push(
        'Você pode responder algo leve tipo: "Tô em dúvida se você tá sem assunto ou só me testando pra ver se eu desisto 😏".'
      );
      lista.push(
        "Outra opção é: \"Vou considerar esse 'kk' como um 'continua falando que tô gostando'.\""
      );
    }

    if (isSumico) {
      lista.push(
        `Algo assim funciona bem: "Vou fingir que não notei seu sumiço... mas só dessa vez. E aí, ${genero}, como você tá?"`
      );
      lista.push(
        "Ou mais direto: \"Se eu te mandar um 'sumido(a)?', você responde ou some de novo?\""
      );
    }

    if (isEmocionado) {
      lista.push(
        'Você pode brincar: "Calma, então vou cancelar o carro de som que eu ia mandar pra sua casa 😂".'
      );
      lista.push(
        "Ou algo mais suave: \"Relaxa, também não curto gente grudada demais. Bora no equilíbrio: nem sumir, nem morar no WhatsApp.\""
      );
    }

    if (!lista.length) {
      // Respostas genéricas quando não encaixa nas “regrinhas”
      lista.push(
        'Você pode responder algo que puxe mais conversa, tipo: "Achei interessante o que você falou. Me conta mais sobre isso."'
      );
      lista.push(
        "Outra opção é: \"Tô gostando da nossa conversa, mas quero te conhecer de verdade. O que você curte fazer no tempo livre?\""
      );
      lista.push(
        'Se quiser algo mais ousado: "Se eu continuar falando assim, corro risco de você marcar um café comigo?"'
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

    alert(
      "Versão demo: quando a IA estiver conectada, esse botão vai gerar comentários específicos pra essa foto."
    );
  }

  // Paleta alinhada com Home/Perfil
  const cardBg = isDark ? "bg-slate-900" : "bg-white";
  const cardBorder = isDark ? "border-slate-700" : "border-slate-200";
  const titulo = isDark ? "text-slate-50" : "text-slate-700";
  const texto = isDark ? "text-slate-300" : "text-slate-500";

  const tabsBg = isDark ? "bg-slate-900 border-slate-700" : "bg-slate-100 border-slate-200";
  const tabAtivo = isDark ? "bg-slate-950 text-slate-50 shadow-sm" : "bg-white text-slate-900 shadow-sm";
  const tabInativo = isDark ? "text-slate-300" : "text-slate-500";

  const textareaBg = isDark ? "bg-slate-950" : "bg-white";
  const textareaBorder = isDark ? "border-slate-700" : "border-slate-300";
  const textareaText = isDark ? "text-slate-100" : "text-slate-800";
  const textareaPlaceholder = isDark ? "placeholder:text-slate-500" : "placeholder:text-slate-400";

  const boxInternaBg = isDark ? "bg-slate-950" : "bg-slate-50";
  const boxInternaBorder = isDark ? "border-slate-800" : "border-slate-200";
  const boxInternaText = isDark ? "text-slate-200" : "text-slate-700";

  const btnBordaSky = isDark ? "border-sky-500" : "border-sky-400";
  const btnTextoSky = isDark ? "text-sky-300" : "text-sky-700";

  const proBadgeBg = isDark ? "bg-amber-900/40" : "bg-amber-100";
  const proBadgeText = isDark ? "text-amber-200" : "text-amber-700";

  const uploadBorder = isDark ? "border-slate-700" : "border-slate-300";
  const uploadHoverBg = isDark ? "hover:bg-slate-950/40" : "hover:bg-slate-50";
  const uploadText = isDark ? "text-slate-200" : "text-slate-700";
  const uploadSubText = isDark ? "text-slate-400" : "text-slate-400";

  const previewBg = isDark ? "bg-slate-950" : "bg-slate-100";
  const previewBorder = isDark ? "border-slate-800" : "border-slate-200";

  return (
    <Layout
      showBack={false}
      title="Guru IA"
      subtitle="Peça ajuda para puxar papo, responder mensagens ou comentar foto."
      activeTab="guru"
    >
      {/* Seleção de modo (abas) */}
      <section className="mb-4">
        <div className={`inline-flex rounded-full border p-1 text-xs ${tabsBg}`}>
          <button
            type="button"
            onClick={mudarParaChat}
            className={`px-3 py-1 rounded-full ${
              modo === "chat" ? tabAtivo : tabInativo
            }`}
          >
            Chat de conselhos
          </button>
          <button
            type="button"
            onClick={mudarParaFoto}
            className={`px-3 py-1 rounded-full flex items-center gap-1 ${
              modo === "foto" ? tabAtivo : tabInativo
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
          <div className={`rounded-xl border px-3 py-3 shadow-sm ${cardBg} ${cardBorder}`}>
            <p className={`text-xs mb-2 ${texto}`}>
              Cole aqui a mensagem da pessoa ou explique a situação. O Guru vai
              te dar ideias de resposta com tom leve e brasileiro.
            </p>
            <textarea
              className={`w-full h-24 text-sm border rounded-lg px-2 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-sky-500 ${textareaText} ${textareaBg} ${textareaBorder} ${textareaPlaceholder}`}
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

            <p className={`mt-1 text-[11px] ${texto}`}>
              Na versão com IA, as respostas vão considerar seu estilo e o
              contexto da conversa em tempo real.
            </p>
          </div>

          {respostasDemo.length > 0 && (
            <div className={`rounded-xl border px-3 py-3 shadow-sm ${cardBg} ${cardBorder}`}>
              <p className={`text-xs font-semibold mb-1 ${titulo}`}>
                Sugestões de resposta:
              </p>
              <p className={`text-[11px] mb-2 ${texto}`}>
                Ajuste para ficar com a sua cara antes de enviar. O objetivo é
                te tirar do “branco” na hora de responder.
              </p>

              <div className="flex flex-col gap-2">
                {respostasDemo.map((textoItem, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg border px-2 py-2 text-xs flex flex-col gap-1 ${boxInternaBorder} ${boxInternaBg} ${boxInternaText}`}
                  >
                    <p>{textoItem}</p>
                    <div>
                      <button
                        type="button"
                        className={`text-[11px] px-2 py-1 rounded-full border ${btnBordaSky} ${btnTextoSky}`}
                        onClick={() => copiarTexto(textoItem)}
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
          <div className={`rounded-xl border px-3 py-3 shadow-sm ${cardBg} ${cardBorder}`}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className={`text-xs font-semibold ${titulo}`}>
                  O que comentar na foto?
                </p>
                <p className={`text-[11px] ${texto}`}>
                  Envie uma foto do feed, story ou print. O PapoPronto vai
                  gerar comentários específicos para essa imagem.
                </p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${proBadgeText} ${proBadgeBg}`}>
                Recurso PRO · em breve
              </span>
            </div>

            {/* Área de upload da foto */}
            <label
              className={`mt-2 flex flex-col items-center justify-center border border-dashed rounded-lg px-3 py-4 cursor-pointer hover:border-sky-400 ${uploadBorder} ${uploadHoverBg}`}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleArquivoChange}
              />
              <span className="text-xl mb-1">📷</span>
              <p className={`text-xs ${uploadText}`}>Toque aqui para enviar uma foto</p>
              <p className={`text-[10px] mt-1 ${uploadSubText}`}>
                Evite fotos íntimas ou de menores de idade.
              </p>
            </label>

            {/* Preview da foto selecionada */}
            {previewUrl && (
              <div className="mt-3">
                <p className={`text-[11px] mb-1 ${texto}`}>
                  Pré-visualização da imagem:
                </p>
                <div className={`rounded-lg overflow-hidden border ${previewBorder} ${previewBg}`}>
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

            <p className={`mt-1 text-[11px] ${texto}`}>
              Na versão completa, a IA vai analisar a foto (cenário, roupas,
              detalhes) e sugerir comentários específicos que fogem do padrão
              “linda” e “gostosa”.
            </p>
          </div>

          {/* Lista de comentários de exemplo */}
          {comentariosExemplo.length > 0 && (
            <div className={`rounded-xl border px-3 py-3 shadow-sm ${cardBg} ${cardBorder}`}>
              <p className={`text-xs font-semibold mb-1 ${titulo}`}>
                Exemplos de comentários que o PapoPronto pode sugerir:
              </p>
              <p className={`text-[11px] mb-2 ${texto}`}>
                Aqui estamos mostrando um comportamento simulado. Depois, isso
                vai ser gerado de verdade, baseado na foto enviada.
              </p>

              <div className="flex flex-col gap-2">
                {comentariosExemplo.map((textoItem, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg border px-2 py-2 text-xs flex flex-col gap-1 ${boxInternaBorder} ${boxInternaBg} ${boxInternaText}`}
                  >
                    <p>{textoItem}</p>
                    <div>
                      <button
                        type="button"
                        className={`text-[11px] px-2 py-1 rounded-full border ${btnBordaSky} ${btnTextoSky}`}
                        onClick={() => copiarTexto(textoItem)}
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
