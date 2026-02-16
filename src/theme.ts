export interface Theme {
  brandColor: string;
  headingColor: string;
  bodyColor: string;
  backgroundColor: string;
  cardColor: string;
  buttonColor: string;
  buttonTextColor: string;
  fontFamily: string;
}

export const defaultTheme: Theme = {
  brandColor: '#4A90D9',
  headingColor: '#1A1A2E',
  bodyColor: '#333333',
  backgroundColor: '#F4F4F7',
  cardColor: '#FFFFFF',
  buttonColor: '#4A90D9',
  buttonTextColor: '#FFFFFF',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

export function mergeTheme(overrides?: Partial<Theme>): Theme {
  if (!overrides) return { ...defaultTheme };
  return { ...defaultTheme, ...overrides };
}
