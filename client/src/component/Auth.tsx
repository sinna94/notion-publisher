import React, { ReactElement, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { get } from '../request/request';
import { setSessionStorage } from '../Storage';

interface AuthResponse {
  accessToken: string;
  workspaceName: string;
  workspaceIcon: string;
  botId: string;
  tokenType: string;
}

export const Auth = (): ReactElement => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const fetchAuth = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get('code');

      const params = { code };
      const response = await get<AuthResponse>('/auth', { params });
      if (response.status === 200) {
        Object.entries(response.data).forEach(([key, value]: [string, string]) => {
          setSessionStorage(key, value);
        });
      }
    };
    try {
      fetchAuth();
      setIsAuth(true);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      {isAuth && <Redirect to={{ pathname: '/' }} />}
      {!isAuth && <h2>Hi, Welcome Home!</h2>}
    </>
  );
};
