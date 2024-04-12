"use client";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SandpackCSS } from "@/components/sandpack-styles";
import { ThemeProvider } from "@/components/theme-provider";
import { Sandpack } from "@/components/sandpack-provider";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SandpackCSS />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Suspense>
            <Sandpack>{children}</Sandpack>
          </Suspense>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
