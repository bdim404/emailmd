"use client";

import { useState, useEffect, useRef } from "react";
import { render } from "emailmd";
import { EditorPane } from "./editor-pane";
import { OutputPane } from "./output-pane";

const DEFAULT_MARKDOWN = `---
preheader: "Thanks for signing up."
---

::: header
![Logo](https://imgs.emailmd.dev/logoipsum-336.png){width="200"}
:::

# Welcome!

Thanks for signing up. We're excited to have you on board.

[Get Started](https://example.com){button}

::: callout
**Quick tip:** Email.md turns this markdown into responsive, email-safe HTML that works in every client.
:::

Need help? Reply to this email or visit our [docs](https://example.com/docs).

::: footer
Acme Inc. | 123 Main St | [Unsubscribe](https://example.com/unsub)
:::
`;

export function BuilderShell({
  initialMarkdown,
}: {
  initialMarkdown?: string;
}) {
  const [markdown, setMarkdown] = useState(initialMarkdown ?? DEFAULT_MARKDOWN);
  const [html, setHtml] = useState("");
  const [text, setText] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      try {
        const result = render(markdown);
        setHtml(result.html);
        setText(result.text);
      } catch {
        // keep previous output on error
      }
    }, 150);
    return () => clearTimeout(debounceRef.current);
  }, [markdown]);

  return (
    <div className="flex flex-1 min-h-0">
      <div className="w-[40%] flex flex-col">
        <EditorPane value={markdown} onChange={setMarkdown} />
      </div>
      <OutputPane html={html} text={text} />
    </div>
  );
}
