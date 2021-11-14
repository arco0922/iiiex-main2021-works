import styled from 'styled-components';
import React from 'react';
import { REACTIONFORM_URL } from 'constants/OutUrls';
import { worksInfoArr } from 'constants/WorksInfo';
import { theme } from 'constants/Theme';

interface Props {
  worksId: number;
  isNarrowLayout: boolean;
}
export const ReactionForm: React.VFC<Props> = ({ worksId, isNarrowLayout }) => {
  const worksInfo = React.useMemo(() => worksInfoArr.filter((info) => info.id === worksId)[0], [worksId]);
  const [isSent, setIsSent] = React.useState<boolean>(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const textRef = React.useRef<HTMLTextAreaElement>(null);
  const submitForm = () => {
    if (formRef.current === null || textRef.current === null) {
      return;
    }
    formRef.current.submit();
    textRef.current.value = '';
    setIsSent(true);
  };
  React.useEffect(() => {
    setIsSent(false);
  }, [worksId]);

  return (
    <StyledContainer className={isNarrowLayout ? 'narrow' : ''}>
      <StyledTitle>この作品の感想</StyledTitle>
      <StyledFormWrapper isSent={isSent}>
        <StyledForm action={REACTIONFORM_URL} ref={formRef} method="post" target="dummyIframe">
          <StyledTextArea name={worksInfo.formEntry} ref={textRef}></StyledTextArea>
        </StyledForm>
        <StyledSubmitButton onClick={submitForm}>送信</StyledSubmitButton>
        <StyledDummyIframe name="dummyIframe" />
      </StyledFormWrapper>
      <StyledSentMessage isSent={isSent}>回答ありがとうございます</StyledSentMessage>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin: 15px 0px;
  width: 100%;
  &.narrow {
    padding: 0px 10px;
  }
`;

interface StyledFormWrapperProps {
  isSent: boolean;
}

const StyledFormWrapper = styled.div<StyledFormWrapperProps>`
  display: ${({ isSent }) => (isSent ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.h4`
  font-weight: ${theme.fontWeight.regular};
  color: white;
  margin-bottom: 10px;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTextArea = styled.textarea`
  height: 200px;
  width: 100%;
  padding: 10px;
  outline: none;
  border: none;
  resize: none;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const StyledSubmitButton = styled.button`
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: ${theme.color.green};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px 10px 20px;
  &:hover {
    cursor: pointer;
  }
  & > p {
    font-size: 16px;
    font-weight: ${theme.fontWeight.regular};
    margin-right: 5px;
  }
`;

const StyledDummyIframe = styled.iframe`
  display: none;
`;

interface StyledSentMessageProps {
  isSent: boolean;
}

const StyledSentMessage = styled.div<StyledSentMessageProps>`
  color: white;
  display: ${({ isSent }) => (isSent ? 'flex' : 'none')};
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: center;
`;
