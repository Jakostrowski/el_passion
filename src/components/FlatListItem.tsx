import React from 'react';
import {Divider} from './Divider';
import {RepoItem} from './RepoItem';
import {UserItem} from './UserItem';

interface Props {
  type: string | undefined;
  name: string;
}

export const FlatListItem: React.FC<Props> = props => {
  return (
    <>
      <Divider />

      {props.type ? (
        <UserItem userNickname={props.name} />
      ) : (
        <RepoItem repoName={props.name} />
      )}
    </>
  );
};
