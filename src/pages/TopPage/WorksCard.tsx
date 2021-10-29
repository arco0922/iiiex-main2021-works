import { theme } from 'constants/Theme';
import { WorksInfo } from 'constants/WorksInfo';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  worksInfo: WorksInfo;
  selectId: number;
  setSelectId: (id: number) => void;
}

export const WorksCard: React.VFC<Props> = ({ worksInfo, selectId, setSelectId }) => {
  const cardContainerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (worksInfo.id === selectId && cardContainerRef.current) {
      cardContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [worksInfo, selectId]);
  return (
    <StyledContainer
      onClick={() => setSelectId(worksInfo.id)}
      isSelect={worksInfo.id === selectId}
      ref={cardContainerRef}
    >
      <StyledThumbnail
        src={`/static/assets/thumbnails/${worksInfo.thumbnailBaseName}.jpg`}
        height="100%"
      ></StyledThumbnail>
      <StyledInfoDiv>
        <p>{worksInfo.title}</p>
        <StyledButton>
          <StyledLink to={`/works/${worksInfo.id}`}>この作品を見る</StyledLink>
        </StyledButton>
      </StyledInfoDiv>
    </StyledContainer>
  );
};

interface StyledContainerProps {
  isSelect: boolean;
}

const StyledContainer = styled.div<StyledContainerProps>`
  width: 100%;
  height: 100px;
  display: flex;
  border-bottom: 1px solid #2a2a2a;
  padding-top: 1px;
  padding-bottom: 1px;
  border: ${({ isSelect }) => (isSelect ? `3px solid ${theme.color.primary}` : '')};
  &:hover {
    cursor: pointer;
    background-color: #4a4a4a;
  }
`;

const StyledThumbnail = styled.img`
  margin-right: 5px;
`;

const StyledInfoDiv = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  & > p {
    font-size: 18px;
  }
`;

const StyledButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
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
