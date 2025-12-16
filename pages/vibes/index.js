// pages/vibes/index.js
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { vibes } from "../../data/conteudo";
import { Receipt, Music, Tv, Brain, Sparkles } from "lucide-react";

export default function VibesPage() {
  // Tema (mesma lógica do Perfil)
  const [isDark, setIsDark] = useState(false);

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

  // Mapa de ícones (string -> componente)
  const iconMap = {
    receipt: Receipt,
    music: Music,
    tv: Tv,
    brain: Brain,
  };

  // Classes alinhadas com Home/Perfil
  const cardBg = isDark ? "bg-slate-900" : "bg-white";
  const cardBorder = isDark ? "border-slate-700" : "border-slate-200";
  const titulo = isDark ? "text-slate-50" : "text-slate-800";
  const descricao = isDark ? "text-slate-300" : "text-slate-500";
  const acao = isDark ? "text-slate-400" : "text-slate-400";

  const proCardBg = isDark ? "bg-slate-900" : "bg-slate-100";
  const proBorder = isDark ? "border-amber-500" : "border-amber-400";
  const proBadgeBg = isDark ? "bg-amber-900/40" : "bg-amber-100";
  const proBadgeText = isDark ? "text-amber-200" : "text-amber-700";

  const iconColor = isDark ? "text-slate-200" : "text-slate-700";
  const iconProColor = isDark ? "text-amber-200" : "text-amber-700";

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
          const Icon = iconMap[vibe.icone] || Sparkles;

          return (
            <a
              key={vibe.id}
              href={`/vibes/${vibe.id}`}
              className={`rounded-xl border px-3 py-3 shadow-sm flex items-center justify-between ${
                isPro
                  ? `${proCardBg} border-dashed ${proBorder}`
                  : `${cardBg} ${cardBorder}`
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="mt-[2px]">
                  <Icon
                    className={`h-5 w-5 ${isPro ? iconProColor : iconColor}`}
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <p
                    className={`text-sm font-semibold flex items-center gap-1 ${titulo}`}
                  >
                    {vibe.nome}
                    {isPro && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${proBadgeText} ${proBadgeBg}`}
                      >
                        PRO · em breve
                      </span>
                    )}
                  </p>
                  <p className={`text-xs ${descricao}`}>{vibe.descricao}</p>
                </div>
              </div>

              <span className={`text-xs ${acao}`}>
                {isPro ? "Ver detalhes" : "Ver frases"}
              </span>
            </a>
          );
        })}
      </div>
    </Layout>
  );
}
