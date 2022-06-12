import React from 'react';
import {Octokit} from '@octokit/core';
import {components} from '@octokit/openapi-types/types';

export const octokit = new Octokit({
  auth: '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',
});

export type userType = components['schemas']['user-search-result-item'];
export type repoType = components['schemas']['repo-search-result-item'];
export type CompoundData = Array<userType & repoType>;

export const useSearchData = () => {
  const [total, setTotal] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(1);
  const [data, setData] = React.useState<CompoundData>([]);

  const take = 15;

  const fetchData = React.useCallback(async () => {
    const promises = [
      octokit.request('GET /search/users', {
        page,
        per_page: take,
        q: 'type:user',
      }),
      octokit.request('GET /search/repositories', {
        page,
        per_page: take,
        q: 'is:public',
      }),
    ];

    const [usersResponse, reposResponse] = await Promise.all(promises);
    if (usersResponse.status === 200 && reposResponse.status === 200) {
      return {
        usersResponse: usersResponse.data,
        reposResponse: reposResponse.data,
      };
    } else {
      return {
        usersResponse: null,
        reposResponse: null,
      };
    }
  }, [page]);

  React.useEffect(() => {
    (async () => {
      const {usersResponse, reposResponse} = await fetchData();
      if (usersResponse && reposResponse) {
        setTotal(usersResponse.total_count + reposResponse.total_count);
        setData(
          [...usersResponse.items, ...reposResponse.items].sort(
            (a, b) => a.id - b.id,
          ) as CompoundData,
        );
      }
    })();
  }, [fetchData]);

  return {total, data, setPage};
};
