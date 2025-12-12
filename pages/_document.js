// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Manifest do PWA */}
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Cor da barra de endereço / status bar */}
        <meta name="theme-color" content="#020617" />

        {/* Ícone para iOS (Tela inicial do iPhone) */}
        <link
          rel="apple-touch-icon"
          href="/icons/icon-192x192.png"
        />

        {/* Meta básico */}
        <meta
          name="description"
          content="PapoPronto – App de conselhos amorosos, frases prontas e vibes brasileiras para desenrolar qualquer conversa."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
