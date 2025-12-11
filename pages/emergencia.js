// pages/emergencia.js
import Layout from "../components/Layout";

const blocos = [
  {
    titulo: "Encontro travado",
    descricao: "Quando bate o silêncio na mesa.",
    frases: [
      "Tô aqui tentando fazer uma pergunta inteligente, mas minha mente só tá pensando em como você tá bonito(a) hoje.",
      "Você é mais do time série, filme ou ficar falando besteira até tarde?",
    ],
  },
  {
    titulo: "Whats travou",
    descricao: "Quando o papo morre do nada.",
    frases: [
      "Sumiu ou a gente já pode marcar o casamento e eu não fiquei sabendo? 😂",
      "Vou fingir que não notei seu sumiço… mas só dessa vez.",
    ],
  },
  {
    titulo: "Resposta seca",
    descricao: "Quando só vem 'kk', 'blz', 'uai'.",
    frases: [
      "Senti um 'tô sem assunto' aí… quer que eu puxe um tema aleatório ou a gente fala de coisa séria?",
      "Tô em dúvida se você tá com sono ou só me testando pra ver se eu desisto 😂",
    ],
  },
];

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
        {blocos.map((bloco, i) => (
          <div
            key={i}
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
                        alert("Papo copiado. Vai na fé 😉");
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
