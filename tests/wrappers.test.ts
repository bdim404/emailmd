import { describe, it, expect, vi } from 'vitest';
import { render, segmentsToMjml, buildHead, defaultTheme } from '../src/index.js';
import type { WrapperFn, WrapperMeta, Segment } from '../src/index.js';

describe('default wrapper', () => {
  it('produces outer gray background and white content area', () => {
    const { html } = render('# Hello\n\nWorld.');
    expect(html).toContain(defaultTheme.backgroundColor);
    expect(html).toContain(defaultTheme.contentColor);
  });

  it('includes preheader when provided', () => {
    const md = '---\npreheader: Preview text here\n---\n\n# Hello';
    const { html } = render(md);
    expect(html).toContain('Preview text here');
  });

  it('omits preheader when not provided', () => {
    const { html } = render('# Hello');
    expect(html).not.toContain('Preview text here');
  });

  it('renders logo when provided in frontmatter', () => {
    const md = '---\nlogo: https://example.com/logo.png\n---\n\n# Hello';
    const { html } = render(md);
    expect(html).toContain('https://example.com/logo.png');
  });

  it('omits logo section when not provided', () => {
    const { html } = render('# Hello');
    expect(html).not.toContain('logo.png');
  });

  it('renders footer with markdown bold', () => {
    const md = '# Hello\n\n::: footer\n**Acme Corp**\n:::';
    const { html } = render(md);
    expect(html).toContain('<strong>Acme Corp</strong>');
  });

  it('renders footer with markdown links', () => {
    const md = '# Hello\n\n::: footer\n[Unsubscribe](https://example.com/unsub)\n:::';
    const { html } = render(md);
    expect(html).toContain('https://example.com/unsub');
    expect(html).toContain('Unsubscribe');
  });

  it('omits footer section when not provided', () => {
    const { html } = render('# Hello');
    expect(html).not.toContain('#9ca3af');
  });
});

describe('plain wrapper', () => {
  it('uses white background', () => {
    const { html } = render('# Hello', { wrapper: 'plain' });
    expect(html).toContain('<!doctype html>');
    // Plain wrapper should NOT have the gray background
    expect(html).not.toContain(defaultTheme.backgroundColor);
  });

  it('includes preheader when provided', () => {
    const md = '---\npreheader: Preview text\n---\n\n# Hello';
    const { html } = render(md, { wrapper: 'plain' });
    expect(html).toContain('Preview text');
  });

  it('ignores logo frontmatter', () => {
    const md = '---\nlogo: https://example.com/logo.png\n---\n\n# Hello';
    const { html } = render(md, { wrapper: 'plain' });
    expect(html).not.toContain('example.com/logo.png');
  });

  it('preserves content rendering', () => {
    const { html } = render('# Hello\n\nParagraph text.', { wrapper: 'plain' });
    expect(html).toContain('Hello');
    expect(html).toContain('Paragraph text.');
  });
});

describe('naked wrapper', () => {
  it('produces valid HTML with minimal structure', () => {
    const { html } = render('# Hello', { wrapper: 'naked' });
    expect(html).toContain('<!doctype html>');
    expect(html).toContain('Hello');
  });

  it('has no background color on body', () => {
    const { html } = render('# Hello', { wrapper: 'naked' });
    // The naked wrapper should not set backgroundColor on mj-body
    expect(html).not.toContain(defaultTheme.backgroundColor);
  });

  it('includes preheader when provided', () => {
    const md = '---\npreheader: Preview text\n---\n\n# Hello';
    const { html } = render(md, { wrapper: 'naked' });
    expect(html).toContain('Preview text');
  });
});

describe('custom wrapper', () => {
  it('calls custom wrapper function with correct arguments', () => {
    const customWrapper: WrapperFn = vi.fn((segments, theme, meta) => {
      const head = buildHead(theme, meta?.preheader);
      const body = segmentsToMjml(segments, theme);
      return `<mjml>${head}<mj-body>${body}</mj-body></mjml>`;
    });

    const md = '---\npreheader: Custom preview\n---\n\n# Hello';
    const { html } = render(md, { wrapper: customWrapper });

    expect(customWrapper).toHaveBeenCalledOnce();
    const [segments, theme, meta] = (customWrapper as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(segments).toBeInstanceOf(Array);
    expect(segments.length).toBeGreaterThan(0);
    expect(theme).toHaveProperty('brandColor');
    expect(meta).toHaveProperty('preheader', 'Custom preview');
    expect(html).toContain('Hello');
  });

  it('segmentsToMjml produces valid MJML content for custom wrappers', () => {
    const customWrapper: WrapperFn = (segments, theme) => {
      const head = buildHead(theme);
      const body = segmentsToMjml(segments, theme);
      return `<mjml>${head}<mj-body><mj-section><mj-column><mj-text>HEADER</mj-text></mj-column></mj-section>${body}</mj-body></mjml>`;
    };

    const { html } = render('# Content', { wrapper: customWrapper });
    expect(html).toContain('HEADER');
    expect(html).toContain('Content');
    expect(html).not.toMatch(/<mj-/);
  });
});

describe('segmentsToMjml', () => {
  it('renders text segments', () => {
    const segments: Segment[] = [{ type: 'text', content: '<p>Hello</p>' }];
    const mjml = segmentsToMjml(segments, defaultTheme);
    expect(mjml).toContain('mj-section');
    expect(mjml).toContain('mj-text');
    expect(mjml).toContain('Hello');
  });

  it('renders multiple segment types', () => {
    const segments: Segment[] = [
      { type: 'text', content: '<p>Text</p>' },
      { type: 'callout', content: '<p>Callout</p>' },
      { type: 'highlight', content: '<p>Highlight</p>' },
    ];
    const mjml = segmentsToMjml(segments, defaultTheme);
    expect(mjml).toContain('Text');
    expect(mjml).toContain('Callout');
    expect(mjml).toContain('Highlight');
  });
});

describe('wrapper switching', () => {
  const md = '# Same Content\n\nSame paragraph.';

  it('default and plain produce different backgrounds but same content', () => {
    const { html: defaultHtml } = render(md);
    const { html: plainHtml } = render(md, { wrapper: 'plain' });

    // Both contain the content
    expect(defaultHtml).toContain('Same Content');
    expect(plainHtml).toContain('Same Content');
    expect(defaultHtml).toContain('Same paragraph.');
    expect(plainHtml).toContain('Same paragraph.');

    // Different backgrounds
    expect(defaultHtml).toContain(defaultTheme.backgroundColor);
    expect(plainHtml).not.toContain(defaultTheme.backgroundColor);
  });
});
