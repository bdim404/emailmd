import type { Theme } from '../theme.js';
import type { Segment } from '../segmenter.js';
import type { WrapperMeta } from '../mjml.js';
import { buildHead, segmentsToMjml } from '../mjml.js';

export function defaultWrapper(segments: Segment[], theme: Theme, meta?: WrapperMeta): string {
  const head = buildHead(theme, meta?.preheader);
  const body = segmentsToMjml(segments, theme);

  const logoSection = meta?.logo
    ? `<mj-section padding="20px 32px 0 32px" background-color="${theme.contentColor}">
      <mj-column>
        <mj-image src="${meta.logo}" alt="Logo" width="150px" />
      </mj-column>
    </mj-section>`
    : '';

  return `<mjml>
  ${head}
  <mj-body background-color="${theme.backgroundColor}" width="${theme.contentWidth}">
    ${logoSection}
    ${body}
  </mj-body>
</mjml>`;
}
