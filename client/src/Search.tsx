import { title } from 'process';
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
  'plain_text': string;
  text: {
    content: string;
    link: null;
  };
  type: string;
}

interface Result {
  archived: boolean;
  'created_time': string;
  id: string;
  'last_edited_time': string;
  object: string;
  properties: {
    [name: string]: Property;
  };
  url: string;
  parent: {
    'database_id': string;
    type: string;
  };
}

interface Property {
  id: string;
  date?: { start: string; end: string | null };
  title?: Title[];
  type: string;
};

const isTitleProperty = (property: Property): boolean => {
  return (property.type === 'title' && (property.title?.length ?? 0) > 0);
};

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

  const onClickPageId = async (pageId: string) => {
    const params = { pageId }
    const response = await get<any>('/page', { params });
    console.log(response);
  }

  const printPageInfo = () => {
    const titleList = searchResult?.results.map(result => {
      const { properties } = result;
      const titles = Object.values(properties).filter(isTitleProperty);

      return { id: result.id, title: titles?.[0]?.title?.[0].plain_text ?? '제목 없음', type: result.object };
    })

    console.log(titleList);

    return titleList?.map(titleInfo => {
      return (
        <p onClick={() => onClickPageId(titleInfo.id)}>
          {titleInfo.title}
        </p>
      );
    }
    )
  }

  return (
    <>
      <button type="button" onClick={onClickButton}>
        검색
      </button>
      {printPageInfo()}
    </>
  );
};
