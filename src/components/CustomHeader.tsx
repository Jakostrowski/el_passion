import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Colors} from '../consts/Colors';
import {Typography} from '../consts/Typography';
import {debounce} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {Logo} from '../assets/Logo';

interface Props {
  onChange?: (e: string) => void;
  searchString?: string;
}

export const CustomHeader: React.FC<Props> = ({onChange, searchString}) => {
  const {navigate} = useNavigation();
  const dynamicStyles = useDynamicStyles();

  const inputHandler = debounce(e => {
    if (onChange) onChange(e);
    else navigate('ListScreen' as never, {searchString: e} as never);
  }, 500);

  return (
    <View style={[styles.header, dynamicStyles.header]}>
      <SvgXml xml={Logo} />
      <TextInput
        style={styles.textInput}
        placeholder="Search"
        allowFontScaling={false}
        numberOfLines={1}
        defaultValue={searchString ?? undefined}
        underlineColorAndroid="transparent"
        onChangeText={e => inputHandler(e)}
        placeholderTextColor={Colors.border}
      />
    </View>
  );
};

const useDynamicStyles = () => {
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    header: {
      height: 58 + insets.top,
      paddingTop: 10 + insets.top,
    },
  });
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.dark,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 15,
  },
  textInput: {
    marginLeft: 60,
    borderRadius: 5,
    paddingVertical: 0,
    height: 37,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingLeft: 17,
    color: Colors.border,
    flex: 1,
    ...Typography.semibold16,
  },
});
