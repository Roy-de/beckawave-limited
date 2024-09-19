import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link
        href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <body className="min-h-screen bg-background font-sans light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
