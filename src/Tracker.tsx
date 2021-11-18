import { useTracking } from 'hooks/useTracking';
import React from 'react';
import { useLocation } from 'react-router';

export const Tracker: React.VFC = () => {
  const isProd = process.env.PHASE === 'production';
  const UA_ID = process.env.UA_ID;
  const G_ID = process.env.G_ID;
  const location = useLocation();

  useTracking(UA_ID);
  useTracking(G_ID);
  React.useEffect(() => {
    if (!isProd) {
      return;
    }
    if (!window.gtag) return;
    if (!UA_ID || !G_ID) {
      return;
    }
    window.gtag('config', UA_ID, { page_path: location.pathname });
    window.gtag('config', G_ID, { page_path: location.pathname });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
