export type { Theme } from './theme.js';
export type { WrapperFn, WrapperMeta } from './mjml.js';
export type { Segment, SegmentType } from './segmenter.js';
export { defaultTheme, mergeTheme } from './theme.js';
export { extractFrontmatter, frontmatterToThemeOverrides } from './frontmatter.js';
export { buildHead, segmentsToMjml } from './mjml.js';
export { defaultWrapper } from './wrappers/default.js';
export { plainWrapper } from './wrappers/plain.js';
export { nakedWrapper } from './wrappers/naked.js';

import { mergeTheme, type Theme } from './theme.js';
import { extractFrontmatter, frontmatterToThemeOverrides } from './frontmatter.js';
import { parseMarkdown } from './parser.js';
import { segment } from './segmenter.js';
import { renderMjml, type WrapperFn, type WrapperMeta } from './mjml.js';
import { resolveWrapper } from './wrappers/index.js';
import { toPlainText } from './plaintext.js';

/** Options for the {@link render} function. */
export interface RenderOptions {
  /** Theme overrides. Merged with defaults; frontmatter values take precedence. */
  theme?: Partial<Theme>;
  /** Wrapper template. Built-in names or a custom {@link WrapperFn}. */
  wrapper?: 'default' | 'plain' | 'naked' | WrapperFn;
}

/** Object returned by {@link render}. */
export interface RenderResult {
  /** Complete email-safe HTML document. */
  html: string;
  /** Plain text version for the text/plain MIME part. */
  text: string;
  /** Extracted frontmatter metadata (preheader, logo, footer, and any custom keys). */
  meta: {
    preheader?: string;
    logo?: string;
    footer?: string;
    [key: string]: unknown;
  };
}

/**
 * Render markdown (with optional YAML frontmatter) into email-safe HTML.
 *
 * @param markdown - Markdown string, optionally with YAML frontmatter.
 * @param options  - Theme and wrapper overrides.
 * @returns An object with `html`, `text`, and `meta` properties.
 *
 * @example
 * ```ts
 * const { html, text, meta } = render(`
 * ---
 * preheader: Welcome!
 * ---
 * # Hello
 * Thanks for signing up.
 * `);
 * ```
 */
export function render(markdown: string, options?: RenderOptions): RenderResult {
  const { meta, content } = extractFrontmatter(markdown);
  const frontmatterOverrides = frontmatterToThemeOverrides(meta);
  const theme = mergeTheme({ ...options?.theme, ...frontmatterOverrides });
  const parsedHtml = parseMarkdown(content);
  const segments = segment(parsedHtml);

  const wrapperFn = resolveWrapper(options?.wrapper);

  const footerHtml = meta.footer
    ? parseMarkdown(String(meta.footer)).trim().replace(/^<p>(.*)<\/p>$/s, '$1')
    : undefined;

  const wrapperMeta: WrapperMeta = {
    preheader: meta.preheader as string | undefined,
    logo: meta.logo as string | undefined,
    footer: footerHtml,
  };

  const html = renderMjml(segments, theme, wrapperMeta, wrapperFn);
  const text = toPlainText(parsedHtml);

  // Build public meta: include all frontmatter keys, override footer with parsed version
  const publicMeta: RenderResult['meta'] = { ...meta };
  if (footerHtml !== undefined) publicMeta.footer = footerHtml;

  return { html, text, meta: publicMeta };
}
