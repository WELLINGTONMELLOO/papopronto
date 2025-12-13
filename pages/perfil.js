// pages/perfil.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [carregandoUser, setCarregandoUser] = useState(true);
  const [favoritos, setFavoritos] = useState([]);

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

    function carregarFavoritosLocal() {
      try {
        if (typeof window === "undefined") return;
        const bruto = localStorage.getItem("papopronto_favoritos");
        if (!bruto) {
          setFavoritos([]);
          return;
        }
        const parsed = JSON.parse(bruto);
        if (Array.isArray(parsed)) {
          setFavoritos(parsed);
        } else {
          setFavoritos([]);
        }
      } catch (err) {
        console.error("Erro ao ler favoritos do localStorage:", err);
        setFavoritos([]);
      }
    }

    carregarUsuario();
    carregarFavoritosLocal();

    return () => {
      ativo = false;
    };
  }, []);

  const nome =
    user?.user_metadata?.nome ||
    (user?.email ? user.email.split("@")[0] : "—");

  const email = user?.email || "—";

  const qtdFavoritos = favoritos.length;
  const exemplosFavoritos = favoritos.slice(0, 3);

  async function handleSair() {
    try {
      await supabase.auth.signOut();
      router.replace("/login");
    } catch (err) {
      console.error("Erro ao sair:", err);
    }
  }

  return (
    <Layout title="Perfil">
      <div className="px-4 pt-4 pb-24 max-w-md mx-auto space-y-5">
        {/* Cabeçalho */}
        <header className="space-y-1">
          <p className="text-sm font-semibold text-slate-50">
            Meu PapoPronto
          </p>
          <p className="text-[12px] text-slate-400">
            Veja seus dados básicos e um resumo do seu uso.
          </p>
        </header>

        {/* Bloco de dados do usuário */}
        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 px-4 py-3 space-y-3">
          <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wide">
            Seus dados
          </p>

          <div className="space-y-2">
            <div>
              <p className="text-[11px] text-slate-500">Nome</p>
              <p className="text-sm font-semibold text-slate-50">
                {carregandoUser ? "Carregando..." : nome}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500">E-mail</p>
              <p className="text-[12px] text-slate-200 break-all">{email}</p>
            </div>
          </div>

          <p className="text-[11px] text-slate-500">
            O nome exibido aqui é o mesmo que você informou no cadastro. No
            futuro, você poderá ajustar mais detalhes do seu perfil por aqui.
          </p>
        </section>

        {/* Bloco de favoritos */}
        <section className="rounded-2xl bg-slate-900/60 border border-slate-800 px-4 py-3 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wide">
              Mensagens favoritas
            </p>
            <span className="text-[11px] text-slate-400">
              {qtdFavoritos} salva{qtdFavoritos === 1 ? "" : "s"}
            </span>
          </div>

          {qtdFavoritos === 0 ? (
            <p className="text-[12px] text-slate-400">
              Você ainda não favoritou nenhuma mensagem. Entre nas vibes, toque
              no coraçãozinho ao lado das frases que você mais curtir e elas
              aparecem aqui.
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-[12px] text-slate-400">
                Algumas das suas favoritas:
              </p>
              <div className="space-y-2">
                {exemplosFavoritos.map((fav, idx) => (
                  <div
                    key={`${fav.id || idx}-${idx}`}
                    className="rounded-xl bg-slate-950/60 border border-slate-800 px-3 py-2"
                  >
                    <p className="text-[12px] text-slate-50">
                      {fav.texto || fav.frase || "Mensagem favorita"}
                    </p>
                    {fav.vibe && (
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Vibe: {fav.vibe}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => router.push("/vibes")}
                className="text-[11px] text-sky-400 underline underline-offset-4"
              >
                Ver vibes para salvar mais
              </button>
            </div>
          )}
        </section>

        {/* Ações */}
        <section className="space-y-2">
          <button
            type="button"
            onClick={handleSair}
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-2.5 text-[12px] font-semibold text-slate-200 hover:bg-slate-800/80 transition"
          >
            Sair da conta
          </button>
          <p className="text-[10px] text-slate-500 text-center">
            Ao sair, você precisará fazer login novamente para acessar suas
            mensagens e favoritos.
          </p>
        </section>
      </div>
    </Layout>
  );
}
