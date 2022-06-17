import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {FollowersIcon} from '../assets/FollowersIcon';
import {StarIcon} from '../assets/StarIcon';
import {CustomHeader} from '../components/CustomHeader';
import {Text} from '../components/Text';
import {getStars} from '../modules/parseHeader';

export interface UserDetails {
  nickname: string | undefined;
  name: string | undefined | null;
  image_url: string | undefined;
  followers: number | undefined;
  following: number | undefined;
}

export const DetailsScreen = () => {
  const params = useRoute()?.params as UserDetails;
  const [stars, setStars] = React.useState<number>();

  React.useEffect(() => {
    (async () => {
      const starsCount = await getStars(params.nickname);
      setStars(starsCount);
    })();
  }, [params.nickname]);

  return (
    <View style={styles.container}>
      <CustomHeader />

      <View style={styles.contentWrapper}>
        <Image source={{uri: params.image_url}} style={styles.image} />

        <Text color="dark" typography="semibold26" style={styles.textName}>
          {params.name}
        </Text>

        <Text typography="semibold20" color="gray" style={styles.textNickname}>
          {params.nickname}
        </Text>

        <View style={styles.flexWrapper}>
          <SvgXml xml={FollowersIcon} />

          <Text color="gray" typography="semibold12" style={styles.margin}>
            {params.followers}
          </Text>

          <Text color="gray" typography="semibold12" style={styles.margin}>
            Followers
          </Text>

          <Text
            color="gray"
            typography="semibold12"
            style={styles.biggerMargin}>
            {params.following}
          </Text>

          <Text color="gray" typography="semibold12" style={styles.margin}>
            Following
          </Text>

          <SvgXml xml={StarIcon} style={styles.biggerMargin} />

          <Text color="gray" typography="semibold12" style={styles.margin}>
            {stars}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  contentWrapper: {marginTop: 30, alignItems: 'center'},
  image: {width: 296, height: 296, borderRadius: 148},
  textName: {marginTop: 16},
  textNickname: {fontFamily: 'SegoeUi'},
  flexWrapper: {
    flexDirection: 'row',
    marginTop: 11,
    alignItems: 'center',
  },
  margin: {marginLeft: 4},
  biggerMargin: {marginLeft: 19},
});
