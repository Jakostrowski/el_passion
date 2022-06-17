import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {State} from '../../types';
import {ArrowLeftDisabled, ArrowLeftEnabled} from '../assets/ArrowLeft';
import {ArrowRightDisabled, ArrowRightEnabled} from '../assets/ArrowRight';
import {Text} from './Text';

interface Props {
  state: State;
  onPress: (e: number) => Promise<void>;
}

export const PaginationButtons: React.FC<Props> = ({state, onPress}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const dynamicStyles = useDynamicStyles();

  const handler = async (page: number) => {
    setLoading(true);
    await onPress(page);
    setLoading(false);
  };

  return (
    <View style={dynamicStyles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        disabled={state.page === 1 || loading}
        onPress={() => handler(state.page - 1)}>
        <SvgXml xml={state.page === 1 ? ArrowLeftDisabled : ArrowLeftEnabled} />
        <Text
          color={state.page === 1 ? 'gray' : 'blue'}
          typography="semibold14"
          style={styles.iconMargin}>
          Previous
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonMargin]}
        disabled={state.page === state.maxPages || loading}
        onPress={() => handler(state.page + 1)}>
        <Text
          color={state.page !== state.maxPages ? 'blue' : 'gray'}
          typography="semibold14">
          Next
        </Text>
        <SvgXml
          xml={
            state.page !== state.maxPages
              ? ArrowRightEnabled
              : ArrowRightDisabled
          }
          style={styles.iconMargin}
        />
      </TouchableOpacity>
    </View>
  );
};
const useDynamicStyles = () => {
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    buttonContainer: {
      marginTop: 34,
      marginBottom: insets.bottom + 20,
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
    },
  });
};
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingTop: 9,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 7,
  },
  buttonMargin: {marginLeft: 48},
  iconMargin: {marginLeft: 3},
});
