import { WorksInfo } from 'constants/WorksInfo';
import React from 'react';
import styled from 'styled-components';
import { CreatorDescription } from './CreatorDescription';
import { convertDeviceString } from 'utils/convertDeviceString';

interface Props {
  worksInfo: WorksInfo;
  isNarrowLayout: boolean;
}

export const IndividualWorksDetail: React.VFC<Props> = ({ worksInfo, isNarrowLayout }) => {
  const narrowClassName = isNarrowLayout ? 'narrow' : '';
  return (
    <StyledContainer className={narrowClassName}>
      <StyledSection>
        <p className={`title ${narrowClassName}`}>{worksInfo.title}</p>
        <p className={`device ${narrowClassName}`}>
          〇対応デバイス：{convertDeviceString(worksInfo.device)}
          {worksInfo.deviceMemo ? worksInfo.deviceMemo : ''}
        </p>
      </StyledSection>
      <StyledSection>
        <p className={`caption ${narrowClassName}`}> {worksInfo.caption}</p>
      </StyledSection>
      <StyledSection>
        <StyledCreatorsContainer>
          {worksInfo.creators.map((worksCreator, idx) => {
            return (
              <CreatorDescription creator={worksCreator} isNarrowLayout={isNarrowLayout} key={idx}></CreatorDescription>
            );
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
  &.narrow {
    margin-top: 50px;
    width: 100%;
    padding: 0px 10px;
  }
`;

const StyledSection = styled.section`
  width: 100%;
  margin-bottom: 30px;
  color: white;
  & > p.title {
    font-size: 40px;
    font-weight: bold;
    white-space: pre-line;
    &.narrow {
      font-size: 20px;
    }
  }
  & > p.caption {
    font-size: 18px;
    white-space: pre-line;
    &.narrow {
      font-size: 14px;
    }
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
