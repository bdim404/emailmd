import { describe, it, expect } from 'vitest';
import { render } from '../src/index.js';

describe('render', () => {
  it('produces a complete HTML document', () => {
    const { html } = render('# Hello');
    expect(html).toContain('<!doctype html>');
    expect(html).toContain('<html');
    expect(html).toContain('<body');
  });

  it('renders a heading in an h1 tag', () => {
    const { html } = render('# Hello');
    expect(html).toContain('<h1>Hello</h1>');
  });

  it('renders bold text', () => {
    const { html } = render('**bold**');
    expect(html).toMatch(/<strong>bold<\/strong>|<b>bold<\/b>/);
  });

  it('applies theme defaults when no theme is passed', () => {
    const { html } = render('Hello');
    expect(html).toContain('#374151'); // default bodyColor
  });

  it('renders with frontmatter overrides', () => {
    const md = `---
button_color: "#FF0000"
---

# Test`;
    const { html } = render(md);
    expect(html).toContain('<h1>Test</h1>');
    expect(html).not.toContain('button_color');
  });

  it('renders with frontmatter preheader', () => {
    const md = `---
preheader: Don't miss our biggest announcement
---

# Hello`;
    const { html } = render(md);
    expect(html).toContain("Don't miss our biggest announcement");
  });

  it('contains no MJML tags in output', () => {
    const { html } = render('# Hello\n\nA paragraph.');
    expect(html).not.toMatch(/<mj-/);
  });

  it('strips frontmatter from output', () => {
    const md = `---
preheader: Preview text
---

Hello`;
    const { html } = render(md);
    expect(html).not.toContain('preheader:');
    expect(html).toContain('Hello');
  });

  it('returns html, text, and meta', () => {
    const result = render('# Hello\n\nWorld.');
    expect(result).toHaveProperty('html');
    expect(result).toHaveProperty('text');
    expect(result).toHaveProperty('meta');
    expect(typeof result.html).toBe('string');
    expect(typeof result.text).toBe('string');
    expect(typeof result.meta).toBe('object');
  });

  it('returns extracted frontmatter in meta', () => {
    const md = `---
preheader: Preview
logo: https://example.com/logo.png
---

# Hello`;
    const { meta } = render(md);
    expect(meta.preheader).toBe('Preview');
    expect(meta.logo).toBe('https://example.com/logo.png');
  });
});
