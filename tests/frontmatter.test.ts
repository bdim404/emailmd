import { describe, it, expect } from 'vitest';
import { extractFrontmatter, frontmatterToThemeOverrides } from '../src/index.js';

describe('extractFrontmatter', () => {
  it('extracts frontmatter and content', () => {
    const input = `---
preheader: Hello
---

# Title`;
    const { meta, content } = extractFrontmatter(input);
    expect(meta.preheader).toBe('Hello');
    expect(content.trim()).toBe('# Title');
  });

  it('returns empty meta for markdown without frontmatter', () => {
    const { meta, content } = extractFrontmatter('# Just markdown');
    expect(meta).toEqual({});
    expect(content.trim()).toBe('# Just markdown');
  });
});

describe('frontmatterToThemeOverrides', () => {
  it('converts snake_case keys to camelCase theme overrides', () => {
    const meta = { button_color: '#FF0000', preheader: 'test' };
    const overrides = frontmatterToThemeOverrides(meta);
    expect(overrides).toEqual({ buttonColor: '#FF0000' });
  });

  it('converts multiple theme keys', () => {
    const meta = {
      background_color: '#000',
      button_text_color: '#FFF',
      font_family: 'Georgia',
    };
    const overrides = frontmatterToThemeOverrides(meta);
    expect(overrides).toEqual({
      backgroundColor: '#000',
      buttonTextColor: '#FFF',
      fontFamily: 'Georgia',
    });
  });

  it('maps button_color to buttonColor theme override', () => {
    const meta = { button_color: '#dc2626' };
    const overrides = frontmatterToThemeOverrides(meta);
    expect(overrides.buttonColor).toBe('#dc2626');
  });

  it('ignores unknown keys', () => {
    const meta = { preheader: 'text', unknown_key: 'value' };
    const overrides = frontmatterToThemeOverrides(meta);
    expect(overrides).toEqual({});
  });
});
