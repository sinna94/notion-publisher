import { ReactElement, useState } from 'react';
import { get } from '../request';
import { Result, SearchResponse } from '../interface';
import { PageInfo } from './PageInfo';
import { Layout } from './Layout';

export const Search = (): ReactElement => {
  const [searchResult, setSearchResult] = useState<SearchResponse | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const getSearchResponse = async (
    nextCursor?: string,
  ) => {
    setLoading(true);
    const params = { nextCursor }
    const response = await get<SearchResponse>('/search', { params });
    if (response?.data) {
      const results: Result[] = (searchResult?.results ?? [])
      results.push(...response.data.results);
      const newSearchResult: SearchResponse = { ...response.data, results }
      setSearchResult(newSearchResult);
    }
    setLoading(false);
  }

  const onClickButton = async () => {
    setSearchResult(undefined);
    await getSearchResponse();
  };

  return (
    <Layout>
      <button type="button" onClick={onClickButton}>
        검색
      </button>
      <PageInfo searchResult={searchResult} getSearchResponse={getSearchResponse} loading={loading} />
    </Layout>
  );
};
