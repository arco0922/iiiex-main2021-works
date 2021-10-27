import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';
import styled from 'styled-components';

interface Props {
  selectId: number;
}

export const WorksDetail: React.VFC<Props> = ({ selectId }) => {
  const info = React.useMemo(() => worksInfoArr.filter((worksInfo) => worksInfo.id === selectId)[0], [selectId]);
  return (
    <StyledContainer>
      <StyledTitle>作品詳細</StyledTitle>
      <StyledDetailContainer>
        <StyledThumbnail src={`/static/assets/thumbnails/${info?.thumbnailName}`} width="100%"></StyledThumbnail>
        <StyledSection>
          <h4>作品名</h4>
          <p>{info.title}</p>
        </StyledSection>
        <StyledSection>
          <h4>制作者</h4>
          <p>だれだれ</p>
        </StyledSection>
        <StyledSection>
          <h4>作品説明</h4>
          <p>キャプション</p>
        </StyledSection>
        <StyledSection>
          <h4>近くにある作品</h4>
          <p>作品作品</p>
        </StyledSection>
      </StyledDetailContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  min-width: 300px;
  width: 300px;
  height: 100%;
  padding: 5px;
  background-color: #141414;
  color: white;
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.h2`
  min-height: 24px;
  width: 95%;
  font-size: 16px;
  font-weight: 400;
  border-bottom: 1px solid white;
  margin-bottom: 3px;
`;

const StyledDetailContainer = styled.div`
  flex: 1;
  width: 95%;
  overflow-y: auto;
`;

const StyledThumbnail = styled.img`
  margin-top: 5px;
  margin-bottom: 15px;
`;

const StyledSection = styled.section`
  margin-bottom: 15px;
  & > h4 {
    margin-bottom: 3px;
  }
`;
