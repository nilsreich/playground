"use client";

import "./globals.css";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { useSearchParams } from "next/navigation";
import { decompressFromEncodedURIComponent } from "lz-string";
import { Toaster } from "@/components/ui/sonner";
import { SandpackCSS } from "@/components/sandpack-styles";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const reescapedCode = decompressFromEncodedURIComponent(search ?? "")
    ?.replace(/\\x20/g, " ")
    .replace(/\\n/g, "\n")
    .replace(/\\'/g, "'");

  return (
    <html lang="en">
      <head>
        <SandpackCSS />
      </head>
      <body>
        <SandpackProvider
          template="react"
          options={{
            //bundlerURL: "https://sandpack-bundler.codesandbox.io",
            externalResources: ["https://cdn.tailwindcss.com"],
            classes: {
              "sp-editor": "h-full",
              "sp-console": "h-full",
            },
          }}
          files={{
            "App.js": {
              code: search
                ? `${reescapedCode}`
                : `export default function App() {\n\x20return <h1>Hello Sandpack</h1>\n}`,
            },
          }}
        >
          {children}
        </SandpackProvider>
        <Toaster />
      </body>
    </html>
  );
}
