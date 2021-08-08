import React, { ReactElement, useState } from 'react';
import { get } from '../request';
import { Result, SearchResponse } from '../interface';
import { PageInfo } from './PageInfo';
import { Layout } from './Layout';
import { InputAdornment, OutlinedInput } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export const Search = (): ReactElement => {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [searchResult, setSearchResult] = useState<SearchResponse | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const getSearchResponse = async (
    nextCursor?: string,
  ) => {
    setLoading(true);
    const params = { nextCursor, query };
    const response = await get<SearchResponse>('/search', { params });
    if (response?.data) {
      console.log(searchResult?.results);
      const results: Result[] = nextCursor ? (searchResult?.results ?? []) : []
      results.push(...response.data.results);
      const newSearchResult: SearchResponse = { ...response.data, results }
      setSearchResult(newSearchResult);
    }
    setLoading(false);
  }

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchResult(undefined);
      await getSearchResponse();
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value === '' ? undefined : value);
  }

  console.log(searchResult);

  return (
    <Layout>
      <OutlinedInput
        key='search-input'
        onKeyDown={onKeyDown}
        onChange={onChange}
        startAdornment={
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        }
        style={{
          'width': '100%',
          'margin': '5px',
          'height': '40px',
        }}
      />
      <PageInfo searchResult={searchResult} getSearchResponse={getSearchResponse} loading={loading} />
    </Layout>
  );
};
