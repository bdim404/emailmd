"use client";

import dynamic from "next/dynamic";

const BuilderShell = dynamic(
  () =>
    import("./builder-shell").then((mod) => mod.BuilderShell),
  { ssr: false }
);

export function BuilderClient({
  initialMarkdown,
}: {
  initialMarkdown?: string;
}) {
  return <BuilderShell initialMarkdown={initialMarkdown} />;
}
