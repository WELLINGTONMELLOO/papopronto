// pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState("login"); // "login" ou "signup"
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const isSignup = mode === "signup";

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setMensagem("");
    setLoading(true);

    try {
      if (!email || !senha || (isSignup && !nome)) {
        setErro("Preencha todos os campos obrigatórios.");
        setLoading(false);
        return;
      }

      if (isSignup) {
        // CRIAR CONTA
        const { data, error } = await supabase.auth.signUp({
          email,
          password: senha,
          options: {
            data: {
              nome, // salva o nome como user_metadata.nome
            },
          },
        });

        if (error) {
          setErro(error.message || "Erro ao criar conta.");
          setLoading(false);
          return;
        }

        // Se o projeto NÃO exigir confirmação de e-mail,
        // data.session já vem preenchida e podemos redirecionar.
        if (data.session) {
          setMensagem("Conta criada com sucesso! Entrando...");
          // pequeno delay só para UX
          setTimeout(() => {
            router.push("/");
          }, 800);
          return;
        }

        // Se exigir confirmação de e-mail:
        setMensagem(
          "Conta criada! Verifique seu e-mail para confirmar antes de entrar."
        );
        setLoading(false);
        return;
      } else {
        // ENTRAR
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: senha,
        });

        if (error) {
          setErro(error.message || "Erro ao entrar.");
          setLoading(false);
          return;
        }

        if (data.session) {
          setMensagem("Login realizado com sucesso! Redirecionando...");
          setTimeout(() => {
            router.push("/");
          }, 800);
          return;
        }

        setErro("Não foi possível criar sessão. Tente novamente.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setErro("Erro inesperado. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-3xl bg-slate-950 border border-slate-800 shadow-xl p-5">
        {/* Logo / título */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-2xl bg-sky-500 flex items-center justify-center text-white text-sm font-bold">
              PP
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-50">
                PapoPronto
              </p>
              <p className="text-[11px] text-slate-400">
                Conselheiro amoroso no seu bolso
              </p>
            </div>
          </div>
        </div>

        {/* Abas Login / Criar conta */}
        <div className="flex mb-4 border border-slate-800 rounded-full p-1 bg-slate-900/60">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErro("");
              setMensagem("");
            }}
            className={`flex-1 text-[11px] px-2 py-1.5 rounded-full font-semibold transition ${
              mode === "login"
                ? "bg-slate-50 text-slate-900"
                : "text-slate-300"
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErro("");
              setMensagem("");
            }}
            className={`flex-1 text-[11px] px-2 py-1.5 rounded-full font-semibold transition ${
              mode === "signup"
                ? "bg-slate-50 text-slate-900"
                : "text-slate-300"
            }`}
          >
            Criar conta
          </button>
        </div>

        {/* Texto introdutório */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-slate-50 mb-1">
            {isSignup ? "Comece ajustando o seu PapoPronto" : "Bem-vindo de volta"}
          </p>
          <p className="text-[11px] text-slate-400">
            {isSignup
              ? "Crie sua conta para ter conselhos e mensagens com a sua cara."
              : "Entre para continuar de onde parou."}
          </p>
        </div>

        {/* Mensagens de erro / sucesso */}
        {erro && (
          <div className="mb-3 rounded-xl bg-rose-500/10 border border-rose-500/40 px-3 py-2">
            <p className="text-[11px] text-rose-200">{erro}</p>
          </div>
        )}
        {mensagem && (
          <div className="mb-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 px-3 py-2">
            <p className="text-[11px] text-emerald-200">{mensagem}</p>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignup && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-200 mb-1">
                Nome
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Como você quer ser chamado"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-200 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@exemplo.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-200 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-xl bg-sky-500 text-slate-950 text-sm font-semibold py-2.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? isSignup
                ? "Criando conta..."
                : "Entrando..."
              : isSignup
              ? "Criar conta"
              : "Entrar"}
          </button>
        </form>

        {/* Rodapé simples */}
        <div className="mt-4">
          <p className="text-[10px] text-slate-500 text-center">
            Ao continuar, você concorda em usar o PapoPronto com respeito e bom
            senso. Nada de mensagens ofensivas ou desrespeitosas.
          </p>
        </div>
      </div>
    </div>
  );
}
