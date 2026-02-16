import type { WrapperFn } from '../mjml.js';
import { defaultWrapper } from './default.js';
import { plainWrapper } from './plain.js';
import { nakedWrapper } from './naked.js';

export { defaultWrapper } from './default.js';
export { plainWrapper } from './plain.js';
export { nakedWrapper } from './naked.js';

const builtInWrappers: Record<string, WrapperFn> = {
  default: defaultWrapper,
  plain: plainWrapper,
  naked: nakedWrapper,
};

export function resolveWrapper(wrapper?: string | WrapperFn): WrapperFn {
  if (wrapper === undefined) return defaultWrapper;
  if (typeof wrapper === 'function') return wrapper;
  const fn = builtInWrappers[wrapper];
  if (!fn) throw new Error(`Unknown wrapper: "${wrapper}". Available: ${Object.keys(builtInWrappers).join(', ')}`);
  return fn;
}
