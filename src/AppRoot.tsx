import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { IndividualPage } from 'pages/IndividualPage/IndividualPage';
import { TestPage } from 'pages/TestPage/TestPage';
import { TopPage } from 'pages/TopPage/TopPage';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const AppRoot: React.VFC = () => {
  /** 本番環境用のビルドの場合は、/testのルーティングは作らない */
  const isProd = process.env.PHASE === 'production';

  const [selectId, setSelectId] = React.useState<number>(0);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <TopPage selectId={selectId} setSelectId={setSelectId} />
        </Route>
        <Route path="/works/:id" exact>
          <IndividualPage setSelectId={setSelectId} />
        </Route>
        {!isProd && (
          <Route path="/test" exact>
            <TestPage />
          </Route>
        )}
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
};
