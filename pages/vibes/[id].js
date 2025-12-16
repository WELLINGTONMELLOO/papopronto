// pages/vibes/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { vibes, frasesPorVibe } from "../../data/conteudo";

export default function FrasesPorVibePage() {
  const router = useRouter();
  const { id } = router.query;

  const [favoritos, setFavoritos] = useState([]);

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

  // Carregar frases da vibe atual
  const frases = id ? frasesPorVibe[id] || [] : [];

  // Descobrir a vibe atual
  const vibeAtual = id ? vibes.find((v) => v.id === id) : null;
  const tituloVibe = vibeAtual ? vibeAtual.nome : id || "Frases";
  const subtituloVibe = vibeAtual
    ? vibeAtual.descricao
    : "Toque para copiar, mandar no zap ou favoritar.";

  const isPro = !!(vibeAtual && vibeAtual.pro);

  // Carregar favoritos do localStorage quando a página souber o id
  useEffect(() => {
    if (!id || typeof window === "undefined") return;
    if (isPro) {
      // não precisa carregar favoritos para vibe PRO travada
      setFavoritos([]);
      return;
    }

    try {
      const bruto = localStorage.getItem("papopronto_favoritos");
      if (!bruto) {
        setFavoritos([]);
        return;
      }
      const dados = JSON.parse(bruto);
      const favoritosDaVibe = Array.isArray(dados[id]) ? dados[id] : [];
      setFavoritos(favoritosDaVibe);
    } catch (erro) {
      console.error("Erro ao carregar favoritos:", erro);
      setFavoritos([]);
    }
  }, [id, isPro]);

  function isFavorita(frase) {
    return favoritos.includes(frase);
  }

  function toggleFavorito(frase) {
    if (!id || typeof window === "undefined" || isPro) return;

    setFavoritos((favoritosAtuais) => {
      let novosFavoritos;

      if (favoritosAtuais.includes(frase)) {
        // remover
        novosFavoritos = favoritosAtuais.filter((f) => f !== frase);
      } else {
        // adicionar
        novosFavoritos = [...favoritosAtuais, frase];
      }

      // Atualizar no localStorage o mapa completo de favoritos
      try {
        const bruto = localStorage.getItem("papopronto_favoritos");
        const dados = bruto ? JSON.parse(bruto) : {};
        dados[id] = novosFavoritos;
        localStorage.setItem("papopronto_favoritos", JSON.stringify(dados));
      } catch (erro) {
        console.error("Erro ao salvar favoritos:", erro);
      }

      return novosFavoritos;
    });
  }

  // Classes alinhadas com Home/Perfil
  const cardBg = isDark ? "bg-slate-900" : "bg-white";
  const cardBorder = isDark ? "border-slate-700" : "border-slate-200";
  const textoPrincipal = isDark ? "text-slate-50" : "text-slate-800";
  const textoSecundario = isDark ? "text-slate-300" : "text-slate-500";

  const btnCopyBorder = isDark ? "border-sky-500" : "border-sky-400";
  const btnCopyText = isDark ? "text-sky-300" : "text-sky-700";

  const btnZapBorder = isDark ? "border-emerald-500" : "border-emerald-400";
  const btnZapText = isDark ? "text-emerald-300" : "text-emerald-700";

  // Estilo do card PRO (no dark não fica “brancão”)
  const proBg = isDark ? "bg-amber-900/20" : "bg-amber-50";
  const proBorder = isDark ? "border-amber-700" : "border-amber-300";
  const proTitle = isDark ? "text-amber-200" : "text-amber-800";
  const proText = isDark ? "text-amber-100" : "text-amber-900";

  // Enquanto o id ainda não chegou
  if (!id) {
    return (
      <Layout
        showBack={true}
        backHref="/vibes"
        title="Carregando..."
        subtitle=""
        activeTab="vibes"
      >
        <p className={`text-xs ${textoSecundario}`}>
          Carregando frases da vibe selecionada.
        </p>
      </Layout>
    );
  }

  // Caso seja uma vibe PRO travada
  if (isPro) {
    return (
      <Layout
        showBack={true}
        backHref="/vibes"
        title={tituloVibe}
        subtitle={subtituloVibe}
        activeTab="vibes"
      >
        <div
          className={`rounded-xl border px-3 py-3 shadow-sm ${proBg} ${proBorder}`}
        >
          <p className={`text-sm font-semibold mb-1 ${proTitle}`}>
            Conteúdo PRO em breve
          </p>
          <p className={`text-xs mb-2 ${proText}`}>
            Aqui vão ficar as cantadas mais afiadas, baseadas em contexto,
            psicologia e timing de conversa. Essa vibe será parte da versão
            PRO do PapoPronto.
          </p>
          <p className={`text-[11px] mb-3 ${proText}`}>
            Por enquanto você pode usar todas as outras vibes liberadas enquanto
            a casa prepara esse modo turbo.
          </p>
          <button
            type="button"
            className="text-[11px] px-3 py-1.5 rounded-full bg-amber-600 text-white font-semibold"
            onClick={() => {
              alert(
                "Quando a versão PRO estiver pronta, essa vibe vai ser uma das primeiras a ser liberada. 😉"
              );
            }}
          >
            Quero saber quando lançar
          </button>
        </div>
      </Layout>
    );
  }

  // Vibes normais (conteúdo liberado)
  return (
    <Layout
      showBack={true}
      backHref="/vibes"
      title={tituloVibe || "Frases"}
      subtitle={subtituloVibe}
      activeTab="vibes"
    >
      <div className="flex flex-col gap-3">
        {frases.length === 0 && (
          <p className={`text-xs ${textoSecundario}`}>
            Ainda não temos frases cadastradas para esta vibe.
          </p>
        )}

        {frases.map((texto, index) => {
          const favorita = isFavorita(texto);

          return (
            <div
              key={index}
              className={`rounded-xl border px-3 py-3 shadow-sm ${cardBg} ${cardBorder}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className={`text-sm ${textoPrincipal}`}>{texto}</p>
                <button
                  type="button"
                  onClick={() => toggleFavorito(texto)}
                  className="text-lg leading-none"
                  title={
                    favorita
                      ? "Remover dos favoritos"
                      : "Adicionar aos favoritos"
                  }
                >
                  {favorita ? "❤️" : "🤍"}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  className={`text-xs px-3 py-1 rounded-full border ${btnCopyBorder} ${btnCopyText}`}
                  onClick={() => {
                    navigator.clipboard.writeText(texto);
                    alert("Papo copiado. Agora é com você 😉");
                  }}
                >
                  Copiar
                </button>
                <button
                  className={`text-xs px-3 py-1 rounded-full border ${btnZapBorder} ${btnZapText}`}
                  onClick={() => {
                    const url = `https://wa.me/?text=${encodeURIComponent(
                      texto
                    )}`;
                    window.open(url, "_blank");
                  }}
                >
                  Mandar no Zap
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
