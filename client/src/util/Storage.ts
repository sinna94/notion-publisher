export const setSessionStorage = (key: string, value: string): void => {
  sessionStorage.setItem(key, value);
};

export const getSessionStorageValue = (key: string): string | null => {
  return sessionStorage.getItem(key);
};

export const getAccessToken = (): string | null => {
  return sessionStorage.getItem('accessToken');
};

export const getWorkspaceName = (): string | null => {
  return sessionStorage.getItem('workspaceName');
}
