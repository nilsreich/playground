"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { decompressFromEncodedURIComponent } from "lz-string";
import { useTheme } from "next-themes";

export const Sandpack = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const search = searchParams.get("search");
  const reescapedCode = decompressFromEncodedURIComponent(search ?? "")
    ?.replace(/\\x20/g, " ")
    .replace(/\\n/g, "\n")
    .replace(/\\'/g, "'");

  return (
    <SandpackProvider
      theme={theme === "dark" ? "dark" : "light"}
      template="react"
      options={{
        //bundlerURL: "https://sandpack-bundler.codesandbox.io",
        externalResources: ["https://cdn.tailwindcss.com"],
        classes: {
          "sp-editor": "h-full",
          "sp-console": "h-full",
          "sp-cube-wrapper": "hidden",
        },
      }}
      files={{
        "App.js": {
          code: search
            ? `${reescapedCode}`
            : `export default function App() {\n\x20console.log("Hello World!")\n\x20return <h1>Hello Sandpack</h1>\n}`,
        },
      }}
    >
      {children}
    </SandpackProvider>
  );
};
