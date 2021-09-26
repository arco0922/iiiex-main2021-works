import React from 'react';
import { RouteComponentProps, useParams, withRouter } from 'react-router';

interface Params {
  id: string;
}

const IndividualPageComponent: React.VFC<RouteComponentProps<Params>> = ({ match }) => {
  const worksId = match.params.id;

  return (
    <div>
      <p>作品ページ：作品IDは{worksId}</p>
    </div>
  );
};

export const IndividualPage = withRouter(IndividualPageComponent);
