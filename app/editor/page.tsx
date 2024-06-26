"use client";
import { Button } from "@/components/ui/button";
import {
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
  SandpackConsole,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { EyeIcon, MoonIcon, Share2Icon, SunIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useRef } from "react";
import { compressToEncodedURIComponent } from "lz-string";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "next-themes";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Editor() {
  const [showEditor, setShowEditor] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = useState(true);

  const { setTheme } = useTheme();
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
    router.push(`/editor/?${search}`);
    navigator.clipboard.writeText(
      `https://glowing-meme-6qggp97pqh5jgj-3000.app.github.dev/editor?${search}`
    );
    toast.info("Preview copied to clipboard!");
  };

  return (
    <div className="h-svh">
      <Button
        className="bg-pink-500 text-pink-50 absolute bottom-2 left-2 font-bold text-xs z-10"
        variant={"ghost"}
        size={"sm"}
        onClick={() => setShowEditor(!showEditor)}
      >
        <EyeIcon size={12} />
      </Button>
      {showEditor ? (
        <>
          <Button
            className="dark:text-white absolute bottom-2 left-12 font-bold text-xs z-10 left"
            variant={"ghost"}
            size={"sm"}
            onClick={() => getCode()}
          >
            <Share2Icon size={12} />
          </Button>
          <Button
            className="dark:text-white absolute bottom-2 left-[5.5rem] font-bold text-xs z-10 dark:hidden left"
            variant={"ghost"}
            size={"sm"}
            onClick={() => setTheme("dark")}
          >
            <SunIcon size={12} />
          </Button>
          <Button
            className="dark:text-white absolute bottom-2 left-[5.5rem] font-bold text-xs z-10 dark:block hidden left"
            variant={"ghost"}
            size={"sm"}
            onClick={() => setTheme("light")}
          >
            <MoonIcon size={12} />
          </Button>
        </>
      ) : null}
      <ResizablePanelGroup direction={isDesktop ? "horizontal" : "vertical"}>
        {showEditor ? (
          <ResizablePanel
            defaultSize={70}
            order={1}
            id={"editor"}
            className="dark:bg-[#151515]"
          >
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={20}>
                <SandpackFileExplorer />
              </ResizablePanel>
              <ResizableHandle />

              <ResizablePanel defaultSize={80}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={70}>
                    <ScrollArea className="h-full">
                      <SandpackCodeEditor showRunButton />
                    </ScrollArea>
                  </ResizablePanel>
                  <ResizableHandle />

                  <ResizablePanel defaultSize={30}>
  
                      <SandpackConsole resetOnPreviewRestart />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
              <ResizableHandle />
            </ResizablePanelGroup>
          </ResizablePanel>
        ) : null}
        <ResizableHandle />

        <ResizablePanel
          defaultSize={showEditor ? 30 : 100}
          order={2}
          id={"preview"}
        >
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton
            showNavigator
            style={{ height: "100vh", width: "100%" }}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
