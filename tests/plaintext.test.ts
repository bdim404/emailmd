import { describe, it, expect } from 'vitest';
import { render } from '../src/index.js';

describe('plain text output', () => {
  it('returns text property on render result', () => {
    const { text } = render('# Hello\n\nWorld.');
    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });

  it('converts headings to uppercase', () => {
    const { text } = render('# Welcome Back');
    expect(text).toContain('WELCOME BACK');
  });

  it('preserves paragraph content', () => {
    const { text } = render('This is a paragraph.');
    expect(text).toContain('This is a paragraph.');
  });

  it('converts links to text (url) format', () => {
    const { text } = render('Visit [our site](https://example.com) for more.');
    expect(text).toContain('our site (https://example.com)');
  });

  it('converts buttons to label: url format', () => {
    const { text } = render('[Get Started](https://example.com/start){button}');
    expect(text).toContain('Get Started: https://example.com/start');
  });

  it('converts secondary buttons to label: url format', () => {
    const { text } = render('[Learn More](https://example.com/more){button.secondary}');
    expect(text).toContain('Learn More: https://example.com/more');
  });

  it('strips directive wrappers but preserves inner text', () => {
    const { text } = render('::: callout\nImportant notice here.\n:::');
    expect(text).toContain('Important notice here.');
    expect(text).not.toContain('callout');
    expect(text).not.toContain('EMAILMD');
  });

  it('preserves highlight directive content', () => {
    const { text } = render('::: highlight\nSpecial offer!\n:::');
    expect(text).toContain('Special offer!');
  });

  it('preserves centered directive content', () => {
    const { text } = render('::: centered\nThank you.\n:::');
    expect(text).toContain('Thank you.');
  });

  it('converts images to [Image: alt] format', () => {
    const { text } = render('![Logo](https://example.com/logo.png)');
    expect(text).toContain('[Image: Logo]');
  });

  it('preserves unordered list formatting', () => {
    const { text } = render('- First item\n- Second item\n- Third item');
    expect(text).toContain('- First item');
    expect(text).toContain('- Second item');
    expect(text).toContain('- Third item');
  });

  it('preserves ordered list formatting', () => {
    const { text } = render('1. Step one\n2. Step two\n3. Step three');
    expect(text).toContain('1. Step one');
    expect(text).toContain('2. Step two');
    expect(text).toContain('3. Step three');
  });

  it('converts blockquotes', () => {
    const { text } = render('> This is a quote');
    expect(text).toContain('> This is a quote');
  });

  it('converts horizontal rules', () => {
    const { text } = render('Above\n\n***\n\nBelow');
    expect(text).toContain('---');
    expect(text).toContain('Above');
    expect(text).toContain('Below');
  });

  it('strips bold/italic markup from text output', () => {
    const { text } = render('**bold** and *italic*');
    expect(text).toContain('bold');
    expect(text).toContain('italic');
    expect(text).not.toContain('<strong>');
    expect(text).not.toContain('<em>');
  });

  it('contains no HTML tags', () => {
    const { text } = render('# Hello\n\n**Bold** text with a [link](https://example.com).\n\n::: callout\nA callout\n:::');
    expect(text).not.toMatch(/<[^>]+>/);
  });
});

describe('render result meta', () => {
  it('returns frontmatter values in meta', () => {
    const md = `---
preheader: Preview text
logo: https://example.com/logo.png
custom_key: custom_value
---

# Hello`;
    const { meta } = render(md);
    expect(meta.preheader).toBe('Preview text');
    expect(meta.logo).toBe('https://example.com/logo.png');
    expect(meta.custom_key).toBe('custom_value');
  });

  it('returns empty meta when no frontmatter', () => {
    const { meta } = render('# Hello');
    expect(meta).toEqual({});
  });

  it('preserves footer directive content in plain text', () => {
    const { text } = render('# Hello\n\n::: footer\n**Acme Corp**\n:::');
    expect(text).toContain('Acme Corp');
    expect(text).not.toContain('EMAILMD');
  });
});
