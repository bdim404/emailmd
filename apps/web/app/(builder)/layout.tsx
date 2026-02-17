import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export default function BuilderLayout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="flex h-[calc(100dvh-3.5rem)] flex-col">
        {children}
      </div>
    </HomeLayout>
  );
}
