import { ReactElement, useState } from 'react';
import { get } from '../request';
import { SearchResponse } from '../interface';
import { PageInfo } from './SearchResult';

export const Search = (): ReactElement => {
  const [searchResult, setSearchResult] = useState<SearchResponse | undefined>(undefined);

  const onClickButton = async () => {
    const response = await get<SearchResponse>('/search');
    if (response?.data) {
      console.log(response.data);
      setSearchResult(response.data);
    }
    console.log(searchResult);
  };

  return (
    <>
      <button type="button" onClick={onClickButton}>
        검색
      </button>
      <PageInfo pageInfoList={searchResult?.results ?? []} />
    </>
  );
};
