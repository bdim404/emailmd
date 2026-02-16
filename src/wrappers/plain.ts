import type { Theme } from '../theme.js';
import type { Segment } from '../segmenter.js';
import type { WrapperMeta } from '../mjml.js';
import { buildHead, segmentsToMjml } from '../mjml.js';

export function plainWrapper(segments: Segment[], theme: Theme, meta?: WrapperMeta): string {
  const head = buildHead(theme, meta?.preheader);
  const body = segmentsToMjml(segments, theme);

  return `<mjml>
  ${head}
  <mj-body background-color="#ffffff" width="${theme.contentWidth}">
    ${body}
  </mj-body>
</mjml>`;
}
