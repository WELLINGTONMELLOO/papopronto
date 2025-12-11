// components/Layout.js
import React from "react";

export default function Layout({
  children,
  title,
  subtitle,
  showBack = false,
  backHref = "/",
  activeTab = "home",
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Cabeçalho */}
      <header className="flex items-center gap-2 px-4 py-3 border-b bg-white">
        {showBack ? (
          <a href={backHref} className="text-xl mr-2">
            ←
          </a>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="text-sm text-slate-500">PapoPronto</h1>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
              PP
            </div>
          </div>
        )}

        {showBack && (
          <div>
            <h1 className="text-base font-semibold text-slate-800">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500">{subtitle}</p>
            )}
          </div>
        )}
      </header>

      {/* Conteúdo */}
      <main className="flex-1 px-4 py-4 pb-20">
        {/* Quando não há "showBack", a Home usa o título dentro do conteúdo */}
        {!showBack && title && (
          <section className="mb-4">
            <h2 className="text-xl font-semibold text-slate-800">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-slate-500">{subtitle}</p>
            )}
          </section>
        )}

        {children}
      </main>

      {/* Menu inferior */}
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-white px-4 py-2 flex justify-between">
        <a
          href="/"
          className={`flex flex-col items-center text-xs ${
            activeTab === "home" ? "text-sky-700" : "text-slate-500"
          }`}
        >
          <span>🏠</span>
          <span>Início</span>
        </a>
        <a
          href="/vibes"
          className={`flex flex-col items-center text-xs ${
            activeTab === "vibes" ? "text-sky-700" : "text-slate-500"
          }`}
        >
          <span>📂</span>
          <span>Frases</span>
        </a>
        <a
          href="/guru"
          className={`flex flex-col items-center text-xs ${
            activeTab === "guru" ? "text-sky-700" : "text-slate-500"
          }`}
        >
          <span>🤖</span>
          <span>Guru IA</span>
        </a>
        <a
          href="/perfil"
          className={`flex flex-col items-center text-xs ${
            activeTab === "perfil" ? "text-sky-700" : "text-slate-500"
          }`}
        >
          <span>👤</span>
          <span>Perfil</span>
        </a>
      </nav>
    </div>
  );
}
