import React from 'react';
import img from 'assets/images/sample.png';

export const AppRoot: React.VFC = () => {
  return (
    <div>
      <p>Hello</p>
      <img src={img}></img>
    </div>
  );
};
