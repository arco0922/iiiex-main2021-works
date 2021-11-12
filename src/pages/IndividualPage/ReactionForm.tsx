import styled from 'styled-components';
import React from 'react';
import { REACTIONFORM_URL } from 'constants/OutUrls';
import { worksInfoArr } from 'constants/WorksInfo';
import { debug } from 'console';

interface Props {
  worksId: number;
}
export const ReactionForm: React.VFC<Props> = ({ worksId }) => {
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
    <>
      <StyledFormWrapper isSent={isSent}>
        <StyledForm action={REACTIONFORM_URL} ref={formRef} method="post" target="dummyIframe">
          <StyledLabel>作者にひとこと</StyledLabel>
          <StyledTextArea name={worksInfo.formEntry} ref={textRef}></StyledTextArea>
          <StyledSubmitButton type="button" value="送信" onClick={submitForm}></StyledSubmitButton>
        </StyledForm>
        <StyledDummyIframe name="dummyIframe"></StyledDummyIframe>
      </StyledFormWrapper>
      <StyledSentMessage isSent={isSent}>送信されました</StyledSentMessage>
    </>
  );
};

interface StyledFormWrapperProps {
  isSent: boolean;
}

const StyledFormWrapper = styled.div<StyledFormWrapperProps>`
  display: ${({ isSent }) => (isSent ? 'none' : 'block')};
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  color: white;
`;

const StyledTextArea = styled.textarea``;

const StyledSubmitButton = styled.input`
  width: 80px;
  height: 40px;
  margin: 10px auto;
`;

const StyledDummyIframe = styled.iframe`
  display: none;
`;

interface StyledSentMessageProps {
  isSent: boolean;
}

const StyledSentMessage = styled.div<StyledSentMessageProps>`
  display: ${({ isSent }) => (isSent ? 'block' : 'none')};
  color: white;
`;
