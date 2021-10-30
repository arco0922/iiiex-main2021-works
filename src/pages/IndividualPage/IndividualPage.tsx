import { Header } from 'components/Header/Header';
import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';
import { RouteComponentProps, useParams, withRouter } from 'react-router';
import { IndividualWorksWindow } from './IndividualWorksWindow';

interface Params {
  id: string;
}

const IndividualPageComponent: React.VFC<RouteComponentProps<Params>> = ({ match }) => {
  const worksId = Number(match.params.id);
  const worksInfo = React.useMemo(() => worksInfoArr.filter((info) => info.id === worksId)[0], [worksId]);
  const [isFull, setIsFull] = React.useState<boolean>(false);
  const iframeWidth = isFull ? '100vw' : '600px';
  const iframeHeight = isFull
    ? '100vh'
    : `calc( ${iframeWidth} * ${worksInfo.aspectRatio ? worksInfo.aspectRatio : 9 / 16} )`;

  return (
    <div>
      <Header />
      <p>作品ページ：作品IDは{worksId}</p>
      <IndividualWorksWindow srcUrl={worksInfo.srcUrlPc} iframeHeight={iframeHeight} iframeWidth={iframeWidth} />
    </div>
  );
};

export const IndividualPage = withRouter(IndividualPageComponent);
