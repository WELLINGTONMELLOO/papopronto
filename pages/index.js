// pages/index.js
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";

function getSaudacaoPorHorario() {
  const agora = new Date();
  const hora = agora.getHours();

  if (hora < 5) return "Boa noite";
  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
}

function getTituloDestaqueDoDia() {
  const dias = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];
  const hoje = new Date().getDay(); // 0 = domingo, 6 = sábado
  const nomeDia = dias[hoje];

  return `A boa de ${nomeDia}`;
}

const vibesResumo = [
  {
    id: "amor-boletos",
    titulo: "Amor & Boletos",
    descricao: "Piadas de CLT, cansaço e boletos.",
  },
  {
    id: "modo-sofrencia",
    titulo: "Modo Sofrência",
    descricao: "Cantadas sertanejas e de modão.",
  },
  {
    id: "vibe-reality",
    titulo: "Vibe Reality Show",
    descricao: "Frases com clima de BBB e Fazenda.",
  },
  {
    id: "cria",
    titulo: "Aquele Pique (Cria)",
    descricao: "Papo reto, sem curva pra capotar.",
  },
];

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [carregandoUser, setCarregandoUser] = useState(true);

  const saudacao = getSaudacaoPorHorario();
  const tituloDestaque = getTituloDestaqueDoDia();

  useEffect(() => {
    let ativo = true;

    async function carregarUsuario() {
      const { data, error } = await supabase.auth.getUser();
      if (!ativo) return;

      if (error) {
        console.error("Erro ao buscar usuário:", error);
        setUser(null);
      } else {
        setUser(data?.user ?? null);
      }
      setCarregandoUser(false);
    }

    carregarUsuario();

    return () => {
      ativo = false;
    };
  }, []);

  const nomeUsuario =
    user?.user_metadata?.nome ||
    (user?.email ? user.email.split("@")[0] : "você");

  return (
    <Layout title="Início">
      <div className="px-4 pt-4 pb-24 max-w-md mx-auto space-y-4">
        {/* Saudação dinâmica */}
        <header className="space-y-1">
          <p className="text-sm font-semibold text-slate-50">
            {carregandoUser ? "Carregando..." : `${saudacao}, ${nomeUsuario}.`}
          </p>
          <p className="text-[12px] text-slate-400">
            Qual a estratégia de hoje?
          </p>
        </header>

        {/* Card destaque do dia */}
        <section>
          <div className="rounded-3xl bg-sky-500/10 border border-sky-500/40 px-4 py-3 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-2xl bg-sky-500 flex items-center justify-center text-[11px] font-bold text-slate-950">
                  ⚡
                </div>
                <p className="text-[11px] font-semibold text-sky-200 uppercase tracking-wide">
                  Destaque do dia
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-50">
              {tituloDestaque}
            </p>
            <p className="text-[12px] text-slate-200">
              Hoje eu separei algumas mensagens prontas para você quebrar o gelo
              sem passar vergonha. É só clicar e colar.
            </p>
            <button
              type="button"
              onClick={() => {
                // Leva para uma vibe padrão (ex: Amor & Boletos)
                window.location.href = "/vibes/amor-boletos";
              }}
              className="mt-2 inline-flex items-center gap-1 rounded-full bg-sky-500 text-slate-950 text-[11px] font-semibold px-3 py-1.5"
            >
              Ver dicas do dia
              <span>›</span>
            </button>
          </div>
        </section>

        {/* Botão de emergência */}
        <section className="space-y-2">
          <p className="text-[12px] text-slate-400">
            Travou no meio da conversa ou do encontro?
          </p>
          <button
            type="button"
            onClick={() => {
              window.location.href = "/emergencia";
            }}
            className="w-full rounded-2xl border border-rose-500/60 bg-rose-500/10 px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-2xl bg-rose-500 flex items-center justify-center text-[13px] font-bold text-slate-950">
                SOS
              </div>
              <div>
                <p className="text-[12px] font-semibold text-rose-100">
                  Botão de emergência
                </p>
                <p className="text-[11px] text-rose-100/80">
                  “Tô no encontro e travou tudo!”
                </p>
              </div>
            </div>
            <span className="text-[16px] text-rose-100">›</span>
          </button>
        </section>

        {/* Vibes resumidas */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold text-slate-200">
              Navegar por vibes
            </p>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/vibes";
              }}
              className="text-[11px] text-sky-400 underline underline-offset-4"
            >
              Ver todas
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
            {vibesResumo.map((vibe) => (
              <button
                key={vibe.id}
                type="button"
                onClick={() => {
                  window.location.href = `/vibes/${vibe.id}`;
                }}
                className="min-w-[180px] max-w-[190px] rounded-2xl bg-slate-900/60 border border-slate-800 px-3 py-3 text-left"
              >
                <p className="text-[12px] font-semibold text-slate-50">
                  {vibe.titulo}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {vibe.descricao}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Favoritos (resumão) */}
        <section className="space-y-2">
          <p className="text-[12px] font-semibold text-slate-200">
            Minhas mensagens favoritas
          </p>
          <p className="text-[11px] text-slate-400">
            Em breve você vai ver aqui as frases que marcar como favoritas nas
            vibes. Por enquanto, explore à vontade e já vai salvando o que
            curtir.
          </p>
        </section>
      </div>
    </Layout>
  );
}
