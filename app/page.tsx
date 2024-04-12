"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import { PickaxeIcon } from "lucide-react";
import { compressToEncodedURIComponent } from "lz-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function MyComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: (messages) => handleMessage(messages),
  });
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleMessage = (messages) => {
    const search = createQueryString(
      "search",
      compressToEncodedURIComponent(messages.content)
    );
    router.push(`/editor/?${search}`);
  };

  return (
    <div className="h-screen w-full flex">
      <form onSubmit={handleSubmit} className="m-auto flex gap-4">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Erstelle eine fancy todo app"
        />
        <Button type="submit">
          <PickaxeIcon size={24} />
        </Button>
      </form>
    </div>
  );
}
