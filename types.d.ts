import {components} from '@octokit/openapi-types/types';

declare type UserType = components['schemas']['user-search-result-item'];

declare type RepoType = components['schemas']['repo-search-result-item'];

declare type CompoundData = Array<UserType & RepoType>;

declare type State = {
  total: number | null;
  page: number;
  maxPages: number | null;
  data: CompoundData;
  searchString: string;
};
