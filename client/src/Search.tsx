import React, { ReactElement } from 'react';
import { get } from './request/request';

export const Search = (): ReactElement => {
  const onClickButton = async () => {
    await get('/search');
  };

  return (
    <>
      <button type="button" onClick={onClickButton}>
        검색
      </button>
    </>
  );
};
