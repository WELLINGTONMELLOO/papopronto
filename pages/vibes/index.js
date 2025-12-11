// pages/vibes/index.js
import { vibes } from "../../data/conteudo";

export default function VibesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Cabeçalho */}
      <header className="flex items-center gap-2 px-4 py-3 border-b bg-white">
        <a href="/" className="text-xl mr-2">
          ←
        </a>
        <div>
          <h1 className="text-base font-semibold text-slate-800">
            Frases por vibe
          </h1>
          <p className="text-xs text-slate-500">
            Escolha o tom da conversa.
          </p>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 px-4 py-4 pb-20">
        <div className="flex flex-col gap-3">
          {vibes.map((vibe) => (
            <a
              key={vibe.id}
              href={`/vibes/${vibe.id}`}
              className="rounded-xl bg-white border px-3 py-3 shadow-sm flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{vibe.icone}</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {vibe.nome}
                  </span>
                  {vibe.premium && (
                    <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">
                      PRO
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {vibe.descricao}
                </p>
              </div>
              <span className="text-xs text-slate-400">Ver</span>
            </a>
          ))}
        </div>
      </main>

      {/* Menu inferior */}
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-white px-4 py-2 flex justify-between">
        <a href="/" className="flex flex-col items-center text-xs text-slate-500">
          <span>🏠</span>
          <span>Início</span>
        </a>
        <a href="/vibes" className="flex flex-col items-center text-xs text-sky-700">
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
