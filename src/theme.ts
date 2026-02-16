export interface Theme {
  brandColor: string;
  headingColor: string;
  bodyColor: string;
  backgroundColor: string;
  contentColor: string;
  cardColor: string;
  buttonColor: string;
  buttonTextColor: string;
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  contentWidth: string;
}

export const defaultTheme: Theme = {
  brandColor: '#fafafa',
  headingColor: '#fafafa',
  bodyColor: '#a1a1aa',
  backgroundColor: '#09090b',
  contentColor: '#18181b',
  cardColor: '#27272a',
  buttonColor: '#fafafa',
  buttonTextColor: '#18181b',
  fontFamily: "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontSize: '16px',
  lineHeight: '1.6',
  contentWidth: '600px',
};

export function mergeTheme(overrides?: Partial<Theme>): Theme {
  if (!overrides) return { ...defaultTheme };
  return { ...defaultTheme, ...overrides };
}
