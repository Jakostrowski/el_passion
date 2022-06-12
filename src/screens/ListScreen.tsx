import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {CustomHeader} from '../components/CustomHeader';
import {Divider} from '../components/Divider';
import {FlatListItem} from '../components/FlatListItem';
import {useSearchData} from '../hooks/useSearchData';

export const ListScreen = () => {
  const {total, data} = useSearchData();
  return (
    <View style={styles.container}>
      <CustomHeader />

      <View style={styles.dataWrapper}>
        <Text style={styles.totalText}>{total} results</Text>

        <Divider style={styles.divider} />

        <FlatList
          data={data}
          renderItem={({item}) => (
            <FlatListItem type={item.type} url={item.url} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  totalText: {
    marginTop: 34,
    marginLeft: 1,
    fontSize: 21,
    fontWeight: '500',
    lineHeight: 32,
    color: '#000',
    fontFamily: 'Roboto',
  },
  container: {flex: 1},
  dataWrapper: {paddingHorizontal: 16},
  divider: {marginVertical: 20},
});
