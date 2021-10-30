import { Header } from 'components/Header/Header';
import { theme } from 'constants/Theme';
import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';
import { RouteComponentProps, useParams, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IndividualWorksCaption } from './IndividualWorksCaption';
import { IndividualWorksWindow } from './IndividualWorksWindow';

interface Params {
  id: string;
}

const IndividualPageComponent: React.VFC<RouteComponentProps<Params>> = ({ match }) => {
  const worksId = Number(match.params.id);
  const worksInfo = React.useMemo(() => worksInfoArr.filter((info) => info.id === worksId)[0], [worksId]);
  const [isFull, setIsFull] = React.useState<boolean>(false);
  const iframeWidth = isFull ? '100vw' : '60vw';
  const iframeHeight = isFull
    ? '100vh'
    : `calc( ${iframeWidth} * ${worksInfo.aspectRatio ? worksInfo.aspectRatio : 9 / 16} )`;

  return (
    <StyledRoot>
      <Header />
      <StyledWorksContainer>
        <IndividualWorksWindow srcUrl={worksInfo.srcUrlPc} iframeHeight={iframeHeight} iframeWidth={iframeWidth} />
        <IndividualWorksCaption worksInfo={worksInfo} />
      </StyledWorksContainer>
      <StyledButton>
        <StyledLink to="/">作品一覧へ</StyledLink>
      </StyledButton>
    </StyledRoot>
  );
};

export const IndividualPage = withRouter(IndividualPageComponent);

const StyledRoot = styled.div`
  background-color: ${theme.color.darkGrey};
  width: 100vw;
  height: 100vh;
`;

const StyledWorksContainer = styled.div`
  display: flex;
`;

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
