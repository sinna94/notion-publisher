import { Redirect, Route, RouteProps } from 'react-router-dom';
import { getAccessToken } from '../Storage';

export const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const accessToken = getAccessToken();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        accessToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
