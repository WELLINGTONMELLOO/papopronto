// components/Layout.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Home, Sparkles, Brain, User } from "lucide-react";

export default function Layout({ title, children }) {
  const router = useRouter();

  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  // Descobre tema inicial: localStorage ou tema do sistema
  useEffect(() => {
    function getInitialTheme() {
      if (typeof window === "undefined") return "dark";

      const stored = window.localStorage.getItem("papopronto_tema");
      if (stored === "light" || stored === "dark") {
        return stored;
      }

      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      return prefersDark ? "dark" : "light";
    }

    const initial = getInitialTheme();
    setTheme(initial);
    setMounted(true);
  }, []);

  // Aplica tema no <html> e salva no localStorage
  useEffect(() => {
    if (!mounted) return;
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("papopronto_tema", theme);
    }
  }, [theme, mounted]);

  const isActive = (path) => router.pathname === path;

  const handleNav = (path) => {
    if (router.pathname !== path) {
      router.push(path);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isPerfil = router.pathname === "/perfil";

  // Enquanto não sabe o tema, evita piscar
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="h-10 w-10 rounded-full border-2 border-sky-500 border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-200 font-semibold">
            Abrindo seu PapoPronto...
          </p>
          <p className="text-[11px] text-slate-500">
            Ajustando o tema de acordo com o seu aparelho.
          </p>
        </div>
      </div>
    );
  }

  // Cores base por tema
  const containerBg =
    theme === "dark" ? "bg-slate-950" : "bg-slate-100"; // fundo geral off-white no claro
  const cardBg =
    theme === "dark" ? "bg-slate-950" : "bg-slate-50"; // cards/fundo interno ligeiramente mais claro
  const borderColor =
    theme === "dark" ? "border-slate-800" : "border-slate-200";
  const textTitle =
    theme === "dark" ? "text-slate-50" : "text-sky-900"; // azul marinho no claro
  const textSubtitle =
    theme === "dark" ? "text-slate-400" : "text-slate-500";

  return (
    <div className={`min-h-screen ${containerBg} flex justify-center`}>
      <div className="w-full max-w-md flex flex-col">
        {/* Cabeçalho fixo */}
        <header
          className={`${cardBg} ${borderColor} border-b px-4 pt-3 pb-2 flex items-center justify-between`}
        >
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-2xl bg-sky-500 flex items-center justify-center text-white text-sm font-bold">
              PP
            </div>
            <div>
              <p className={`text-sm font-semibold ${textTitle}`}>PapoPronto</p>
              <p className={`text-[11px] ${textSubtitle}`}>
                Conselheiro amoroso brasileiro
              </p>
            </div>
          </div>

          {/* Botão de tema: só na página Perfil */}
          {isPerfil && (
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold
                border-slate-700 text-slate-200 bg-slate-900/60
                dark:border-slate-600 dark:bg-slate-800/80"
            >
              <span>{theme === "dark" ? "Tema escuro" : "Tema claro"}</span>
            </button>
          )}
        </header>

        {/* Conteúdo da página */}
        <main className={`${cardBg} flex-1`}>{children}</main>

        {/* Navegação inferior */}
        <nav
          className={`${cardBg} ${borderColor} border-t px-4 py-2 flex justify-between`}
        >
          <button
            type="button"
            onClick={() => handleNav("/")}
            className="flex flex-col items-center flex-1"
          >
            <Home
              className={`h-5 w-5 ${
                isActive("/") ? "text-sky-400" : "text-slate-400"
              }`}
              aria-hidden="true"
            />
            <span
              className={`text-[10px] ${
                isActive("/") ? "text-sky-400" : "text-slate-400"
              }`}
            >
              Home
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNav("/vibes")}
            className="flex flex-col items-center flex-1"
          >
            <Sparkles
              className={`h-5 w-5 ${
                isActive("/vibes") ? "text-sky-400" : "text-slate-400"
              }`}
              aria-hidden="true"
            />
            <span
              className={`text-[10px] ${
                isActive("/vibes") ? "text-sky-400" : "text-slate-400"
              }`}
            >
              Vibes
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNav("/guru")}
            className="flex flex-col items-center flex-1"
          >
            <Brain
              className={`h-5 w-5 ${
                isActive("/guru") ? "text-sky-400" : "text-slate-400"
              }`}
              aria-hidden="true"
            />
            <span
              className={`text-[10px] ${
                isActive("/guru") ? "text-sky-400" : "text-slate-400"
              }`}
            >
              Guru IA
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNav("/perfil")}
            className="flex flex-col items-center flex-1"
          >
            <User
              className={`h-5 w-5 ${
                isActive("/perfil") ? "text-sky-400" : "text-slate-400"
              }`}
              aria-hidden="true"
            />
            <span
              className={`text-[10px] ${
                isActive("/perfil") ? "text-sky-400" : "text-slate-400"
              }`}
            >
              Perfil
            </span>
          </button>
        </nav>
      </div>
    </div>
  );
}
