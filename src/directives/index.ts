import type MarkdownIt from 'markdown-it';
import { registerCallout } from './callout.js';
import { registerCentered } from './centered.js';
import { registerHighlight } from './highlight.js';
import { registerFooter } from './footer.js';

export function registerDirectives(md: MarkdownIt): void {
  registerCallout(md);
  registerCentered(md);
  registerHighlight(md);
  registerFooter(md);
}
