import { Creator, WorksInfo } from 'constants/WorksInfo';
import React from 'react';
import styled from 'styled-components';
import { CreatorDescription } from './CreatorDescription';
import { convertDeviceString } from 'utils/convertDeviceString';

interface Props {
  worksInfo: WorksInfo;
}

export const IndividualWorksDetail: React.VFC<Props> = ({ worksInfo }) => {
  return (
    <StyledContainer>
      <StyledSection>
        <p className="title">{worksInfo.title}</p>
      </StyledSection>
      <StyledSection>
        <p className="caption"> {worksInfo.caption}</p>
      </StyledSection>
      <StyledSection>
        <h4>対応デバイス</h4>
        <p> {convertDeviceString(worksInfo.device)}</p>
      </StyledSection>
      <StyledSection>
        <StyledCreatorsContainer>
          {worksInfo.creators.map((worksCreator, idx) => {
            return <CreatorDescription creator={worksCreator} key={idx}></CreatorDescription>;
          })}
        </StyledCreatorsContainer>
      </StyledSection>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  min-width: 250px;
  width: 60%;
`;

const StyledSection = styled.section`
  width: 100%;
  margin-bottom: 30px;
  color: white;
  & > h4 {
    margin-bottom: 3px;
  }
  & > p.title {
    font-size: 40px;
    font-weight: bold;
    white-space: pre-line;
  }
  & > p.caption {
    font-size: 20px;
    white-space: pre-line;
  }
`;
const StyledCreatorsContainer = styled.div`
  width: 100%;
  display: flex;
`;
