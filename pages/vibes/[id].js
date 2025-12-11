// pages/vibes/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { vibes, frasesPorVibe } from "../../data/conteudo";

export default function FrasesPorVibePage() {
  const router = useRouter();
  const { id } = router.query;

  const [favoritos, setFavoritos] = useState([]);

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
        <p className="text-xs text-slate-500">
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
        <div className="rounded-xl bg-amber-50 border border-amber-300 px-3 py-3 shadow-sm">
          <p className="text-sm font-semibold text-amber-800 mb-1">
            Conteúdo PRO em breve
          </p>
          <p className="text-xs text-amber-900 mb-2">
            Aqui vão ficar as cantadas mais afiadas, baseadas em contexto,
            psicologia e timing de conversa. Essa vibe será parte da versão
            PRO do PapoPronto.
          </p>
          <p className="text-[11px] text-amber-900 mb-3">
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
          <p className="text-xs text-slate-500">
            Ainda não temos frases cadastradas para esta vibe.
          </p>
        )}

        {frases.map((texto, index) => {
          const favorita = isFavorita(texto);

          return (
            <div
              key={index}
              className="rounded-xl bg-white border px-3 py-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm text-slate-800">{texto}</p>
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
                  className="text-xs px-3 py-1 rounded-full border border-sky-400 text-sky-700"
                  onClick={() => {
                    navigator.clipboard.writeText(texto);
                    alert("Papo copiado. Agora é com você 😉");
                  }}
                >
                  Copiar
                </button>
                <button
                  className="text-xs px-3 py-1 rounded-full border border-emerald-400 text-emerald-700"
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
