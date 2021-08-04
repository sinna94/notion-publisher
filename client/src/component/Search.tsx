import { ReactElement, useState } from 'react';
import { get } from '../request';
import { SearchResponse } from '../interface';
import { PageInfo } from './PageInfo';
import { Layout } from './Layout';

export const Search = (): ReactElement => {
  const [searchResult, setSearchResult] = useState<SearchResponse | undefined>(undefined);

  const getSearchResponse = async (
    nextCursor?: string,
  ) => {
    const params = { nextCursor }
    const response = await get<SearchResponse>('/search', { params });
    if (response?.data) {
      setSearchResult(response.data);
    }
  }

  const onClickButton = async () => {
    await getSearchResponse();
  };

  return (
    <Layout>
      <button type="button" onClick={onClickButton}>
        검색
      </button>
      <PageInfo pageInfoList={searchResult?.results ?? []} getSearchResponse={getSearchResponse} />
    </Layout>
  );
};
