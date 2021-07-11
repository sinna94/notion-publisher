import React, { ReactElement } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../App';
import { Auth } from '../Auth';

export const Router = (): ReactElement => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/auth">
                    <Auth />
                </Route>
                <Route path="/">
                    <App />
                </Route>
            </Switch>
        </BrowserRouter>);
}