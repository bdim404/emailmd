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
  brandColor: '#5B4FE9',
  headingColor: '#111827',
  bodyColor: '#374151',
  backgroundColor: '#f4f4f5',
  contentColor: '#ffffff',
  cardColor: '#f3f4f6',
  buttonColor: '#5B4FE9',
  buttonTextColor: '#ffffff',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: '16px',
  lineHeight: '1.6',
  contentWidth: '600px',
};

export function mergeTheme(overrides?: Partial<Theme>): Theme {
  if (!overrides) return { ...defaultTheme };
  return { ...defaultTheme, ...overrides };
}
