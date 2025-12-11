// pages/vibes/index.js
import Layout from "../../components/Layout";
import { vibes } from "../../data/conteudo";

export default function VibesPage() {
  return (
    <Layout
      showBack={true}
      backHref="/"
      title="Vibes brasileiras"
      subtitle="Escolha o tom da conversa para ver as frases prontas."
      activeTab="vibes"
    >
      <div className="flex flex-col gap-3">
        {vibes.map((vibe) => {
          const isPro = !!vibe.pro;

          return (
            <a
              key={vibe.id}
              href={`/vibes/${vibe.id}`}
              className={`rounded-xl border px-3 py-3 shadow-sm flex items-center justify-between ${
                isPro ? "bg-slate-100 border-dashed border-amber-400" : "bg-white"
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-lg">{vibe.icone}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                    {vibe.nome}
                    {isPro && (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-[2px] rounded-full">
                        PRO · em breve
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-500">{vibe.descricao}</p>
                </div>
              </div>
              <span className="text-xs text-slate-400">
                {isPro ? "Ver detalhes" : "Ver frases"}
              </span>
            </a>
          );
        })}
      </div>
    </Layout>
  );
}
