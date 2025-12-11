// pages/index.js - Home do PapoPronto
import { useEffect, useState } from "react";

export default function Home() {
  const [nomeUsuario, setNomeUsuario] = useState("Guerreiro(a)");

  // Carrega o nome salvo no localStorage, se existir
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const bruto = localStorage.getItem("papopronto_usuario");
      if (!bruto) return;

      const usuario = JSON.parse(bruto);
      if (usuario && typeof usuario.nome === "string" && usuario.nome.trim()) {
        setNomeUsuario(usuario.nome.trim());
      }
    } catch (erro) {
      console.error("Erro ao carregar dados do usuário:", erro);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between px-4 py-3 border-b bg-white">
        <div>
          <h1 className="text-sm text-slate-500">PapoPronto</h1>
        </div>
        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
          PP
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 px-4 py-4 pb-20">
        {/* Saudação */}
        <section className="mb-4">
          <p className="text-xl font-semibold text-slate-800">
            Bom dia, {nomeUsuario}.
          </p>
          <p className="text-sm text-slate-500">
            Qual é o papo de hoje?
          </p>
        </section>

        {/* Card destaque do dia */}
        <section className="mb-4">
          <div className="rounded-xl bg-sky-900 text-slate-50 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚡</span>
              <h2 className="text-sm font-semibold uppercase tracking-wide">
                A boa da sexta-feira
              </h2>
            </div>
            <p className="text-sm text-slate-100 mb-3">
              3 frases prontas pra usar se for pro bar hoje.
            </p>
            <button className="text-xs font-semibold bg-amber-400 text-slate-900 px-3 py-1 rounded-full">
              Ver dicas agora
            </button>
          </div>
        </section>

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
      </main>

      {/* Menu inferior */}
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-white px-4 py-2 flex justify-between">
        <a href="/" className="flex flex-col items-center text-xs text-sky-700">
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
