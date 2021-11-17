import { WorksInfo, worksInfoArr } from 'constants/WorksInfo';
import { rotateArray } from './rotateArray';

export const rotationSortedWorksInfoArr = worksInfoArr
  .slice()
  .sort((works1, works2) => works1.rotationOrder - works2.rotationOrder);
const rotationLength = rotationSortedWorksInfoArr.length;

export const calcNextRotationOrderWorksId = (id: number): number | null => {
  const idx = rotationSortedWorksInfoArr.findIndex((worksInfo) => worksInfo.id === id);
  if (idx < 0) {
    return null;
  }
  return rotationSortedWorksInfoArr[(idx + 1) % rotationLength].id;
};

export const calcRotatedOrderWorksFromSpecificId = (id: number): WorksInfo[] => {
  const idx = rotationSortedWorksInfoArr.findIndex((worksInfo) => worksInfo.id === id);
  if (idx < 0) {
    return rotationSortedWorksInfoArr;
  }
  return rotateArray(rotationSortedWorksInfoArr, idx);
};
