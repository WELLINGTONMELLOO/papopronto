// pages/_app.js
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

// Rotas que NÃO precisam de login
const publicRoutes = ["/login"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (!isMounted) return;

        if (error) {
          console.error("Erro ao obter sessão do Supabase:", error);
        }

        setSession(data?.session ?? null);

        const isPublic = publicRoutes.includes(router.pathname);

        // Se não tiver sessão e a rota NÃO for pública, manda pro /login
        if (!data?.session && !isPublic) {
          router.replace("/login");
        }
      } catch (err) {
        console.error("Erro inesperado ao checar sessão:", err);
      } finally {
        if (isMounted) {
          setCheckingAuth(false);
        }
      }
    }

    checkSession();

    // Listener para mudanças de auth (login / logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);

      const isPublic = publicRoutes.includes(router.pathname);

      // Se deslogar e estiver numa rota privada, manda pro login
      if (!newSession && !isPublic) {
        router.replace("/login");
      }

      // Se logar e estiver no /login, manda pra Home
      if (newSession && router.pathname === "/login") {
        router.replace("/");
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router.pathname]);

  const isPublicRoute = publicRoutes.includes(router.pathname);

  // Enquanto verifica auth em rotas privadas, mostra uma tela de carregamento
  if (!isPublicRoute && checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="h-10 w-10 rounded-full border-2 border-sky-500 border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-200 font-semibold">
            Abrindo seu PapoPronto...
          </p>
          <p className="text-[11px] text-slate-500">
            Só checando sua sessão rapidinho.
          </p>
        </div>
      </div>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;
