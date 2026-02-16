import {
  MARKER_CALLOUT_OPEN,
  MARKER_CALLOUT_CLOSE,
  MARKER_CENTERED_OPEN,
  MARKER_CENTERED_CLOSE,
  MARKER_HIGHLIGHT_OPEN,
  MARKER_HIGHLIGHT_CLOSE,
  MARKER_FOOTER_OPEN,
  MARKER_FOOTER_CLOSE,
} from './constants.js';

export type SegmentType = 'text' | 'callout' | 'centered' | 'highlight' | 'footer' | 'button' | 'hr';

export interface Segment {
  type: SegmentType;
  content: string;
  attrs?: Record<string, string>;
}

const DIRECTIVE_PAIRS: Array<{ open: string; close: string; type: SegmentType }> = [
  { open: MARKER_CALLOUT_OPEN, close: MARKER_CALLOUT_CLOSE, type: 'callout' },
  { open: MARKER_CENTERED_OPEN, close: MARKER_CENTERED_CLOSE, type: 'centered' },
  { open: MARKER_HIGHLIGHT_OPEN, close: MARKER_HIGHLIGHT_CLOSE, type: 'highlight' },
  { open: MARKER_FOOTER_OPEN, close: MARKER_FOOTER_CLOSE, type: 'footer' },
];

// Matches <p><a ...>text</a></p> where the <a> has a button or button.secondary attribute
// markdown-it-attrs produces: button="" for {button}, button.secondary="" for {button.secondary}
const BUTTON_LINK_RE = /<p>\s*<a\s+([^>]*)>([^<]*)<\/a>\s*<\/p>/g;

function parseButtonAttrs(attrString: string): { isButton: boolean; href: string; variant?: string; color?: string } {
  const result = { isButton: false, href: '', variant: undefined as string | undefined, color: undefined as string | undefined };

  // Check for button attribute (button="" or button.secondary="")
  if (/\bbutton\.secondary\b/.test(attrString)) {
    result.isButton = true;
    result.variant = 'secondary';
  } else if (/\bbutton\b/.test(attrString)) {
    result.isButton = true;
  }

  if (!result.isButton) return result;

  // Extract href
  const hrefMatch = attrString.match(/href="([^"]*)"/);
  if (hrefMatch) result.href = hrefMatch[1];

  // Extract color attribute (from {button color="#dc2626"})
  const colorMatch = attrString.match(/\bcolor="([^"]*)"/);
  if (colorMatch) result.color = colorMatch[1];

  return result;
}

function extractButtons(html: string): { html: string; buttons: Segment[] } {
  const buttons: Segment[] = [];
  const result = html.replace(BUTTON_LINK_RE, (match, attrString, text) => {
    const parsed = parseButtonAttrs(attrString);
    if (!parsed.isButton) return match; // Not a button, leave as-is

    const attrs: Record<string, string> = { href: parsed.href, text };
    if (parsed.variant) attrs.variant = parsed.variant;
    if (parsed.color) attrs.color = parsed.color;

    const placeholder = `<!--EMAILMD:BUTTON_${buttons.length}-->`;
    buttons.push({ type: 'button', content: text, attrs });
    return placeholder;
  });
  return { html: result, buttons };
}

function splitOnDirectives(html: string): Segment[] {
  const segments: Segment[] = [];
  let remaining = html;

  while (remaining.length > 0) {
    let earliest: { pos: number; type: SegmentType; open: string; close: string } | null = null;
    for (const pair of DIRECTIVE_PAIRS) {
      const pos = remaining.indexOf(pair.open);
      if (pos !== -1 && (earliest === null || pos < earliest.pos)) {
        earliest = { pos, ...pair };
      }
    }

    if (!earliest) {
      if (remaining.trim()) {
        segments.push({ type: 'text', content: remaining });
      }
      break;
    }

    const before = remaining.slice(0, earliest.pos);
    if (before.trim()) {
      segments.push({ type: 'text', content: before });
    }

    const afterOpen = remaining.slice(earliest.pos + earliest.open.length);
    const closePos = afterOpen.indexOf(earliest.close);
    if (closePos === -1) {
      segments.push({ type: 'text', content: remaining.slice(earliest.pos) });
      break;
    }

    const innerContent = afterOpen.slice(0, closePos);
    segments.push({ type: earliest.type, content: innerContent });

    remaining = afterOpen.slice(closePos + earliest.close.length);
  }

  return segments;
}

function splitOnButtonPlaceholders(segments: Segment[], buttons: Segment[]): Segment[] {
  const result: Segment[] = [];
  const placeholderRe = /<!--EMAILMD:BUTTON_(\d+)-->/;

  for (const seg of segments) {
    if (seg.type !== 'text') {
      result.push(seg);
      continue;
    }

    let text = seg.content;
    let match: RegExpExecArray | null;
    while ((match = placeholderRe.exec(text)) !== null) {
      const before = text.slice(0, match.index);
      if (before.trim()) {
        result.push({ type: 'text', content: before });
      }
      const btn = buttons[parseInt(match[1], 10)];
      if (btn) result.push(btn);
      text = text.slice(match.index + match[0].length);
    }
    if (text.trim()) {
      result.push({ type: 'text', content: text });
    }
  }

  return result;
}

const HR_RE = /<hr\s*\/?>/i;

function splitOnHr(segments: Segment[]): Segment[] {
  const result: Segment[] = [];
  for (const seg of segments) {
    if (seg.type !== 'text') {
      result.push(seg);
      continue;
    }
    let text = seg.content;
    let match: RegExpExecArray | null;
    while ((match = HR_RE.exec(text)) !== null) {
      const before = text.slice(0, match.index);
      if (before.trim()) {
        result.push({ type: 'text', content: before });
      }
      result.push({ type: 'hr', content: '' });
      text = text.slice(match.index + match[0].length);
    }
    if (text.trim()) {
      result.push({ type: 'text', content: text });
    }
  }
  return result;
}

export function segment(html: string): Segment[] {
  const { html: htmlWithPlaceholders, buttons } = extractButtons(html);
  const segments = splitOnDirectives(htmlWithPlaceholders);
  const withButtons = splitOnButtonPlaceholders(segments, buttons);
  return splitOnHr(withButtons);
}
