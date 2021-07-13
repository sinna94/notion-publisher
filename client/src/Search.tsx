import React, { ReactElement, useState } from 'react';
import { get } from './request/request';

interface SearchResponse {
  hasMore: boolean;
  nexrCursor: string | null;
  object: string;
  results: Result[];
}

interface Title {
  annotations: {
    bold: boolean;
    code: boolean;
    color: string;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
  };
  href: null;
  plain_text: string;
  text: {
    content: string;
    link: null;
  };
  type: string;
}

interface Result {
  archived: boolean;
  created_time: string;
  id: string;
  last_edited_time: string;
  object: string;
  properties: {
    [name: string]: {
      id: string;
      date?: { start: string; end: string | null };
      title?: Title[];
      type: string;
    };
  };
  url: string;
  parent: {
    database_id: string;
    type: string;
  };
}

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
      {searchResult && searchResult?.results.map((result) => <p>{result.id}</p>)}
    </>
  );
};
