// pages/index.js - Home do PapoPronto
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { destaquesPorDia } from "../data/conteudo";

export default function Home() {
  const [nomeUsuario, setNomeUsuario] = useState("Guerreiro(a)");
  const [totalFavoritos, setTotalFavoritos] = useState(0);
  const [favoritosPreview, setFavoritosPreview] = useState([]);

  // Carrega o nome salvo e os favoritos no localStorage, se existirem
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      // Carregar nome do usuário
      const brutoUsuario = localStorage.getItem("papopronto_usuario");
      if (brutoUsuario) {
        const usuario = JSON.parse(brutoUsuario);
        if (usuario && typeof usuario.nome === "string" && usuario.nome.trim()) {
          setNomeUsuario(usuario.nome.trim());
        }
      }

      // Carregar favoritos
      const brutoFav = localStorage.getItem("papopronto_favoritos");
      if (brutoFav) {
        const dadosFav = JSON.parse(brutoFav); // { vibeId: [frases...] }
        const listas = Object.values(dadosFav).filter(Array.isArray);

        let total = 0;
        const todasAsFrases = [];

        listas.forEach((lista) => {
          total += lista.length;
          todasAsFrases.push(...lista);
        });

        setTotalFavoritos(total);
        // Pega até 3 exemplos para mostrar na Home
        setFavoritosPreview(todasAsFrases.slice(0, 3));
      } else {
        setTotalFavoritos(0);
        setFavoritosPreview([]);
      }
    } catch (erro) {
      console.error("Erro ao carregar dados na Home:", erro);
      setTotalFavoritos(0);
      setFavoritosPreview([]);
    }
  }, []);

  // Define destaque do dia com base no dia da semana
  const hoje = new Date();
  const indiceDia = hoje.getDay(); // 0 = Domingo ... 6 = Sábado
  const destaque =
    destaquesPorDia[indiceDia] || destaquesPorDia[0]; // fallback pro domingo

  return (
    <Layout
      title={`Bom dia, ${nomeUsuario}.`}
      subtitle="Qual é o papo de hoje?"
      activeTab="home"
      showBack={false}
    >
      {/* Card destaque do dia (dinâmico) */}
      <section className="mb-4">
        <div className="rounded-xl bg-sky-900 text-slate-50 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⚡</span>
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              {destaque.titulo}
            </h2>
          </div>
          <p className="text-xs text-slate-200 mb-2">{destaque.descricao}</p>
          <p className="text-sm text-slate-50 mb-3">{destaque.fraseDoDia}</p>
          <button className="text-xs font-semibold bg-amber-400 text-slate-900 px-3 py-1 rounded-full">
            {destaque.botaoTexto}
          </button>
        </div>
      </section>

      {/* Minhas mensagens favoritas (mostra só se tiver pelo menos 1) */}
      {totalFavoritos > 0 && (
        <section className="mb-4">
          <div className="rounded-xl bg-white border px-3 py-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs font-semibold text-slate-700">
                  Minhas mensagens favoritas
                </p>
                <p className="text-[11px] text-slate-500">
                  Você já tem{" "}
                  <span className="font-semibold">{totalFavoritos}</span>{" "}
                  frases salvas.
                </p>
              </div>
              <a
                href="/perfil"
                className="text-[11px] text-sky-700 font-semibold underline"
              >
                Ver todas
              </a>
            </div>

            <div className="flex flex-col gap-2">
              {favoritosPreview.map((frase, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border px-2 py-2 text-xs text-slate-700 bg-slate-50"
                >
                  {frase}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Botão de emergência (link para /emergencia) */}
      <section className="mb-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">
          Precisa de ajuda agora?
        </h3>
        <a
          href="/emergencia"
          className="w-full flex flex-col items-start justify-between rounded-xl border border-sky-300 bg-sky-50 px-4 py-3 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🚨</span>
            <span className="font-semibold text-slate-800">
              Botão de Emergência
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Tô no encontro e travei. Me dá um papo pronto agora.
          </p>
        </a>
      </section>

      {/* Vibes (com links diretos para as vibes principais) */}
      <section className="mb-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">
          Escolha a vibe de hoje
        </h3>

        <div className="flex flex-col gap-2">
          <a
            href="/vibes/amor_boletos"
            className="flex items-center justify-between rounded-xl bg-white border px-3 py-2 shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2">
                <span>🧾</span>
                <span className="text-sm font-semibold text-slate-800">
                  Amor &amp; Boletos (CLT)
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Pra quem tá cansado, mas carente.
              </p>
            </div>
            <span className="text-xs text-slate-400">Ver</span>
          </a>

          <a
            href="/vibes/sofrencia"
            className="flex items-center justify-between rounded-xl bg-white border px-3 py-2 shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2">
                <span>🤠</span>
                <span className="text-sm font-semibold text-slate-800">
                  Modo Sofrência (Sertanejo)
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Pra conquistar no ritmo do modão.
              </p>
            </div>
            <span className="text-xs text-slate-400">Ver</span>
          </a>

          <a
            href="/vibes/reality"
            className="flex items-center justify-between rounded-xl bg-white border px-3 py-2 shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2">
                <span>🎭</span>
                <span className="text-sm font-semibold text-slate-800">
                  Vibe Reality Show
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Frases dignas de final de BBB.
              </p>
            </div>
            <span className="text-xs text-slate-400">Ver</span>
          </a>
        </div>
      </section>
    </Layout>
  );
}
