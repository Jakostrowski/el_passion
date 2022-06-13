import React from 'react';
import {octokit, RepoType} from '../hooks/useSearchData';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from './Text';
import {getLanguageColor} from '../modules/gitColors';
import {getTimeDiff} from '../modules/timeDiff';

interface Props {
  repoName: string;
}

export const RepoItem: React.FC<Props> = ({repoName}) => {
  const [data, setData] = React.useState<RepoType>();
  const dynamicStyles = useDynamicStyles(
    data?.license?.name,
    data?.open_issues,
    data?.language,
  );

  React.useEffect(() => {
    (async () => {
      const repoData = await octokit.request(`GET /repos/${repoName}`);
      if (repoData.status === 200) {
        setData(repoData.data);
      }
    })();
  }, [repoName]);

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/repoIcon.png')} />

        <Text color="blue" typography="semibold16" style={styles.textFullName}>
          {data?.full_name}
        </Text>
      </View>

      <Text color="gray" typography="semibold16" style={styles.textDescription}>
        {data?.description}
      </Text>

      <View style={styles.detailsContainer}>
        <Image source={require('../assets/starIcon.png')} />

        <Text color="gray" typography="semibold12" style={styles.textMargin}>
          {data?.stargazers_count}
        </Text>

        <View style={dynamicStyles.languageDot} />

        <Text color="gray" typography="semibold12" style={styles.textMargin}>
          {data?.language ?? 'Other'}
        </Text>

        {data?.license?.name && (
          <Text color="gray" typography="semibold12" style={styles.textLicense}>
            {data?.license?.name}
          </Text>
        )}

        <View style={dynamicStyles.secondDetailsContainer}>
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
              style={styles.textIssues}>
              {data?.open_issues} issues need help
            </Text>
          )}
        </View>
      </View>
    </>
  );
};

const useDynamicStyles = (
  license: string | undefined,
  open_issues: number | undefined,
  language: string | undefined | null,
) => {
  const condition = license || open_issues;

  return StyleSheet.create({
    languageDot: {
      backgroundColor: getLanguageColor(language),
      marginLeft: 14,
      height: 12,
      width: 12,
      borderRadius: 6,
    },
    secondDetailsContainer: {
      width: condition ? '100%' : undefined,
      flexDirection: 'row',
      marginTop: condition ? 1 : 0,
    },
    textUpdatedAt: {
      marginLeft: condition ? 0 : 14,
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
  textFullName: {lineHeight: 16, marginLeft: 8},
  textDescription: {marginLeft: 28, marginTop: 5},
  detailsContainer: {
    marginLeft: 28,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: 16,
  },
  textMargin: {marginLeft: 3},
  textLicense: {
    marginLeft: 14,
    flex: 1,
  },
  textIssues: {marginLeft: 14},
});
