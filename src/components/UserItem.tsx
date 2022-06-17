import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {octokit, UserType} from '../hooks/useSearchData';
import {UserDetails} from '../screens/DetailsScreen';
import {Text} from './Text';

interface Props {
  userNickname: string;
}

export const UserItem: React.FC<Props> = ({userNickname}) => {
  const [data, setData] = React.useState<UserType>();
  const {navigate} = useNavigation();

  React.useEffect(() => {
    let isFocused = true;
    (async () => {
      const userData = await octokit.request(`GET /users/${userNickname}`);
      if (userData.status === 200 && isFocused) {
        setData(userData.data);
      }
    })();
    return () => {
      isFocused = false;
    };
  }, [userNickname]);

  const navigateToDetails = () => {
    const params: UserDetails = {
      nickname: data?.login,
      name: data?.name,
      image_url: data?.avatar_url,
      followers: data?.followers,
      following: data?.following,
    };
    navigate('DetailsScreen' as never, params as never);
  };

  return (
    <TouchableOpacity onPress={navigateToDetails} disabled={!data}>
      <View style={styles.imageContainer}>
        <Image source={{uri: data?.avatar_url}} style={styles.image} />

        <Text style={styles.textMargin} color="blue" typography="semibold16">
          {data?.name}
        </Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text color="gray" typography="semibold16">
          {data?.login}
        </Text>

        {data?.bio && (
          <Text color="dark" style={styles.textBio} typography="semibold14">
            {data.bio}
          </Text>
        )}

        {data?.location && (
          <Text
            color="gray"
            typography="semibold12"
            style={styles.textLocation}>
            {data.location}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {height: 20, width: 20, borderRadius: 10},
  textMargin: {marginLeft: 8},
  detailsContainer: {marginLeft: 28, marginBottom: 16},
  textBio: {marginTop: 20},
  textLocation: {marginTop: 8},
});
