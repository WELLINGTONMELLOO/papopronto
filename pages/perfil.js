// pages/perfil.js
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { vibes } from "../data/conteudo";

export default function PerfilPage() {
  const [favoritosPorVibe, setFavoritosPorVibe] = useState({});
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [nomeTemp, setNomeTemp] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      // Carregar favoritos
      const brutoFav = localStorage.getItem("papopronto_favoritos");
      const dadosFav = brutoFav ? JSON.parse(brutoFav) : {};
      setFavoritosPorVibe(dadosFav);

      // Carregar dados do usuário (nome)
      const brutoUsuario = localStorage.getItem("papopronto_usuario");
      if (brutoUsuario) {
        const usuario = JSON.parse(brutoUsuario);
        if (usuario && typeof usuario.nome === "string" && usuario.nome.trim()) {
          setNomeUsuario(usuario.nome.trim());
          setNomeTemp(usuario.nome.trim());
        }
      }
    } catch (erro) {
      console.error("Erro ao carregar dados do PapoPronto:", erro);
      setFavoritosPorVibe({});
    }
  }, []);

  const totalFavoritos = Object.values(favoritosPorVibe).reduce(
    (acc, valor) => {
      if (Array.isArray(valor)) {
        return acc + valor.length;
      }
      return acc;
    },
    0
  );

  // Mapa id -> nome da vibe, para exibir bonito
  const mapaVibes = vibes.reduce((acc, vibe) => {
    acc[vibe.id] = vibe.nome;
    return acc;
  }, {});

  const idsComFavoritos = Object.keys(favoritosPorVibe).filter((id) => {
    const lista = favoritosPorVibe[id];
    return Array.isArray(lista) && lista.length > 0;
  });

  function salvarNome() {
    if (typeof window === "undefined") return;

    const nomeLimpo = nomeTemp.trim();
    if (!nomeLimpo) {
      alert("Digite um nome antes de salvar.");
      return;
    }

    setNomeUsuario(nomeLimpo);

    try {
      const dados = { nome: nomeLimpo };
      localStorage.setItem("papopronto_usuario", JSON.stringify(dados));
      alert("Nome atualizado com sucesso!");
    } catch (erro) {
      console.error("Erro ao salvar nome do usuário:", erro);
      alert("Não foi possível salvar o nome. Tente novamente.");
    }
  }

  return (
    <Layout
      showBack={true}
      backHref="/"
      title="Perfil & Caderninho"
      subtitle="Ajuste seu nome e veja suas frases favoritas."
      activeTab="perfil"
    >
      {/* Configuração de nome */}
      <section className="mb-4">
        <div className="rounded-xl bg-white border px-3 py-3 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">
            Seu nome no PapoPronto
          </p>
          <p className="text-[11px] text-slate-500 mb-2">
            Esse é o nome que aparece na saudação da tela inicial.
          </p>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="text-sm border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800 placeholder:text-slate-400 bg-white"
              placeholder="Digite como você quer ser chamado(a)"
              value={nomeTemp}
              onChange={(e) => setNomeTemp(e.target.value)}
            />
            <button
              onClick={salvarNome}
              className="self-start text-xs px-3 py-1.5 rounded-full bg-sky-600 text-white font-semibold"
            >
              Salvar nome
            </button>
            {nomeUsuario && (
              <p className="text-[11px] text-slate-500">
                Saudações atuais:{" "}
                <span className="font-semibold">{nomeUsuario}</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Resumo rápido de favoritos */}
      <section className="mb-4">
        <div className="rounded-xl bg-white border px-3 py-3 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">
            Resumo do PapoPronto
          </p>
          <p className="text-sm text-slate-700">
            Você tem{" "}
            <span className="font-semibold">{totalFavoritos} frases</span>{" "}
            salvas nos favoritos.
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Use o coração ❤️ ao lado das frases nas vibes para salvar as que
            você mais gostou. Elas aparecem aqui, organizadas por vibe.
          </p>
        </div>
      </section>

      {/* Lista de favoritos por vibe */}
      <section>
        <h2 className="text-sm font-semibold text-slate-700 mb-2">
          Favoritos por vibe
        </h2>

        {idsComFavoritos.length === 0 && (
          <p className="text-xs text-slate-500">
            Você ainda não favoritou nenhuma frase. Vá em uma vibe, toque no
            coração ❤️ ao lado de uma frase e ela vai aparecer aqui.
          </p>
        )}

        <div className="flex flex-col gap-4">
          {idsComFavoritos.map((id) => {
            const lista = favoritosPorVibe[id] || [];
            const nomeVibe = mapaVibes[id] || id;

            return (
              <div
                key={id}
                className="rounded-xl bg-white border px-3 py-3 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      {nomeVibe}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {lista.length} favorito(s)
                    </p>
                  </div>
                  <a
                    href={`/vibes/${id}`}
                    className="text-[11px] text-sky-600 underline"
                  >
                    Ver vibe
                  </a>
                </div>

                <div className="flex flex-col gap-2">
                  {lista.map((frase, index) => (
                    <div
                      key={index}
                      className="rounded-lg border px-2 py-2 text-xs text-slate-700 bg-slate-50"
                    >
                      {frase}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
