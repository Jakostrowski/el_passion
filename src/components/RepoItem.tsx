import React from 'react';
import {octokit} from '../hooks/useSearchData';
import {StyleSheet, View} from 'react-native';
import {Text} from './Text';
import {getLanguageColor} from '../modules/gitColors';
import {getTimeDiff} from '../modules/timeDiff';
import {StarIcon} from '../assets/StarIcon';
import {SvgXml} from 'react-native-svg';
import {RepoIcon} from '../assets/RepoIcon';
import {RepoType} from '../../types';

interface Props {
  repoName: string;
}

export const RepoItem: React.FC<Props> = ({repoName}) => {
  const [data, setData] = React.useState<RepoType>();
  const dynamicStyles = useDynamicStyles(data?.license?.name, data?.language);

  React.useEffect(() => {
    let isFocused = true;
    (async () => {
      const repoData = await octokit.request(`GET /repos/${repoName}`);
      if (repoData.status === 200 && isFocused) {
        setData(repoData.data);
      }
    })();
    return () => {
      isFocused = false;
    };
  }, [repoName]);

  return (
    <>
      <View style={styles.imageContainer}>
        <SvgXml xml={RepoIcon} />

        <Text
          color="blue"
          typography="semibold16"
          style={styles.textFullName}
          numberOfLines={1}>
          {data?.full_name}
        </Text>
      </View>

      <Text color="gray" typography="semibold16" style={styles.textDescription}>
        {data?.description}
      </Text>

      <View style={styles.detailsContainer}>
        <View style={styles.upperFlexContainer}>
          <SvgXml xml={StarIcon} />

          <Text color="gray" typography="semibold12" style={styles.textMargin}>
            {data?.stargazers_count}
          </Text>

          <View style={dynamicStyles.languageDot} />

          <Text color="gray" typography="semibold12" style={styles.textMargin}>
            {data?.language ?? 'Other'}
          </Text>

          {data?.license?.name && (
            <Text
              color="gray"
              typography="semibold12"
              style={styles.textLicense}>
              {data?.license?.name}
            </Text>
          )}
        </View>

        <Text
          color="gray"
          typography="semibold12"
          style={dynamicStyles.textUpdatedAt}>
          Updated {getTimeDiff(data?.updated_at)}
        </Text>

        {data?.open_issues !== undefined && data.open_issues > 0 && (
          <Text
            color="gray"
            typography="semibold12"
            style={dynamicStyles.textIssues}>
            {data?.open_issues} issues need help
          </Text>
        )}
      </View>
    </>
  );
};

const useDynamicStyles = (
  license: string | undefined,
  language: string | undefined | null,
) => {
  return StyleSheet.create({
    languageDot: {
      backgroundColor: getLanguageColor(language),
      marginLeft: 14,
      height: 12,
      width: 12,
      borderRadius: 6,
    },
    textUpdatedAt: {
      marginLeft: license ? 0 : 14,
      flexGrow: license ? 0 : 1,
    },
    textIssues: {
      marginLeft: license ? 14 : 0,
      flexBasis: !license ? '100%' : undefined,
    },
  });
};

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  },
  textFullName: {
    lineHeight: 16,
    marginLeft: 8,
    paddingRight: 16,
    flexGrow: 1,
  },
  textDescription: {marginLeft: 28, marginTop: 5},
  detailsContainer: {
    paddingLeft: 28,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  textMargin: {marginLeft: 3},
  textLicense: {
    marginLeft: 14,
    flexGrow: 1,
  },
  upperFlexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
