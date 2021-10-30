import { Header, headerHeight } from 'components/Header/Header';
import { theme } from 'constants/Theme';
import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
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
      <Header showNavigationToTop={true} />
      <StyledContentContainer>
        <StyledWorksContainer>
          <IndividualWorksWindow srcUrl={worksInfo.srcUrlPc} iframeHeight={iframeHeight} iframeWidth={iframeWidth} />
          <IndividualWorksCaption worksInfo={worksInfo} />
        </StyledWorksContainer>
      </StyledContentContainer>
    </StyledRoot>
  );
};

export const IndividualPage = withRouter(IndividualPageComponent);

const StyledRoot = styled.div`
  background-color: ${theme.color.darkGrey};
  min-width: 100vw;
  min-height: 100vh;
  overflow-y: hidden;
`;

const StyledContentContainer = styled.div`
  width: 100%;
  height: calc(100vh - ${headerHeight}px);
  padding: 20px 10px;
  overflow-y: auto;
`;

const StyledWorksContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;
