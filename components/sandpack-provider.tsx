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
      template="vite-react-ts"
      options={{
       // bundlerURL: "https://sandpack-bundler.codesandbox.io",
        // externalResources: ["https://cdn.tailwindcss.com"],
        classes: {
          "sp-editor": "h-full",
          "sp-console": "h-full",
          "sp-cube-wrapper": "hidden",
        },
        visibleFiles: ["/App.js", "/styles.css "],
      }}
      /* files={{
        "App.js": {
          code: search
            ? `${reescapedCode}`
            : `export default function App() {\n\x20console.log("Hello World!")\n\x20return <h1>Hello Sandpack</h1>\n}`,
        },
        "styles.css": {
          code: `body {\n\x20color: white;\n\x20background-color: #151515;\n\x20font-family: sans-serif;\n\x20display: flex;\n\x20justify-content: center;\n\x20align-items: center;\n\x20height: 100vh;\n\x20margin: 0;\n\x20
          }`,
        },
      }}*/
    >
      {children}
    </SandpackProvider>
  );
};
