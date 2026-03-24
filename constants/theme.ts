/**
 * Regional Indian Food Tracker Theme
 * Colors: Deep forest green + warm saffron, inspired by Indian spice markets
 * Fonts: Fraunces for numbers/headings, DM Sans for body text
 */

import { Platform } from 'react-native';

// Brand colors inspired by Indian spice markets
const forestGreen = '#1B4332';
const forestGreenLight = '#2D6A4F';
const saffron = '#F4A261';
const saffronLight = '#F7B97E';
const warmCream = '#FFF9F0';
const deepBrown = '#5C3A21';

export const Colors = {
  light: {
    text: deepBrown,
    textSecondary: '#7A5838',
    background: warmCream,
    surface: '#FFFFFF',
    tint: forestGreen,
    tintSecondary: saffron,
    icon: '#7A5838',
    tabIconDefault: '#9B8574',
    tabIconSelected: forestGreen,
    border: '#E5DDD0',
    success: '#40916C',
    warning: saffron,
    error: '#D64545',
    cardBackground: '#FFFFFF',
    progressBackground: '#E5DDD0',
    progressFill: saffron,
    regionTag: forestGreenLight,
    calorieRing: saffron,
  },
  dark: {
    text: warmCream,
    textSecondary: '#C4B5A0',
    background: '#0F1810',
    surface: '#1B2820',
    tint: '#52B788',
    tintSecondary: saffronLight,
    icon: '#C4B5A0',
    tabIconDefault: '#8A7E6F',
    tabIconSelected: '#52B788',
    border: '#3A4A3F',
    success: '#52B788',
    warning: saffronLight,
    error: '#FF6B6B',
    cardBackground: '#1B2820',
    progressBackground: '#3A4A3F',
    progressFill: saffronLight,
    regionTag: '#40916C',
    calorieRing: saffronLight,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
