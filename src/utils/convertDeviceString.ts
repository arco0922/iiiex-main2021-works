import { Device } from 'constants/WorksInfo';

export const convertDeviceString = (device: Device): string => {
  switch (device) {
    case 'PC':
      return 'PC 対応';
    case 'SP':
      return 'スマホ・タブレット 対応';
    case 'BOTH':
      return 'PC・スマホ・タブレット 対応';
  }
};
