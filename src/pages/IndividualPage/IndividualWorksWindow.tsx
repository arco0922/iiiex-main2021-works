import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';

interface Props {
  worksId: number;
}

export const IndividualWorksWindow: React.VFC<Props> = ({ worksId }) => {
  const worksInfo = React.useMemo(() => worksInfoArr.filter((info) => info.id === worksId)[0], [worksId]);

  return <div>{worksInfo.srcUrlPc && <iframe src={worksInfo.srcUrlPc}></iframe>}</div>;
};
