import React from 'react';
import {TouchableOpacity} from 'react-native';

interface Props {
  type: string | undefined;
  url: string | undefined;
}

export const FlatListItem: React.FC<Props> = props => {
  return <TouchableOpacity disabled={!props.type} />;
};
