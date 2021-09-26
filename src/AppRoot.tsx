import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { IndividualPage } from 'pages/IndividualPage/IndividualPage';
import { TestPage } from 'pages/TestPage/TestPage';
import { TopPage } from 'pages/TopPage/TopPage';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const AppRoot: React.VFC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <TopPage />
        </Route>
        <Route path="/works/:id" exact>
          <IndividualPage />
        </Route>
        <Route path="/test" exact>
          <TestPage />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
};
