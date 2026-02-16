import mjml2html from 'mjml';
import type { Theme } from './theme.js';
import type { Segment } from './segmenter.js';

function buildHead(theme: Theme, preheader?: string): string {
  return `<mj-head>
    <mj-attributes>
      <mj-all font-family="${theme.fontFamily}" />
      <mj-text font-size="${theme.fontSize}" line-height="${theme.lineHeight}" color="${theme.bodyColor}" />
    </mj-attributes>
    <mj-style>
      h1 { font-size: 32px; font-weight: 700; color: ${theme.headingColor}; margin: 0 0 12px 0; }
      h2 { font-size: 24px; font-weight: 700; color: ${theme.headingColor}; margin: 0 0 10px 0; }
      h3 { font-size: 20px; font-weight: 600; color: ${theme.headingColor}; margin: 0 0 8px 0; }
      a { color: ${theme.brandColor}; }
      blockquote { border-left: 3px solid ${theme.brandColor}; padding-left: 16px; margin: 0; color: #6b7280; }
    </mj-style>
    ${preheader ? `<mj-preview>${preheader}</mj-preview>` : ''}
  </mj-head>`;
}

function renderTextSegment(content: string, theme: Theme): string {
  return `<mj-section background-color="${theme.contentColor}" padding="0 32px">
      <mj-column>
        <mj-text>${content}</mj-text>
      </mj-column>
    </mj-section>`;
}

function renderCalloutSegment(content: string, theme: Theme): string {
  return `<mj-section padding="8px 32px">
      <mj-column background-color="${theme.cardColor}" border-radius="8px" padding="20px 24px">
        <mj-text font-size="${theme.fontSize}" color="${theme.bodyColor}" line-height="${theme.lineHeight}">${content}</mj-text>
      </mj-column>
    </mj-section>`;
}

function renderCenteredSegment(content: string, theme: Theme): string {
  return `<mj-section padding="8px 32px">
      <mj-column>
        <mj-text align="center" font-size="${theme.fontSize}" color="${theme.bodyColor}">${content}</mj-text>
      </mj-column>
    </mj-section>`;
}

function renderHighlightSegment(content: string, theme: Theme): string {
  return `<mj-section padding="8px 32px">
      <mj-column background-color="${theme.brandColor}" border-radius="8px" padding="20px 24px">
        <mj-text font-size="${theme.fontSize}" color="#ffffff" font-weight="600">${content}</mj-text>
      </mj-column>
    </mj-section>`;
}

function renderButtonSegment(segment: Segment, theme: Theme): string {
  const attrs = segment.attrs!;
  const isSecondary = attrs.variant === 'secondary';
  const customColor = attrs.color;

  let bgColor: string;
  let textColor: string;
  let border = '';

  if (customColor) {
    bgColor = customColor;
    textColor = '#ffffff';
  } else if (isSecondary) {
    bgColor = 'transparent';
    textColor = theme.buttonColor;
    border = `border="2px solid ${theme.buttonColor}"`;
  } else {
    bgColor = theme.buttonColor;
    textColor = theme.buttonTextColor;
  }

  return `<mj-section padding="8px 32px">
      <mj-column>
        <mj-button background-color="${bgColor}" color="${textColor}" font-size="16px" font-weight="600" border-radius="8px" inner-padding="14px 32px" ${border} href="${attrs.href}">${attrs.text}</mj-button>
      </mj-column>
    </mj-section>`;
}

function segmentToMjml(segment: Segment, theme: Theme): string {
  switch (segment.type) {
    case 'text':
      return renderTextSegment(segment.content, theme);
    case 'callout':
      return renderCalloutSegment(segment.content, theme);
    case 'centered':
      return renderCenteredSegment(segment.content, theme);
    case 'highlight':
      return renderHighlightSegment(segment.content, theme);
    case 'button':
      return renderButtonSegment(segment, theme);
  }
}

function buildMjmlDocument(segments: Segment[], theme: Theme, preheader?: string): string {
  const head = buildHead(theme, preheader);
  const body = segments.map((s) => segmentToMjml(s, theme)).join('\n    ');
  return `<mjml>
  ${head}
  <mj-body background-color="${theme.backgroundColor}" width="${theme.contentWidth}">
    ${body}
  </mj-body>
</mjml>`;
}

export function renderMjml(segments: Segment[], theme: Theme, preheader?: string): string {
  const mjmlDoc = buildMjmlDocument(segments, theme, preheader);
  const { html, errors } = mjml2html(mjmlDoc);
  if (errors.length > 0) {
    console.warn('MJML compilation warnings:', errors);
  }
  return html;
}
