import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { render } from '../src/index.js';

const examplesDir = resolve(__dirname, '../examples');
const exampleFiles = readdirSync(examplesDir).filter((f) => f.endsWith('.md'));

describe('example files', () => {
  it('has at least 4 example markdown files', () => {
    expect(exampleFiles.length).toBeGreaterThanOrEqual(4);
  });

  for (const file of exampleFiles) {
    describe(file, () => {
      const md = readFileSync(resolve(examplesDir, file), 'utf-8');
      const wrapper = file === 'minimal.md' ? 'plain' as const : undefined;

      it('renders without errors', () => {
        const result = render(md, wrapper ? { wrapper } : undefined);
        expect(result.html).toContain('<!doctype html>');
        expect(result.html).not.toMatch(/<mj-/);
        expect(result.html).not.toContain('EMAILMD:');
      });

      it('produces non-empty text output', () => {
        const result = render(md, wrapper ? { wrapper } : undefined);
        expect(result.text.length).toBeGreaterThan(0);
        expect(result.text).not.toMatch(/<[^>]+>/);
      });

      it('returns meta object', () => {
        const result = render(md, wrapper ? { wrapper } : undefined);
        expect(typeof result.meta).toBe('object');
      });
    });
  }
});
