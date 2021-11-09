import styled from 'styled-components';
import { Visited } from 'AppRoot';
import { WorksInfo } from 'constants/WorksInfo';
import React from 'react';
import { theme } from 'constants/Theme';
import { Link } from 'react-router-dom';

interface Props {
  worksInfo: WorksInfo;
  visited: Visited;
  setIsShowHamburger: (isShowHamburger: boolean) => void;
}

export const HamburgerWorksCard = React.memo<Props>(function HamburgerWorksCard({
  worksInfo,
  visited,
  setIsShowHamburger,
}) {
  const [isHover, setIsHover] = React.useState<boolean>(false);

  return (
    <StyledContainer
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => setIsShowHamburger(false)}
      to={`/works/${worksInfo.id}`}
    >
      {isHover && (
        <StyledHoverDiv>
          <p>作品を見る</p>
        </StyledHoverDiv>
      )}
      <StyledImgDiv>
        <StyledThumbnail src={`/static/assets/thumbnails/${worksInfo.thumbnailBaseName}.jpg`}></StyledThumbnail>
        {visited[worksInfo.id] && <StyledCheck src="/static/assets/check/check_mark.png" height="30%"></StyledCheck>}
      </StyledImgDiv>
      <StyledInfoDiv>
        <p>{worksInfo.title}</p>
      </StyledInfoDiv>
    </StyledContainer>
  );
});

const hamburgerWorksCardHeight = 80;

const StyledContainer = styled(Link)`
  width: 100%;
  height: ${hamburgerWorksCardHeight}px;
  display: flex;
  border-bottom: 1px solid #2a2a2a;
  padding-top: 1px;
  padding-bottom: 1px;
  color: white;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

const StyledHoverDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000c1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  border: 3px solid ${theme.color.primary};

  & > p {
    font-weight: ${theme.fontWeight.bold};
    font-size: 16px;
  }
`;

const StyledImgDiv = styled.div`
  height: 100%;
  margin-right: 5px;
`;

const StyledThumbnail = styled.img`
  display: block;
  height: 100%;
`;

const StyledCheck = styled.img`
  position: absolute;
  display: block;
  z-index: 6;
  bottom: 0px;
  right: -5px;
`;

const StyledInfoDiv = styled.div`
  flex: 1;
  height: 100%;
  & > p {
    font-size: 14px;
  }
`;
