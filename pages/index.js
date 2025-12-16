// pages/index.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [carregandoUser, setCarregandoUser] = useState(true);

  // Tema local da Home, sincronizado com o que foi salvo no Perfil
  const [isDark, setIsDark] = useState(false);

  // Carrega usuário logado
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

  // Descobre o tema: lê do localStorage (papopronto_tema) ou do sistema
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

    // Se não tiver nada salvo, usa o tema do sistema
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
  }, []);

  const saudacao = getSaudacaoPorHorario();

  const nomeUsuario =
    user?.user_metadata?.nome ||
    (user?.email ? user.email.split("@")[0] : "você");

  // Classes auxiliares baseadas no tema
  const bgTela = isDark ? "bg-slate-950" : "bg-slate-100"; // fundo geral da Home
  const textoPrincipal = isDark ? "text-slate-50" : "text-[#0b1f33]";
  const textoSecundario = isDark ? "text-slate-300" : "text-slate-600";
  const textoEtiqueta = isDark ? "text-slate-300" : "text-slate-600";
  const cardClaro = isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200";
  const textoCardTitulo = isDark ? "text-slate-50" : "text-[#0b1f33]";
  const textoCardDescricao = isDark ? "text-slate-300" : "text-slate-600";
  const badgeFavoritosBg = isDark
    ? "bg-slate-900/40 border-slate-700"
    : "bg-slate-50/80 border-slate-300";
  const badgeFavoritosTexto = isDark ? "text-slate-300" : "text-slate-600";

  return (
    <Layout title="Início">
      <div className={`min-h-full ${bgTela}`}>
        <div className="px-4 pt-4 pb-24 max-w-md mx-auto space-y-5">
          {/* Saudação principal */}
          <section className="space-y-1 mt-1">
            <p className={`text-[11px] font-semibold ${textoEtiqueta} uppercase tracking-[0.16em]`}>
              PAPOPRONTO
            </p>
            <h1 className={`text-[20px] font-semibold ${textoPrincipal} leading-snug`}>
              {carregandoUser
                ? "Bom dia."
                : `${saudacao}, ${nomeUsuario}.`}
            </h1>
            <p className={`text-[13px] ${textoSecundario}`}>
              Qual a estratégia de hoje?
            </p>
          </section>

          {/* ABRIDORES DE CONVERSA */}
          <section className="space-y-2">
            <p className={`text-[11px] font-semibold ${textoEtiqueta} uppercase tracking-[0.16em]`}>
              ABRIDORES DE CONVERSA
            </p>

            <div className="grid grid-cols-2 gap-3">
              {/* Card 1 - Resposta de Story (mantido como estava) */}
              <button
                type="button"
                onClick={() => router.push("/guru")}
                className="rounded-3xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-3 py-3 text-left shadow-sm active:scale-[0.99] transition"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-7 w-7 rounded-2xl bg-white/15 flex items-center justify-center text-[16px]">
                    📸
                  </div>
                  <p className="text-[11px] font-semibold text-white/90 uppercase tracking-[0.16em]">
                    RESPOSTA DE STORY
                  </p>
                </div>
                <p className="text-[12px] font-medium text-white">
                  Fugindo do foguinho
                </p>
              </button>

              {/* Card 2 - Fugindo do "oi tudo bem" (mantido como estava) */}
              <button
                type="button"
                onClick={() => router.push("/guru")}
                className="rounded-3xl bg-gradient-to-r from-orange-500 via-rose-500 to-red-500 px-3 py-3 text-left shadow-sm active:scale-[0.99] transition"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-7 w-7 rounded-2xl bg-white/15 flex items-center justify-center text-[16px]">
                    🔥
                  </div>
                  <p className="text-[11px] font-semibold text-white/90 uppercase tracking-[0.16em]">
                    FUGINDO DO &quot;OI TUDO BEM&quot;
                  </p>
                </div>
                <p className="text-[12px] font-medium text-white">
                  O 1º oi perfeito
                </p>
              </button>
            </div>
          </section>

          {/* O PAPO */}
          <section className="space-y-2">
            <p className={`text-[11px] font-semibold ${textoEtiqueta} uppercase tracking-[0.16em]`}>
              O PAPO
            </p>

            {/* Gerador de assunto infinito:
                - Claro: fundo branco + texto azul
                - Escuro: fundo escuro + texto claro */}
            <button
              type="button"
              onClick={() => router.push("/guru")}
              className={`w-full rounded-3xl border px-3 py-3 text-left shadow-sm active:scale-[0.99] transition ${cardClaro}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[16px]">
                  🎲
                </div>
                <p className={`text-[12px] font-semibold ${textoCardTitulo}`}>
                  Gerador de assunto infinito
                </p>
              </div>
              <p className={`text-[12px] ml-10 ${textoCardDescricao}`}>
                Nunca mais fique sem saber o que falar.
              </p>
            </button>
          </section>

          {/* GESTÃO DE CRISE */}
          <section className="space-y-2">
            <p className={`text-[11px] font-semibold ${textoEtiqueta} uppercase tracking-[0.16em]`}>
              GESTÃO DE CRISE
            </p>

            <div className="space-y-2">
              {/* Ela sumiu? */}
              <button
                type="button"
                onClick={() => router.push("/guru")}
                className={`w-full rounded-2xl border px-3 py-2.5 flex items-center justify-between text-left active:scale-[0.99] transition ${cardClaro}`}
              >
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[16px]">
                    👻
                  </div>
                  <div>
                    <p className={`text-[12px] font-semibold ${textoCardTitulo}`}>
                      Ela sumiu? (Ressuscitador)
                    </p>
                  </div>
                </div>
                <span className="text-[16px] text-slate-400">›</span>
              </button>

              {/* Análise de resposta seca (SOS) */}
              <button
                type="button"
                onClick={() => router.push("/guru")}
                className={`w-full rounded-2xl border px-3 py-2.5 flex items-center justify-between text-left active:scale-[0.99] transition ${cardClaro}`}
              >
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[13px] font-semibold text-rose-500">
                    SOS
                  </div>
                  <div>
                    <p className={`text-[12px] font-semibold ${textoCardTitulo}`}>
                      Análise de resposta seca (kkk)
                    </p>
                  </div>
                </div>
                <span className="text-[16px] text-slate-400">›</span>
              </button>
            </div>
          </section>

          {/* Minhas Mensagens Favoritas */}
          <section className="space-y-2 mb-4">
            <p className={`text-[11px] font-semibold ${textoEtiqueta} uppercase tracking-[0.16em]`}>
              MINHAS MENSAGENS FAVORITAS
            </p>

            <div
              className={`w-full rounded-2xl border border-dashed px-3 py-3 ${badgeFavoritosBg}`}
            >
              <p className={`text-[12px] ${badgeFavoritosTexto}`}>
                As mensagens que você favoritar nas vibes aparecem aqui para
                você reutilizar quando quiser.
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
