import React from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import {Colors} from '../consts/Colors';
import {Typography} from '../consts/Typography';

export const CustomHeader = () => {
  return (
    <View style={styles.header}>
      <Image source={require('../assets/logo.png')} />
      <TextInput
        style={styles.textInput}
        placeholder="Search"
        underlineColorAndroid="transparent"
        placeholderTextColor={Colors.border}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 58,
    backgroundColor: Colors.dark,
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 15,
  },
  textInput: {
    marginLeft: 60,
    borderRadius: 5,
    height: 37,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingLeft: 17,
    color: Colors.border,
    flex: 1,
    ...Typography.semibold16,
  },
});
