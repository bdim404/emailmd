import { describe, it, expect } from 'vitest';
import { defaultTheme, mergeTheme } from '../src/index.js';

describe('theme', () => {
  it('returns defaults when no overrides are provided', () => {
    const theme = mergeTheme();
    expect(theme).toEqual(defaultTheme);
  });

  it('returns a new object, not a reference to defaultTheme', () => {
    const theme = mergeTheme();
    expect(theme).not.toBe(defaultTheme);
  });

  it('merges partial overrides over defaults', () => {
    const theme = mergeTheme({ brandColor: '#FF0000' });
    expect(theme.brandColor).toBe('#FF0000');
    expect(theme.bodyColor).toBe(defaultTheme.bodyColor);
  });

  it('merges multiple overrides', () => {
    const theme = mergeTheme({
      brandColor: '#FF0000',
      buttonColor: '#00FF00',
      fontFamily: 'Georgia, serif',
    });
    expect(theme.brandColor).toBe('#FF0000');
    expect(theme.buttonColor).toBe('#00FF00');
    expect(theme.fontFamily).toBe('Georgia, serif');
    expect(theme.backgroundColor).toBe(defaultTheme.backgroundColor);
  });
});
