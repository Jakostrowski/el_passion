import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CustomHeader} from '../components/CustomHeader';
import {FlatListItem} from '../components/FlatListItem';
import {Text} from '../components/Text';
import {Colors} from '../consts/Colors';
import {useSearchData} from '../hooks/useSearchData';

export const ListScreen = () => {
  const {total, data} = useSearchData();
  return (
    <View style={styles.container}>
      <CustomHeader />

      <View style={styles.dataWrapper}>
        <Text style={styles.totalText} color="black" typography="h1">
          {total} results
        </Text>

        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          renderItem={({item}) => (
            <FlatListItem
              type={item.type}
              name={item.type ? item.login : item.full_name}
            />
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
    marginBottom: 20,
  },
  container: {flex: 1, backgroundColor: Colors.white},
  dataWrapper: {paddingHorizontal: 16, flex: 1},
  flatListContent: {flexGrow: 1},
});
