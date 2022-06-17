import {useRoute} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CustomHeader} from '../components/CustomHeader';
import {FlatListItem} from '../components/FlatListItem';
import {PaginationButtons} from '../components/PaginationButtons';
import {Text} from '../components/Text';
import {Colors} from '../consts/Colors';
import {useSearchData} from '../hooks/useSearchData';

export const ListScreen = () => {
  const {state, setState, setData} = useSearchData();
  const params = useRoute()?.params as {searchString: string};

  React.useEffect(() => {
    if (params) {
      setState({...state, searchString: params.searchString});
    }
  }, [params]);

  const onChange = (searchString: string) => {
    setState(prevState => ({...prevState, searchString}));
  };

  const onPress = async (page: number) => {
    await setData(page);
  };

  return (
    <View style={styles.container}>
      <CustomHeader onChange={onChange} searchString={params?.searchString} />

      <Text style={styles.totalText} color="black" typography="h1">
        {state.total} results
      </Text>

      <FlatList
        data={state.data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        renderItem={({item}) => (
          <FlatListItem
            type={item.type}
            name={item.type ? item.login : item.full_name}
          />
        )}
      />

      <PaginationButtons state={state} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  totalText: {
    marginTop: 34,
    marginLeft: 17,
    marginBottom: 20,
  },
  container: {flex: 1, backgroundColor: Colors.white},
  flatListContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
});
