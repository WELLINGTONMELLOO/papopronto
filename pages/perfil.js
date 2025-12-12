// pages/perfil.js
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { vibes } from "../data/conteudo";

export default function PerfilPage() {
  const [nome, setNome] = useState("");
  const [nomeOriginal, setNomeOriginal] = useState("");
  const [favoritosPorVibe, setFavoritosPorVibe] = useState({});
  const [totalFavoritos, setTotalFavoritos] = useState(0);
  const [salvandoNome, setSalvandoNome] = useState(false);

  // Carrega nome e favoritos do localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      // Nome do usuário
      const brutoUsuario = localStorage.getItem("papopronto_usuario");
      if (brutoUsuario) {
        const usuario = JSON.parse(brutoUsuario);
        if (usuario && typeof usuario.nome === "string") {
          setNome(usuario.nome);
          setNomeOriginal(usuario.nome);
        }
      } else {
        setNome("");
        setNomeOriginal("");
      }

      // Favoritos
      const brutoFav = localStorage.getItem("papopronto_favoritos");
      if (brutoFav) {
        const dadosFav = JSON.parse(brutoFav); // { vibeId: [frases...] }
        setFavoritosPorVibe(dadosFav);

        const total = Object.values(dadosFav).reduce((acc, valor) => {
          if (Array.isArray(valor)) {
            return acc + valor.length;
          }
          return acc;
        }, 0);

        setTotalFavoritos(total);
      } else {
        setFavoritosPorVibe({});
        setTotalFavoritos(0);
      }
    } catch (erro) {
      console.error("Erro ao carregar dados do perfil:", erro);
      setFavoritosPorVibe({});
      setTotalFavoritos(0);
    }
  }, []);

  function salvarNome() {
    const nomeLimpo = nome.trim();
    if (!nomeLimpo) {
      alert("Digite um nome antes de salvar.");
      return;
    }

    try {
      setSalvandoNome(true);
      const objeto = { nome: nomeLimpo };
      localStorage.setItem("papopronto_usuario", JSON.stringify(objeto));
      setNomeOriginal(nomeLimpo);
      alert("Nome atualizado com sucesso.");
    } catch (erro) {
      console.error("Erro ao salvar nome:", erro);
      alert("Não consegui salvar o nome. Tente novamente.");
    } finally {
      setSalvandoNome(false);
    }
  }

  function limparFavoritos() {
    if (!totalFavoritos) {
      alert("Você ainda não possui mensagens favoritas.");
      return;
    }

    const confirmar = window.confirm(
      "Tem certeza que deseja apagar todas as mensagens favoritas? Essa ação não pode ser desfeita."
    );

    if (!confirmar) return;

    try {
      localStorage.removeItem("papopronto_favoritos");
      setFavoritosPorVibe({});
      setTotalFavoritos(0);
      alert("Favoritos apagados com sucesso.");
    } catch (erro) {
      console.error("Erro ao limpar favoritos:", erro);
      alert("Não consegui apagar os favoritos. Tente novamente.");
    }
  }

  // Ajuda a pegar o nome da vibe
  function nomeDaVibe(id) {
    const vibe = vibes.find((v) => v.id === id);
    return vibe ? vibe.nome : id;
  }

  return (
    <Layout
      showBack={false}
      title="Seu perfil"
      subtitle="Ajuste seu nome e veja suas mensagens favoritas."
      activeTab="perfil"
    >
      {/* Bloco de nome / identidade */}
      <section className="mb-4">
        <div className="rounded-xl bg-white border border-slate-200 px-3 py-3 shadow-sm">
          <p className="text-xs font-semibold text-slate-700 mb-2">
            Como você quer aparecer no app?
          </p>
          <p className="text-[11px] text-slate-500 mb-2">
            Esse nome é usado na saudação da Home (ex.: &quot;Bom dia,
            {nomeOriginal ? ` ${nomeOriginal}` : " Guerreiro(a)"}&quot;).
          </p>

          <input
            type="text"
            className="w-full text-sm border border-slate-300 rounded-lg px-2 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
            placeholder="Digite seu nome ou apelido"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <button
            type="button"
            onClick={salvarNome}
            disabled={salvandoNome}
            className="text-xs px-3 py-1.5 rounded-full bg-sky-600 text-white font-semibold disabled:opacity-60"
          >
            {salvandoNome ? "Salvando..." : "Salvar nome"}
          </button>
        </div>
      </section>

      {/* Resumo dos favoritos */}
      <section className="mb-4">
        <div className="rounded-xl bg-white border border-slate-200 px-3 py-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs font-semibold text-slate-700">
                Minhas mensagens favoritas
              </p>
              <p className="text-[11px] text-slate-500">
                Você tem{" "}
                <span className="font-semibold">{totalFavoritos}</span>{" "}
                mensagens salvas.
              </p>
            </div>
            <button
              type="button"
              onClick={limparFavoritos}
              className="text-[11px] px-2 py-1 rounded-full border border-rose-300 text-rose-700"
            >
              Limpar favoritos
            </button>
          </div>

          {totalFavoritos === 0 ? (
            <p className="text-[11px] text-slate-500">
              Você ainda não marcou nenhuma mensagem como favorita. Vá em
              &quot;Frases&quot; e toque no coração ao lado das mensagens que
              quiser guardar.
            </p>
          ) : (
            <p className="text-[11px] text-slate-500">
              Para ver um resumo rápido, confira abaixo suas favoritas
              organizadas por vibe.
            </p>
          )}
        </div>
      </section>

      {/* Lista de favoritos por vibe */}
      {totalFavoritos > 0 && (
        <section className="mb-4">
          <div className="flex flex-col gap-3">
            {Object.entries(favoritosPorVibe).map(([vibeId, lista]) => {
              if (!Array.isArray(lista) || !lista.length) return null;

              return (
                <div
                  key={vibeId}
                  className="rounded-xl bg-white border border-slate-200 px-3 py-3 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-700">
                        {nomeDaVibe(vibeId)}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {lista.length} mensagem(ns) favorita(s) nessa vibe.
                      </p>
                    </div>
                    <a
                      href={`/vibes/${vibeId}`}
                      className="text-[11px] text-sky-700 font-semibold underline"
                    >
                      Ver vibe
                    </a>
                  </div>

                  <div className="flex flex-col gap-2">
                    {lista.map((frase, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-slate-200 px-2 py-2 text-xs text-slate-700 bg-slate-50"
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
      )}

      {/* Área informativa sobre PRO futuramente (placeholder) */}
      <section className="mb-6">
        <div className="rounded-xl bg-slate-900 text-slate-50 px-3 py-3 shadow-sm">
          <p className="text-xs font-semibold mb-1">
            Em breve: PapoPronto PRO
          </p>
          <p className="text-[11px] text-slate-200 mb-1">
            Acesso ilimitado ao Guru IA, modo &quot;Comentar foto&quot; com
            análise de imagem e novas vibes exclusivas.
          </p>
          <p className="text-[11px] text-slate-300">
            Assim que o plano PRO estiver disponível, você vai conseguir
            gerenciar tudo por aqui.
          </p>
        </div>
      </section>
    </Layout>
  );
}
