import React, { ReactElement } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../App';
import { Auth } from '../component/Auth';
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
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
