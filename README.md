# email.md

Markdown to email-safe HTML. Write in markdown, send emails that work everywhere.

```
markdown → emailmd → Gmail, Outlook, Apple Mail, Yahoo, everything
```

## Install

```bash
npm install emailmd
```

## Quick Start

```typescript
import { render } from 'emailmd';

const { html, text } = render(`
# Welcome!

Thanks for signing up.

[Get Started](https://example.com){button}
`);

// html → complete email-safe HTML (works in Gmail, Outlook, Apple Mail, everything)
// text → plain text version for text/plain MIME part
```

## Theme

Customize colors and fonts to match your brand:

```typescript
const { html } = render(markdown, {
  theme: {
    brandColor: '#e11d48',
    buttonColor: '#e11d48',
    fontFamily: 'Georgia, serif',
  }
});
```

All theme options:

| Key | Default | Description |
|-----|---------|-------------|
| `brandColor` | `#5B4FE9` | Links, highlights |
| `headingColor` | `#111827` | Heading text |
| `bodyColor` | `#374151` | Body text |
| `backgroundColor` | `#f4f4f5` | Outer background |
| `contentColor` | `#ffffff` | Content area background |
| `cardColor` | `#f3f4f6` | Callout background |
| `buttonColor` | `#5B4FE9` | Primary button |
| `buttonTextColor` | `#ffffff` | Button text |
| `fontFamily` | Helvetica Neue, ... | Font stack |
| `fontSize` | `16px` | Base font size |
| `lineHeight` | `1.6` | Base line height |
| `contentWidth` | `600px` | Email width |

## Frontmatter

Override theme values and set metadata per-email using YAML frontmatter:

```markdown
---
preheader: "Don't miss our biggest sale"
logo: https://example.com/logo.png
footer: "**Acme Corp** · [Unsubscribe](https://example.com/unsub)"
brand_color: "#e11d48"
button_color: "#059669"
---

# Sale Starts Now

Everything is 50% off this weekend.
```

## Directives

### Callout

```markdown
::: callout
**Pro tip:** You can customize your dashboard in Settings.
:::
```

### Highlight

```markdown
::: highlight
Limited time: first 100 signups get 50% off.
:::
```

### Centered

```markdown
::: centered
Thanks for reading.
The Acme Team
:::
```

## Buttons

```markdown
[Get Started](https://example.com){button}

[Learn More](https://example.com){button.secondary}

[Shop Sale](https://example.com){button color="#dc2626"}
```

## Wrappers

Control the email's outer structure:

```typescript
// Default — gray background, supports logo + footer
render(md);

// Plain — white background, no logo/footer
render(md, { wrapper: 'plain' });

// Naked — minimal, no background
render(md, { wrapper: 'naked' });
```

Custom wrappers:

```typescript
import { render, buildHead, segmentsToMjml } from 'emailmd';
import type { WrapperFn } from 'emailmd';

const myWrapper: WrapperFn = (segments, theme, meta) => {
  const head = buildHead(theme, meta?.preheader);
  const body = segmentsToMjml(segments, theme);
  return `<mjml>${head}<mj-body>${body}</mj-body></mjml>`;
};

render(md, { wrapper: myWrapper });
```

## API Reference

### `render(markdown, options?)`

Renders markdown to email-safe HTML.

**Returns** `{ html, text, meta }`

- `html` — complete HTML email document
- `text` — plain text version for the `text/plain` MIME part
- `meta` — extracted frontmatter metadata

### `RenderOptions`

```typescript
{
  theme?: Partial<Theme>;
  wrapper?: 'default' | 'plain' | 'naked' | WrapperFn;
}
```

### `RenderResult`

```typescript
{
  html: string;
  text: string;
  meta: { preheader?: string; logo?: string; footer?: string; [key: string]: unknown };
}
```

## Built on MJML

email.md uses [MJML](https://mjml.io) under the hood for bulletproof email HTML.
Tested across Gmail, Outlook, Apple Mail, Yahoo Mail, and more.

## License

MIT
