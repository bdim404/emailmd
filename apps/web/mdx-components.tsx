import type { MDXComponents } from 'mdx/types';
import defaultMDXComponents from 'fumadocs-ui/mdx';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMDXComponents,
    ...components,
  };
}
