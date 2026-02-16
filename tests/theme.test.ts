import { describe, it, expect } from 'vitest';
import { defaultTheme, lightTheme, darkTheme, mergeTheme } from '../src/index.js';

describe('theme', () => {
  it('defaultTheme equals lightTheme', () => {
    expect(defaultTheme).toEqual(lightTheme);
  });

  it('lightTheme has light background colors', () => {
    expect(lightTheme.backgroundColor).toBe('#fafafa');
    expect(lightTheme.contentColor).toBe('#ffffff');
  });

  it('darkTheme has dark background colors', () => {
    expect(darkTheme.backgroundColor).toBe('#09090b');
    expect(darkTheme.contentColor).toBe('#18181b');
  });

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
