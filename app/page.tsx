"use client";
import { Button } from "@/components/ui/button";
import {
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import { EyeIcon, Share2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { compressToEncodedURIComponent } from "lz-string";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { toast } from "sonner";

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
    const search = createQueryString(
      "search",
      compressToEncodedURIComponent(code)
    );
    router.push(`/?${search}`);
    navigator.clipboard.writeText(
      `https://glowing-meme-6qggp97pqh5jgj-3000.app.github.dev/?${search}`
    );
    toast.info("Preview copied to clipboard!");
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
      {showEditor ? (
        <Button
          className="absolute bottom-2 right-12 font-bold text-xs z-10 "
          variant={"ghost"}
          size={"sm"}
          onClick={() => getCode()}
        >
          <Share2Icon size={12} />
        </Button>
      ) : null}
      <ResizablePanelGroup direction="horizontal">
        {showEditor ? (
          <ResizablePanel defaultSize={30}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={75}>
                <SandpackCodeEditor showRunButton />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={25}>
                <ScrollArea className="h-full">
                  <SandpackConsole />
                </ScrollArea>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        ) : null}
        <ResizableHandle />

        <ResizablePanel defaultSize={showEditor ? 70 : 100}>
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            style={{ height: "100vh", width: "100%" }}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
