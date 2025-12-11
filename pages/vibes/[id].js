// pages/vibes/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { vibes, frasesPorVibe } from "../../data/conteudo";

export default function FrasesPorVibePage() {
  const router = useRouter();
  const { id } = router.query;

  const [favoritos, setFavoritos] = useState([]);

  // Carregar frases da vibe atual
  const frases = id ? frasesPorVibe[id] || [] : [];

  // Descobrir o nome bonitinho da vibe
  const vibeAtual = id ? vibes.find((v) => v.id === id) : null;
  const tituloVibe = vibeAtual ? vibeAtual.nome : id || "";

  // Carregar favoritos do localStorage quando a página souber o id
  useEffect(() => {
    if (!id || typeof window === "undefined") return;

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
  }, [id]);

  function isFavorita(frase) {
    return favoritos.includes(frase);
  }

  function toggleFavorito(frase) {
    if (!id || typeof window === "undefined") return;

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

  // Enquanto o id ainda não chegou (Next carrega query async)
  if (!id) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <header className="flex items-center gap-2 px-4 py-3 border-b bg-white">
          <button onClick={() => router.back()} className="text-xl mr-2">
            ←
          </button>
          <div>
            <h1 className="text-base font-semibold text-slate-800">
              Carregando...
            </h1>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Cabeçalho */}
      <header className="flex items-center gap-2 px-4 py-3 border-b bg-white">
        <button onClick={() => router.back()} className="text-xl mr-2">
          ←
        </button>
        <div>
          <h1 className="text-base font-semibold text-slate-800">
            {tituloVibe || "Frases"}
          </h1>
          <p className="text-xs text-slate-500">
            Toque para copiar, mandar no zap ou favoritar.
          </p>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 px-4 py-4 pb-20">
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
