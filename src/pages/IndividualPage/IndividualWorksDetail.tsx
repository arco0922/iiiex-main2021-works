import { WorksInfo } from 'constants/WorksInfo';
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
        <p className="device">〇対応デバイス：{convertDeviceString(worksInfo.device)}</p>
      </StyledSection>
      <StyledSection>
        <p className="caption"> {worksInfo.caption}</p>
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
  margin-top: 20px;
  min-width: 250px;
  width: calc(100% - 235px);
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
    font-size: 18px;
    white-space: pre-line;
  }

  &:last-of-type {
    margin-bottom: 0px;
  }
`;
const StyledCreatorsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
