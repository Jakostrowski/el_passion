import React from 'react';
import {StyleSheet, Text as RawText, TextProps, TextStyle} from 'react-native';
import {Colors, TextColor} from '../consts/Colors';
import {TextTypography, Typography} from '../consts/Typography';

interface Props extends TextProps {
  style?: TextStyle;
  color: TextColor;
  typography: TextTypography;
}

export const Text: React.FC<Props> = props => {
  const styles = useDynamicStyles(props.color, props.typography);
  return (
    <RawText {...props} style={[styles.text, props.style]}>
      {props.children}
    </RawText>
  );
};

const checkColor = (color: TextColor) => {
  if (color === 'blue') return Colors.blue;
  if (color === 'dark') return Colors.dark;
  if (color === 'gray') return Colors.gray;
  if (color === 'black') return Colors.black;
};

const checkTypography = (typography: TextTypography) => {
  if (typography === 'h1') return Typography.h1;
  if (typography === 'semibold12') return Typography.semibold12;
  if (typography === 'semibold14') return Typography.semibold14;
  if (typography === 'semibold16') return Typography.semibold16;
  if (typography === 'semibold20') return Typography.semibold20;
  if (typography === 'semibold26') return Typography.semibold26;
};

const useDynamicStyles = (color: TextColor, typography: TextTypography) => {
  return StyleSheet.create({
    text: {
      ...checkTypography(typography),
      fontFamily: 'Roboto',
      fontWeight: '500',
      color: checkColor(color),
    },
  });
};
