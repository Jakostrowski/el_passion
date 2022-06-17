import React from 'react';
import {Octokit} from '@octokit/core';
import {CompoundData, RepoType, State, UserType} from '../../types';

export const octokit = new Octokit({
  auth: 'PASTE_YOUR_PERSONAL_ACCESS_TOKEN',
});

const initState: State = {
  total: null,
  page: 1,
  maxPages: null,
  data: [],
  searchString: '',
};

export const useSearchData = () => {
  const [state, setState] = React.useState<State>(initState);

  const take = 15;

  const fetchData = React.useCallback(
    async (page?: number) => {
      const promises = [
        octokit.request('GET /search/users', {
          page: page ?? 1,
          per_page: take,
          q: `type:user ${state.searchString}`,
        }),
        octokit.request('GET /search/repositories', {
          page: page ?? 1,
          per_page: take,
          q: `is:public ${state.searchString}`,
        }),
      ];
      try {
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
      } catch (e) {
        console.log(e);
        return {
          usersResponse: null,
          reposResponse: null,
        };
      }
    },
    [state.searchString],
  );

  const getMaxPages = (usersTotal: number, reposTotal: number) => {
    //1000 because api does not allow to fetch more
    if (usersTotal > reposTotal && usersTotal < 1000) {
      return Math.ceil(usersTotal / take);
    } else if (reposTotal > usersTotal && reposTotal < 1000) {
      return Math.ceil(reposTotal / take);
    }
    return Math.ceil(1000 / take);
  };

  const sortData = (users: UserType[], repos: RepoType[]) => {
    return [...users, ...repos].sort((a, b) => a.id - b.id) as CompoundData;
  };

  const setData = React.useCallback(
    async (page?: number) => {
      const {usersResponse, reposResponse} = await fetchData(page);
      if (usersResponse && reposResponse) {
        const usersTotal = usersResponse.total_count;
        const reposTotal = reposResponse.total_count;

        setState(prevState => ({
          ...prevState,
          total: usersTotal + reposTotal,
          maxPages: getMaxPages(usersTotal, reposTotal),
          data: sortData(
            usersResponse.items as UserType[],
            reposResponse.items as RepoType[],
          ),
          page: page ?? 1,
        }));
      }
    },
    [fetchData],
  );

  React.useEffect(() => {
    (async () => {
      await setData();
    })();
  }, [fetchData, setData]);

  return {state, setState, setData};
};
