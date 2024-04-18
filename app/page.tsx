"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message, useChat } from "ai/react";
import { PickaxeIcon } from "lucide-react";
import { compressToEncodedURIComponent } from "lz-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

//load projects from localstorage

const projects = JSON.parse(localStorage.getItem("projects") || "[]");

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

  const handleMessage = (messages: Message) => {
    const search = createQueryString(
      "search",
      compressToEncodedURIComponent(messages.content)
    );
    router.push(`/editor/?${search}`);
  };

  return (
    <div className="">
      <div className="h-svh relative max-w-4xl p-12 mx-auto">
        <h1 className=" text-9xl font-medium bg-gradient-to-r from-blue-700  to-pink-800 inline-block text-transparent bg-clip-text">
          Hello Nils
        </h1>
        <div className="text-neutral-500 text-5xl font-medium">
          Wie kann ich dir heute behilflich sein?
        </div>
        <div className="text-neutral-200 text-sm font-semibold mt-20">
          Projects
        </div>
        <div className="grid grid-cols-4 gap-4 text-neutral-200 mt-4">
          {projects.map((project) => (
            <div
              key={project.name}
              className="bg-neutral-800 aspect-square rounded-xl p-4 hover:bg-neutral-700"
              onClick={() => {
                router.push(`/editor?search=${project.code}`);
              }}
            >
              {project.name}
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className=" m-12 flex gap-4 absolute bottom-0 left-0 right-0 bg-neutral-800 rounded-3xl py-2 px-1"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Erstelle eine fancy todo app"
            className="bg-transparent rounded-none focus:outline-none border-none focus-visible:ring-0"
          />
          <Button type="submit" className="bg-transparent">
            <PickaxeIcon size={24} />
          </Button>
        </form>
      </div>
    </div>
  );
}
