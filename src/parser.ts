import MarkdownIt from 'markdown-it';
import attrs from 'markdown-it-attrs';
import { registerDirectives } from './directives/index.js';

const md = new MarkdownIt({ html: true });
md.use(attrs);
registerDirectives(md);

export function parseMarkdown(markdown: string): string {
  return md.render(markdown);
}
