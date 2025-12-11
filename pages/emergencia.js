// pages/emergencia.js
import Layout from "../components/Layout";
import { blocosEmergencia } from "../data/conteudo";

export default function EmergenciaPage() {
  return (
    <Layout
      showBack={true}
      backHref="/"
      title="Botão de Emergência"
      subtitle="Escolha a situação e copie um papo pronto na hora."
      activeTab="home"
    >
      <div className="flex flex-col gap-4">
        {blocosEmergencia.map((bloco) => (
          <div
            key={bloco.id}
            className="rounded-xl bg-white border px-3 py-3 shadow-sm"
          >
            <div className="mb-2">
              <h2 className="text-sm font-semibold text-slate-800">
                {bloco.titulo}
              </h2>
              <p className="text-[11px] text-slate-500">
                {bloco.descricao}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {bloco.frases.map((frase, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border px-2 py-2 text-xs text-slate-700 bg-slate-50 flex flex-col gap-1"
                >
                  <p>{frase}</p>
                  <div>
                    <button
                      className="text-[11px] px-2 py-1 rounded-full border border-sky-400 text-sky-700"
                      onClick={() => {
                        navigator.clipboard.writeText(frase);
                        alert("Papo copiado. Vai na fé.");
                      }}
                    >
                      Copiar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
