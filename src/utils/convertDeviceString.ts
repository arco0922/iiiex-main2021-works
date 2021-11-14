import { Device } from 'constants/WorksInfo';

export const convertDeviceString = (device: Device): string => {
  switch (device) {
    case 'PC':
      return 'PCのみ';
    case 'SP':
      return 'スマホのみ';
    case 'BOTH':
      return 'PC・スマホどちらも対応';
  }
};
