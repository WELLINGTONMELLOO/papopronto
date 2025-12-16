// pages/perfil.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [carregandoUser, setCarregandoUser] = useState(true);

  // Tema local da tela de Perfil (sincronizado com o que está salvo)
  const [isDark, setIsDark] = useState(false);

  // Carregar usuário logado
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

  // Ler tema salvo ou tema do sistema
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

  const nome =
    user?.user_metadata?.nome ||
    (user?.email ? user.email.split("@")[0] : "Você");

  const email = user?.email || "";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Classes de cor, alinhadas com a Home
  const bgTela = isDark ? "bg-slate-950" : "bg-slate-100";
  const cardBg = isDark ? "bg-slate-900" : "bg-white";
  const cardBorder = isDark ? "border-slate-700" : "border-slate-200";
  const tituloPrincipal = isDark ? "text-slate-50" : "text-[#0b1f33]";
  const textoSecundario = isDark ? "text-slate-300" : "text-slate-600";
  const etiqueta = isDark ? "text-slate-300" : "text-slate-600";
  const separador = isDark ? "border-slate-800" : "border-slate-200";

  return (
    <Layout title="Perfil">
      <div className={`min-h-full ${bgTela}`}>
        <div className="px-4 pt-4 pb-24 max-w-md mx-auto space-y-5">
          {/* Cabeçalho interno da página de perfil */}
          <section className="mt-1 space-y-1">
            <p
              className={`text-[11px] font-semibold ${etiqueta} uppercase tracking-[0.16em]`}
            >
              PERFIL
            </p>
            <h1
              className={`text-[20px] font-semibold ${tituloPrincipal} leading-snug`}
            >
              {carregandoUser ? "Carregando..." : nome}
            </h1>
            <p className={`text-[13px] ${textoSecundario}`}>
              Aqui você gerencia seus dados e preferências do PapoPronto.
            </p>
          </section>

          {/* Card de dados da conta */}
          <section>
            <div
              className={`rounded-2xl border px-3 py-3 ${cardBg} ${cardBorder}`}
            >
              <p
                className={`text-[11px] font-semibold ${etiqueta} uppercase tracking-[0.16em] mb-2`}
              >
                CONTA
              </p>

              <div className="space-y-1">
                <p className={`text-[13px] ${textoSecundario}`}>Nome</p>
                <p
                  className={`text-[14px] font-semibold ${tituloPrincipal}`}
                >
                  {carregandoUser ? "—" : nome}
                </p>
              </div>

              <div className={`border-t mt-3 pt-3 ${separador}`}>
                <p className={`text-[13px] ${textoSecundario}`}>E-mail</p>
                <p
                  className={`text-[14px] font-semibold break-all ${tituloPrincipal}`}
                >
                  {carregandoUser ? "—" : email}
                </p>
              </div>
            </div>
          </section>

          {/* Card de personalização / tema */}
          <section>
            <div
              className={`rounded-2xl border px-3 py-3 ${cardBg} ${cardBorder}`}
            >
              <p
                className={`text-[11px] font-semibold ${etiqueta} uppercase tracking-[0.16em] mb-2`}
              >
                PERSONALIZAÇÃO
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-[14px] font-semibold ${tituloPrincipal}`}
                  >
                    Tema do app
                  </p>
                  <p className={`text-[12px] ${textoSecundario}`}>
                    Altere o tema no botão no topo desta tela.
                  </p>
                </div>
                <span className="text-[12px] text-slate-400">
                  {isDark ? "Escuro" : "Claro"}
                </span>
              </div>
            </div>
          </section>

          {/* Card de sessão / sair */}
          <section>
            <div
              className={`rounded-2xl border px-3 py-3 ${cardBg} ${cardBorder}`}
            >
              <p
                className={`text-[11px] font-semibold ${etiqueta} uppercase tracking-[0.16em] mb-2`}
              >
                SESSÃO
              </p>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full mt-1 inline-flex items-center justify-center rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-[13px] font-semibold py-2.5 transition active:scale-[0.99]"
              >
                Sair do PapoPronto
              </button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
