// components/Layout.js
import React, { useEffect, useState } from "react";

export default function Layout({
  children,
  title,
  subtitle,
  showBack = false,
  backHref = "/",
  activeTab = "home",
}) {
  const [darkMode, setDarkMode] = useState(false);

  // Carrega tema salvo no localStorage (se existir)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const salvo = localStorage.getItem("papopronto_tema");
      if (salvo === "dark") {
        setDarkMode(true);
      }
    } catch (erro) {
      console.error("Erro ao ler tema salvo:", erro);
    }
  }, []);

  // Salva tema sempre que trocar
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem("papopronto_tema", darkMode ? "dark" : "light");
    } catch (erro) {
      console.error("Erro ao salvar tema:", erro);
    }
  }, [darkMode]);

  function toggleTema() {
    setDarkMode((valorAtual) => !valorAtual);
  }

  // Classes baseadas no tema
  const pageBg = darkMode ? "bg-slate-950" : "bg-slate-50";
  const appBg = darkMode ? "bg-slate-950" : "bg-slate-50";

  const headerBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";
  const headerTitle = darkMode ? "text-slate-100" : "text-slate-800";
  const headerSubtitle = darkMode ? "text-slate-400" : "text-slate-500";
  const headerBrand = darkMode ? "text-slate-400" : "text-slate-500";

  const avatarBg = darkMode ? "bg-slate-700 text-slate-100" : "bg-slate-200 text-slate-600";
  const toggleBg = darkMode ? "bg-slate-800 text-slate-100" : "bg-slate-100 text-slate-700";

  const mainTitle = darkMode ? "text-slate-100" : "text-slate-800";
  const mainSubtitle = darkMode ? "text-slate-400" : "text-slate-500";

  const navBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";
  const navActive = darkMode ? "text-sky-400" : "text-sky-700";
  const navInactive = darkMode ? "text-slate-400" : "text-slate-500";

  return (
    <div className={`min-h-screen flex justify-center ${pageBg}`}>
      {/* Container central com largura máxima (app "mobile" no centro da tela) */}
      <div className={`flex flex-col w-full max-w-md ${appBg} relative`}>
        {/* Cabeçalho */}
        <header
          className={`flex items-center justify-between px-4 py-3 border-b ${headerBg}`}
        >
          {showBack ? (
            <>
              <div className="flex items-center gap-2">
                <a
                  href={backHref}
                  className={`text-xl ${darkMode ? "text-slate-200" : "text-slate-700"}`}
                >
                  ←
                </a>
                <div>
                  <h1 className={`text-base font-semibold ${headerTitle}`}>
                    {title}
                  </h1>
                  {subtitle && (
                    <p className={`text-xs ${headerSubtitle}`}>{subtitle}</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={toggleTema}
                className={`text-lg px-2 py-1 rounded-full ${toggleBg}`}
                title={
                  darkMode
                    ? "Mudar para modo claro"
                    : "Mudar para modo escuro"
                }
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </>
          ) : (
            <>
              <div>
                <h1 className={`text-sm ${headerBrand}`}>PapoPronto</h1>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleTema}
                  className={`text-lg px-2 py-1 rounded-full ${toggleBg}`}
                  title={
                    darkMode
                      ? "Mudar para modo claro"
                      : "Mudar para modo escuro"
                  }
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${avatarBg}`}
                >
                  PP
                </div>
              </div>
            </>
          )}
        </header>

        {/* Conteúdo */}
        <main className="flex-1 px-4 py-4 pb-20">
          {/* Quando não há "showBack", a Home usa o título dentro do conteúdo */}
          {!showBack && title && (
            <section className="mb-4">
              <h2 className={`text-xl font-semibold ${mainTitle}`}>{title}</h2>
              {subtitle && (
                <p className={`text-sm ${mainSubtitle}`}>{subtitle}</p>
              )}
            </section>
          )}

          {children}
        </main>

        {/* Menu inferior */}
        <nav
          className={`fixed bottom-0 left-0 right-0 border-t px-4 py-2 flex justify-center ${navBg}`}
        >
          <div className="w-full max-w-md flex justify-between">
            <a
              href="/"
              className={`flex flex-col items-center text-xs ${
                activeTab === "home" ? navActive : navInactive
              }`}
            >
              <span>🏠</span>
              <span>Início</span>
            </a>
            <a
              href="/vibes"
              className={`flex flex-col items-center text-xs ${
                activeTab === "vibes" ? navActive : navInactive
              }`}
            >
              <span>📂</span>
              <span>Frases</span>
            </a>
            <a
              href="/guru"
              className={`flex flex-col items-center text-xs ${
                activeTab === "guru" ? navActive : navInactive
              }`}
            >
              <span>🤖</span>
              <span>Guru IA</span>
            </a>
            <a
              href="/perfil"
              className={`flex flex-col items-center text-xs ${
                activeTab === "perfil" ? navActive : navInactive
              }`}
            >
              <span>👤</span>
              <span>Perfil</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
