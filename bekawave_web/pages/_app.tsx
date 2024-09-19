import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { fontSans, fontMono, fontBaloo } from "@/config/fonts";
import "@/styles/globals.css";
import { ModalProvider } from "@/src/providers/ModalProvider";
import { NotificationProvider } from "@/src/providers/NotificationProvider";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider>
        <ModalProvider>
          <NotificationProvider>
            <Component {...pageProps} />
          </NotificationProvider>
        </ModalProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
  baloo: fontBaloo.style.fontFamily,
};
