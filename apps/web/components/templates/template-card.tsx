"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Template } from "@/lib/templates";

export function TemplateCard({ template }: { template: Template }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    import("emailmd").then(({ render }) => {
      try {
        const result = render(template.markdown);
        setHtml(result.html);
      } catch {
        // ignore render errors for preview
      }
    });
  }, [template.markdown]);

  return (
    <Link
      href={`/builder?template=${template.id}`}
      className="group rounded-xl border border-border bg-card overflow-hidden transition-colors hover:border-foreground/20"
    >
      <div className="relative h-75 overflow-hidden border-b border-border bg-white">
        {html && (
          <iframe
            srcDoc={html}
            className="pointer-events-none w-150 h-150 origin-top-left scale-50 border-0"
            tabIndex={-1}
            aria-hidden="true"
            sandbox=""
          />
        )}
      </div>
      <div className="px-4 py-3">
        <p className="text-sm font-medium">
          <span className="text-muted-foreground">{template.category}</span>
          {" / "}
          {template.title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{template.author}</p>
      </div>
    </Link>
  );
}
