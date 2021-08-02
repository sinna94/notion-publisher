import { ReactElement, useState } from 'react';
import { get } from '../request';
import { SearchResponse } from '../interface';
import { PageInfo } from './SearchResult';
import { Layout } from './Layout';

export const Search = (): ReactElement => {
  const [searchResult, setSearchResult] = useState<SearchResponse | undefined>(undefined);

  const onClickButton = async () => {
    const response = await get<SearchResponse>('/search');
    if (response?.data) {
      setSearchResult(response.data);
    }
  };

  return (
    <Layout>
      <button type="button" onClick={onClickButton}>
        검색
      </button>
      <PageInfo pageInfoList={searchResult?.results ?? []} />
    </Layout>
  );
};
