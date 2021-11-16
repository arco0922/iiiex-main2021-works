import styled from 'styled-components';
import React from 'react';
import { theme } from 'constants/Theme';

interface Props {
  ownQuestionnaireUrl: string;
  isNarrowLayout: boolean;
}

export const OwnQuestionnaire: React.VFC<Props> = ({ ownQuestionnaireUrl, isNarrowLayout }) => {
  return (
    <StyledQuestionnaireContainer>
      　<StyledTitle className={isNarrowLayout ? 'narrow' : ''}>個別作品アンケート</StyledTitle>
      <StyledQuestionnaireIframe src={ownQuestionnaireUrl}></StyledQuestionnaireIframe>
    </StyledQuestionnaireContainer>
  );
};

const StyledQuestionnaireContainer = styled.div`
  height: 800px;
`;
const StyledTitle = styled.h4`
  color: white;
  margin-bottom: 10px;
  font-weight: ${theme.fontWeight.regular};
  &.narrow {
    margin-left: 10px;
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

const StyledQuestionnaireIframe = styled.iframe`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  display: block;
  background-color: white;
  z-index: 17;
`;
