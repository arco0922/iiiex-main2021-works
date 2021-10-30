import { WorksInfo } from 'constants/WorksInfo';
import React from 'react';
import styled from 'styled-components';

interface Props {
  worksInfo: WorksInfo;
}

export const IndividualWorksCaption: React.VFC<Props> = ({ worksInfo }) => {
  return (
    <StyledContainer>
      <StyledSection>
        <h4>作品名</h4>
        <p>{worksInfo.title}</p>
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
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  min-width: 250px;
`;

const StyledSection = styled.section`
  width: 100%;
  margin-bottom: 15px;
  color: white;
  & > h4 {
    margin-bottom: 3px;
  }
`;
