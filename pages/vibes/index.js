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
        {vibes.map((vibe) => (
          <a
            key={vibe.id}
            href={`/vibes/${vibe.id}`}
            className="rounded-xl bg-white border px-3 py-3 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">{vibe.icone}</span>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {vibe.nome}
                </p>
                <p className="text-xs text-slate-500">{vibe.descricao}</p>
              </div>
            </div>
            <span className="text-xs text-slate-400">Ver frases</span>
          </a>
        ))}
      </div>
    </Layout>
  );
}
