import { describe, it, expect } from 'vitest';
import { render } from '../src/index.js';

describe('render', () => {
  it('renders a heading', () => {
    const html = render('# Hello');
    expect(html).toContain('<h1>Hello</h1>');
  });

  it('renders bold text', () => {
    const html = render('**bold**');
    expect(html).toContain('<strong>bold</strong>');
  });

  it('renders paragraphs', () => {
    const html = render('Hello world');
    expect(html).toContain('<p>Hello world</p>');
  });

  it('renders with frontmatter overrides', () => {
    const md = `---
button_color: "#FF0000"
---

# Test`;
    const html = render(md);
    expect(html).toContain('<h1>Test</h1>');
    expect(html).not.toContain('button_color');
  });

  it('strips frontmatter from output', () => {
    const md = `---
preheader: Preview text
---

Hello`;
    const html = render(md);
    expect(html).not.toContain('preheader');
    expect(html).toContain('<p>Hello</p>');
  });
});
