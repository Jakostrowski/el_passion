import React from 'react';
import {ViewStyle} from 'react-native';
import {StyleSheet, View} from 'react-native';

interface Props {
  style?: ViewStyle;
}

export const Divider: React.FC<Props> = props => {
  return <View style={[styles.divider, props.style]} />;
};

const styles = StyleSheet.create({
  divider: {width: '100%', height: 1, backgroundColor: '#C4C4C4'},
});
