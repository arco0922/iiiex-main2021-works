import { Header } from 'components/Header/Header';
import { theme } from 'constants/Theme';
import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';
import { RouteComponentProps, useParams, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
      <StyledButton>
        <StyledLink to="/">作品一覧へ</StyledLink>
      </StyledButton>
    </div>
  );
};

export const IndividualPage = withRouter(IndividualPageComponent);

const StyledButton = styled.button`
  background-color: ${theme.color.primary};
  color: white;
  text-decoration: none;
  outline: none;
  border: none;
  padding: 3px;
  border-radius: 3px;
  &:hover {
    background-color: ${theme.color.activePrimary};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
