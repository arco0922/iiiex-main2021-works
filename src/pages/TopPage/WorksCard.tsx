import { WorksInfo } from 'constants/WorksInfo';
import React from 'react';
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
      <StyledThumbnail src={`/static/assets/thumbnails/${worksInfo.thumbnailName}`} height="100%"></StyledThumbnail>
      <p>{worksInfo.title}</p>
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
  border: ${({ isSelect }) => (isSelect ? '3px solid rgba(255,100,100,1)' : '')};
  &:hover {
    cursor: pointer;
    background-color: #4a4a4a;
  }
`;

const StyledThumbnail = styled.img`
  margin-right: 5px;
`;
