import { Header } from 'components/Header/Header';
import React from 'react';
import { RouteComponentProps, useParams, withRouter } from 'react-router';
import { IndividualWorksWindow } from './IndividualWorksWindow';

interface Params {
  id: string;
}

const IndividualPageComponent: React.VFC<RouteComponentProps<Params>> = ({ match }) => {
  const worksId = Number(match.params.id);

  return (
    <div>
      <Header />
      <p>作品ページ：作品IDは{worksId}</p>
      <IndividualWorksWindow worksId={worksId} />
    </div>
  );
};

export const IndividualPage = withRouter(IndividualPageComponent);
