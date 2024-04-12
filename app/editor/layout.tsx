import { Sandpack } from "@/components/sandpack-provider";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <Sandpack>{children}</Sandpack>
    </Suspense>
  );
}
