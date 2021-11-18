import styled from 'styled-components';
import React from 'react';
import { theme } from 'constants/Theme';
import { headerHeight } from 'components/Header/Header';
import { useWindowDimensions } from 'hooks/useWindowDimensions';

interface Props {
  ownQuestionnaireUrl: string;
  isNarrowLayout: boolean;
}

export const OwnQuestionnaire: React.VFC<Props> = ({ ownQuestionnaireUrl, isNarrowLayout }) => {
  const { height } = useWindowDimensions();
  return (
    <StyledQuestionnaireContainer formHeight={height - headerHeight - 90}>
      <StyledTitle className={isNarrowLayout ? 'narrow' : ''}>個別作品アンケート</StyledTitle>
      <StyledQuestionnaireIframe src={ownQuestionnaireUrl}></StyledQuestionnaireIframe>
    </StyledQuestionnaireContainer>
  );
};

interface StyledQuestionnaireContainerProps {
  formHeight: number;
}

const StyledQuestionnaireContainer = styled.div<StyledQuestionnaireContainerProps>`
  height: ${({ formHeight }) => formHeight}px;
  min-height: ${({ formHeight }) => formHeight}px;
`;
const StyledTitle = styled.h4`
  color: white;
  margin-bottom: 10px;
  font-weight: ${theme.fontWeight.regular};
  &.narrow {
    margin-left: 10px;
  }
`;

const StyledQuestionnaireIframe = styled.iframe`
  width: 100%;
  height: calc(100% - 33px);
  outline: none;
  border: none;
  display: block;
  background-color: white;
  z-index: 17;
`;
