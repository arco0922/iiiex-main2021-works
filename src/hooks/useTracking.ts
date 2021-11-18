import { useEffect } from 'react';
import { useHistory } from 'react-router';

declare global {
  interface Window {
    gtag?: (key: string, trackingId: string, config: { page_path: string }) => void;
  }
}

export const useTracking = (trackingId: string | undefined): void => {
  const history = useHistory();
  const isProd = process.env.PHASE === 'production';

  useEffect(() => {
    const unlisten = history.listen((location) => {
      if (!isProd) {
        return;
      }
      if (!window.gtag) return;
      if (!trackingId) {
        // console.log('Tracking not enabled, as `trackingId` was not given and there is no `GA_MEASUREMENT_ID`.');
        return;
      }
      window.gtag('config', trackingId, { page_path: location.pathname });
    });
    return unlisten;
  }, [trackingId, history, isProd]);
};
