import { describe, it, expect } from 'vitest';
import { render } from '../src/index.js';

describe('callout directive', () => {
  it('renders callout with cardColor background', () => {
    const { html } = render('::: callout\nHello from callout\n:::');
    expect(html).toContain('Hello from callout');
    expect(html).toContain('#f3f4f6'); // default cardColor
  });

  it('renders markdown inside callout', () => {
    const { html } = render('::: callout\n**Bold** and [a link](https://example.com)\n:::');
    expect(html).toContain('<strong>Bold</strong>');
    expect(html).toContain('href="https://example.com"');
  });
});

describe('highlight directive', () => {
  it('renders highlight with brandColor background and white text', () => {
    const { html } = render('::: highlight\nLimited time offer\n:::');
    expect(html).toContain('Limited time offer');
    expect(html).toContain('#5B4FE9'); // default brandColor
    // The highlight section should produce white text
    expect(html).toContain('#ffffff');
  });
});

describe('centered directive', () => {
  it('renders centered text with center alignment', () => {
    const { html } = render('::: centered\nCentered content\n:::');
    expect(html).toContain('Centered content');
    expect(html).toContain('text-align:center');
  });
});

describe('multiple directives', () => {
  it('renders multiple directives in sequence', () => {
    const md = `::: callout
First block
:::

::: highlight
Second block
:::

::: centered
Third block
:::`;
    const { html } = render(md);
    expect(html).toContain('First block');
    expect(html).toContain('Second block');
    expect(html).toContain('Third block');
  });

  it('renders regular text between directives', () => {
    const md = `# Heading

Some paragraph text.

::: callout
A callout
:::

More text after.`;
    const { html } = render(md);
    expect(html).toContain('<h1>Heading</h1>');
    expect(html).toContain('Some paragraph text.');
    expect(html).toContain('A callout');
    expect(html).toContain('More text after.');
  });
});
