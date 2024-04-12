"use client";

import "./globals.css";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { useSearchParams } from "next/navigation";
import { decompressFromEncodedURIComponent } from "lz-string";
import { Suspense } from "react";

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
      <body>
        <SandpackProvider
          template="react"
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
            classes: {
              "sp-editor":
                "md:h-[100vh] border-b h-[50vh] md:border-r md:border-b-0",
            },
          }}
          files={{
            "App.js": {
              code: search
                ? `${reescapedCode}`
                : `export default function App() {
                return <h1>Hello Sandpack</h1>
              }`,
            },
          }}
        >
          <Suspense>{children} </Suspense>
        </SandpackProvider>
      </body>
    </html>
  );
}
