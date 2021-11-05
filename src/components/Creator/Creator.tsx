import React from 'react';

interface Props {
  creatorText: {
    name: string;
    affiliation: string;
  }[];
}

export const Creator = React.memo(function Creator({ creatorText }: Props) {
  return (
    <p>
      {creatorText.map((creator) => {
        /*  <>
            creator.name <br />
          </> */
        {
          creator.affiliation.split(/(\n)/).map((item, index) => {
            return (
              <React.Fragment key={index}>
                creator.name <br />
                {item.match(/\n/) ? <br /> : item}
              </React.Fragment>
            );
          });
        }
      })}
    </p>
  );
});

/* export const Creator = React.memo(function Creator({ creatorText }: Props) {
  return (
    <p>
      {creatorText.map((creator) => {
        <React.Fragment>
          creator.name <br />
        </React.Fragment>;
        {
          creator.affiliation.split(/(\n)/).map((item, index) => {
            return <React.Fragment key={index}>{item.match(/\n/) ? <br /> : item}</React.Fragment>;
          });
        }
      })}
    </p>
  );
});
 */
