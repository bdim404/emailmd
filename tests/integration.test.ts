import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render } from '../src/index.js';

const fixture = readFileSync(resolve(__dirname, 'fixtures/directives.md'), 'utf-8');

describe('integration: full email with directives and buttons', () => {
  const html = render(fixture);

  it('produces a complete HTML document', () => {
    expect(html).toContain('<!doctype html>');
    expect(html).toContain('<html');
    expect(html).toContain('<body');
  });

  it('renders the heading', () => {
    expect(html).toContain('<h1>Our Big Announcement</h1>');
  });

  it('renders regular paragraph text', () => {
    expect(html).toContain('been working on something special');
  });

  it('renders the callout content', () => {
    expect(html).toContain('Early access is now available for existing customers.');
  });

  it('renders the highlight content', () => {
    expect(html).toContain('first 100 signups get 50% off');
  });

  it('renders the centered content', () => {
    expect(html).toContain('Thanks for being part of the journey.');
  });

  it('renders the primary button', () => {
    expect(html).toContain('https://example.com');
    expect(html).toContain('Get Early Access');
  });

  it('renders the secondary button', () => {
    expect(html).toContain('https://example.com/pricing');
    expect(html).toContain('View Pricing');
  });

  it('renders the preheader', () => {
    expect(html).toContain('Big news from our team');
  });

  it('contains no MJML tags in output', () => {
    expect(html).not.toMatch(/<mj-/);
  });

  it('contains no sentinel markers in output', () => {
    expect(html).not.toContain('EMAILMD:');
  });
});
