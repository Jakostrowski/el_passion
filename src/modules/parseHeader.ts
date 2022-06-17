import {octokit} from '../hooks/useSearchData';

export const getTotalPages = (header: string | undefined) => {
  if (header) {
    const lastPageLink = header.substring(
      header.indexOf('<', 1) + 1,
      header.lastIndexOf('>'),
    );
    const totalPages = Number(lastPageLink.split('&page=')[1]);
    return totalPages;
  }
};

export const getStars = async (nickname: string | undefined) => {
  const data = await octokit.request(`GET /users/${nickname}/starred`, {
    per_page: 1,
  });
  if (data.status === 200) {
    if (data.data.length === 0) return 0;
    else return getTotalPages(data.headers.link);
  }
};
