import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export function parseMarkdown(markdown: string): string {
  return md.render(markdown);
}
