import { useTracking } from 'hooks/useTracking';
import React from 'react';

export const Tracker: React.VFC = () => {
  useTracking(process.env.UA_ID);
  useTracking(process.env.G_ID);
  return null;
};
