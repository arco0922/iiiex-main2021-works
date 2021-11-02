import React from 'react';

interface Props {
  captionText: string;
}

export const Caption = React.memo(function Caption({ captionText }: Props) {
  return (
    <p>
      {captionText.split(/(\n)/).map((item, index) => {
        return <React.Fragment key={index}>{item.match(/\n/) ? <br /> : item}</React.Fragment>;
      })}
    </p>
  );
});
