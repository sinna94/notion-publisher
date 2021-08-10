import { ReactElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import { Auth } from '../component/Auth';
import { Page } from '../component/Page';
import { Search } from '../component/Search';
import { PrivateRoute } from './PrivateRoute';

export const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <PrivateRoute path="/search">
          <Search />
        </PrivateRoute>
        <PrivateRoute path="/page/:id">
          <Page />
        </PrivateRoute>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
