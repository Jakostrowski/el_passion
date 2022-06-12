import {TextStyle} from 'react-native';

export type TextTypography = 'h1' | 'semibold16' | 'semibold14' | 'semibold12';

export const Typography = {
  h1: {fontSize: 21, lineHeight: 32} as TextStyle,
  semibold16: {fontSize: 16, lineHeight: 24} as TextStyle,
  semibold14: {fontSize: 14, lineHeight: 18} as TextStyle,
  semibold12: {fontSize: 12, lineHeight: 16} as TextStyle,
};
