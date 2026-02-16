export type { Theme } from './theme.js';
export { defaultTheme, mergeTheme } from './theme.js';
export { extractFrontmatter, frontmatterToThemeOverrides } from './frontmatter.js';

import { mergeTheme, type Theme } from './theme.js';
import { extractFrontmatter, frontmatterToThemeOverrides } from './frontmatter.js';
import { parseMarkdown } from './parser.js';
import { segment } from './segmenter.js';
import { renderMjml } from './mjml.js';

export interface RenderOptions {
  theme?: Partial<Theme>;
}

export function render(markdown: string, options?: RenderOptions): string {
  const { meta, content } = extractFrontmatter(markdown);
  const frontmatterOverrides = frontmatterToThemeOverrides(meta);
  const theme = mergeTheme({ ...options?.theme, ...frontmatterOverrides });
  const html = parseMarkdown(content);
  const segments = segment(html);
  return renderMjml(segments, theme, meta.preheader as string | undefined);
}
