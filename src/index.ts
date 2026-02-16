export type { Theme } from './theme.js';
export { defaultTheme, mergeTheme } from './theme.js';
export { extractFrontmatter, frontmatterToThemeOverrides } from './frontmatter.js';

import { mergeTheme, type Theme } from './theme.js';
import { extractFrontmatter, frontmatterToThemeOverrides } from './frontmatter.js';
import { parseMarkdown } from './parser.js';

export interface RenderOptions {
  theme?: Partial<Theme>;
}

export function render(markdown: string, options?: RenderOptions): string {
  const { meta, content } = extractFrontmatter(markdown);
  const frontmatterOverrides = frontmatterToThemeOverrides(meta);
  const _theme = mergeTheme({ ...options?.theme, ...frontmatterOverrides });
  return parseMarkdown(content);
}
