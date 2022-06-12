import React from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';

export const CustomHeader = () => {
  return (
    <View style={styles.header}>
      <Image source={require('../assets/logo.png')} />
      <TextInput
        style={styles.textInput}
        placeholder="Search"
        underlineColorAndroid="transparent"
        placeholderTextColor={'#D0D7DE'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 58,
    backgroundColor: '#24292F',
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
    borderColor: '#D0D7DE',
    fontWeight: '500',
    paddingLeft: 17,
    color: '#D0D7DE',
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
});
