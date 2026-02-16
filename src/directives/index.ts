import type MarkdownIt from 'markdown-it';
import { registerCallout } from './callout.js';
import { registerCentered } from './centered.js';
import { registerHighlight } from './highlight.js';

export function registerDirectives(md: MarkdownIt): void {
  registerCallout(md);
  registerCentered(md);
  registerHighlight(md);
}
