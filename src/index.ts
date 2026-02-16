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

export interface RenderOptions {
  theme?: Partial<Theme>;
  wrapper?: 'default' | 'plain' | 'naked' | WrapperFn;
}

export function render(markdown: string, options?: RenderOptions): string {
  const { meta, content } = extractFrontmatter(markdown);
  const frontmatterOverrides = frontmatterToThemeOverrides(meta);
  const theme = mergeTheme({ ...options?.theme, ...frontmatterOverrides });
  const html = parseMarkdown(content);
  const segments = segment(html);

  const wrapperFn = resolveWrapper(options?.wrapper);

  const footerHtml = meta.footer
    ? parseMarkdown(String(meta.footer)).trim().replace(/^<p>(.*)<\/p>$/s, '$1')
    : undefined;

  const wrapperMeta: WrapperMeta = {
    preheader: meta.preheader as string | undefined,
    logo: meta.logo as string | undefined,
    footer: footerHtml,
  };

  return renderMjml(segments, theme, wrapperMeta, wrapperFn);
}
