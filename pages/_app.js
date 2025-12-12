// pages/_app.js
import { useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("serviceWorker" in navigator) {
      // Registra o service worker depois que a página carregar
      const register = () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            // console.log("Service Worker registrado:", registration);
          })
          .catch((error) => {
            console.error("Erro ao registrar Service Worker:", error);
          });
      };

      // Garante que chamamos após o load
      if (document.readyState === "complete") {
        register();
      } else {
        window.addEventListener("load", register);
      }
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
