"use client";
import { Button } from "@/components/ui/button";
import {
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import { EyeIcon, Share2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

export default function Home() {
  const [showEditor, setShowEditor] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const { sandpack } = useSandpack();
  const { files, activeFile } = sandpack;

  const code = files[activeFile].code;

  const getCode = () => {
    router.push(
      "?" + createQueryString("search", compressToEncodedURIComponent(code))
    );
  };

  return (
    <div>
      <Button
        className="absolute bottom-2 right-2 font-bold text-xs z-10 "
        variant={"ghost"}
        size={"sm"}
        onClick={() => setShowEditor(!showEditor)}
      >
        <EyeIcon size={12} />
      </Button>
      <Button
        className="absolute bottom-2 right-12 font-bold text-xs z-10 "
        variant={"ghost"}
        size={"sm"}
        onClick={() => getCode()}
      >
        <Share2Icon size={12} />
      </Button>
      <div className="md:flex">
        {showEditor ? (
          <div>
            <SandpackCodeEditor showRunButton={true} />
            <SandpackConsole />
          </div>
        ) : null}
        <SandpackPreview
          showOpenInCodeSandbox={false}
          showRefreshButton={false}
          style={{ height: "100vh", width: "100%" }}
        />
      </div>
    </div>
  );
}
