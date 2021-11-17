import { Device } from 'constants/WorksInfo';

export const convertDeviceString = (device: Device): string => {
  switch (device) {
    case 'PC':
      return 'PC';
    case 'SP':
      return 'スマホ・タブレット';
    case 'BOTH':
      return 'PC・スマホ・タブレット';
  }
};
