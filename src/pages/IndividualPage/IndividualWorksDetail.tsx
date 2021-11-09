import { Visited } from 'AppRoot';
import { Caption } from 'components/Caption/Caption';
import { Creator, WorksInfo } from 'constants/WorksInfo';
import React from 'react';
import styled from 'styled-components';
import { CreatorDescription } from './CreatorDescription';
import { SuggestedWorks } from './SuggestedWorks';
import { convertDeviceString } from 'utils/convertDeviceString';

interface Props {
  worksInfo: WorksInfo;
  suggestIds: number[];
  visited: Visited;
}

export const IndividualWorksDetail: React.VFC<Props> = ({ worksInfo, suggestIds, visited }) => {
  return (
    <StyledContainer>
      <StyledSection>
        <h4>作品名</h4>
        <p>{worksInfo.title}</p>
      </StyledSection>
      <StyledSection>
        <h4>対応デバイス</h4>
        <p>{convertDeviceString(worksInfo.device)}</p>
      </StyledSection>
      <StyledSection>
        <h4>制作者</h4>
        <StyledCreatorsContainer>
          {worksInfo.creators.map((worksCreator, idx) => {
            return <CreatorDescription creator={worksCreator} key={idx}></CreatorDescription>;
          })}
        </StyledCreatorsContainer>
      </StyledSection>
      <StyledSection>
        <h4>作品説明</h4>
        <Caption captionText={worksInfo.caption}></Caption>
      </StyledSection>
      <StyledSection>
        <h4>近くにある作品</h4>
        <StyledSuggestWorksContainer>
          {suggestIds.length >= 4 &&
            suggestIds.slice(0, 4).map((worksId) => {
              return <SuggestedWorks worksId={worksId} isVisited={visited[worksId]} key={worksId}></SuggestedWorks>;
            })}
        </StyledSuggestWorksContainer>
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
const StyledSuggestWorksContainer = styled.div`
  width: 100%;
  display: flex;
`;

const StyledCreatorsContainer = styled.div`
  width: 100%;
  display: flex;
`;
