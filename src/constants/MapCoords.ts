import { rotationSortedWorksInfoArr } from 'utils/calcRotationUtils';
import { worksInfoArr } from './WorksInfo';

export type MapModeId = 1 | 2 | 3 | 4 | 5;

export interface Coord {
  id: number;
  x: number;
  y: number;
}

export interface MapCoords {
  modeId: MapModeId;
  modeName: string;
  coords: Coord[];
  center: {
    x: number;
    y: number;
  };
  border: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
  threshold: {
    dist: number;
  };
}

function random_gauss(min: number, max: number, skew: number) {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) num = random_gauss(min, max, skew); // resample between 0 and 1 if out of range
  num = Math.pow(num, skew); // Skew
  num *= max - min; // Stretch to fill range
  num += min; // offset to min
  return num;
}

/** 1直線の座標 */
const lineCoords = ((radius: number, margin: number) => {
  const sortedByTitle = Array.from(worksInfoArr).sort((works1, works2) => {
    return works1.title.toUpperCase() <= works2.title.toUpperCase() ? -1 : 1;
  });
  const l = sortedByTitle.length;
  const coords: Coord[] = sortedByTitle.map((works, index) => {
    return {
      id: works.id,
      x: ((2 * radius + margin) * (2 * index - l + 1)) / 2,
      y: 0,
    };
  });
  return coords;
})(100, 10);

/** 円形の座標 */
const circleCoords = ((particleRadius: number, arrangeRadius: number) => {
  const l = rotationSortedWorksInfoArr.length;
  const coords: Coord[] = rotationSortedWorksInfoArr.map((works) => {
    return {
      id: works.id,
      x: Math.cos(-(2 * Math.PI * works.rotationOrder) / l) * (particleRadius + arrangeRadius),
      y: Math.sin(-(2 * Math.PI * works.rotationOrder) / l) * (particleRadius + arrangeRadius),
    };
  });
  return coords;
})(100, 450);

// /** 扇形の座標 */
// const sectorCoords = ((particleRadius: number, arrangeRadius: number, sectorRadian: number) => {
//   const l = worksInfoArr.length;
//   const coords: Coord[] = worksInfoArr.map((works) => {
//     if (works.id == 0) {
//       return {
//         id: works.id,
//         x: 0,
//         y: 0,
//       };
//     } else if (works.id == 2) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 0) / 2 - (sectorRadian - 90) / 2)) *
//           (particleRadius + arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 0) / 2 - (sectorRadian - 90) / 2)) *
//           (particleRadius + arrangeRadius),
//       };
//     } else if (works.id == 5) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 1) / 2 - (sectorRadian - 90) / 2)) *
//           (particleRadius + arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 1) / 2 - (sectorRadian - 90) / 2)) *
//           (particleRadius + arrangeRadius),
//       };
//     } else if (works.id == 11) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 2) / 2 - (sectorRadian - 90) / 2)) *
//           (particleRadius + arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 2) / 2 - (sectorRadian - 90) / 2)) *
//           (particleRadius + arrangeRadius),
//       };
//     } else if (works.id == 1) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 0) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 0) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 3) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 1) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 1) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 4) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 2) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 2) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 6) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 3) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 3) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 7) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 4) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 4) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 8) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 5) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 5) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 9) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 6) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 6) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 10) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 7) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 7) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 12) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 8) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 8) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 13) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 9) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 9) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 9) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 9) / 9 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     }
//   });
//   return coords;
// })(100, 450, 120);

// /** 多面体潰した感じ */
// const projectionCoords = ((particleRadius: number, arrangeRadius: number, sectorRadian: number) => {
//   const l = worksInfoArr.length;
//   const coords: Coord[] = worksInfoArr.map((works) => {
//     if (works.id == 0) {
//       return {
//         id: works.id,
//         x: 0,
//         y: 0,
//       };
//     } else if (works.id == 2) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 0) / 3 - (sectorRadian - 90) / 2)) *
//           (particleRadius + arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 0) / 3 - (sectorRadian - 90) / 2)) *
//           (particleRadius + arrangeRadius),
//       };
//     } else if (works.id == 5) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 1) / 3 - (sectorRadian - 90) / 2)) *
//           (particleRadius + arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 1) / 3 - (sectorRadian - 90) / 2)) *
//           (particleRadius + arrangeRadius),
//       };
//     } else if (works.id == 11) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 2) / 3 - (sectorRadian - 90) / 2)) *
//           (particleRadius + arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 2) / 3 - (sectorRadian - 90) / 2)) *
//           (particleRadius + arrangeRadius),
//       };
//     } else if (works.id == 1) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 0) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 0) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 3) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 1) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 1) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 4) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 2) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 2) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 6) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 3) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 3) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 7) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 4) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 4) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 8) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 5) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 5) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 9) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 6) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 6) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 10) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 7) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 7) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 12) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 8) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 8) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else if (works.id == 13) {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 9) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 9) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     } else {
//       return {
//         id: works.id,
//         x:
//           Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 9) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//         y:
//           Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 9) / 10 - (sectorRadian - 90) / 2)) *
//           (particleRadius + 2 * arrangeRadius),
//       };
//     }
//   });
//   return coords;
// })(100, 250, 360);

/** neuralnetworkワロタ */
// const neuralCoords = ((particleRadius: number, arrangeRadius: number, sectorRadian: number) => {
//   const l = worksInfoArr.length;
//   const coords: Coord[] = worksInfoArr.map((works) => {
//     if (works.id == 0) {
//       return {
//         id: works.id,
//         x: -500,
//         y: 0,
//       };
//     } else if (works.id == 2) {
//       return {
//         id: works.id,
//         x: 500,
//         y: 500,
//       };
//     } else if (works.id == 5) {
//       return {
//         id: works.id,
//         x: 500,
//         y: 0,
//       };
//     } else if (works.id == 11) {
//       return {
//         id: works.id,
//         x: 500,
//         y: -500,
//       };
//     } else if (works.id == 1) {
//       return {
//         id: works.id,
//         x: 0,
//         y: 100,
//       };
//     } else if (works.id == 3) {
//       return {
//         id: works.id,
//         x: 0,
//         y: 300,
//       };
//     } else if (works.id == 4) {
//       return {
//         id: works.id,
//         x: 0,
//         y: 500,
//       };
//     } else if (works.id == 6) {
//       return {
//         id: works.id,
//         x: 0,
//         y: 700,
//       };
//     } else if (works.id == 7) {
//       return {
//         id: works.id,
//         x: 0,
//         y: 900,
//       };
//     } else if (works.id == 8) {
//       return {
//         id: works.id,
//         x: 0,
//         y: -100,
//       };
//     } else if (works.id == 9) {
//       return {
//         id: works.id,
//         x: 0,
//         y: -300,
//       };
//     } else if (works.id == 10) {
//       return {
//         id: works.id,
//         x: 0,
//         y: -500,
//       };
//     } else if (works.id == 12) {
//       return {
//         id: works.id,
//         x: 0,
//         y: -700,
//       };
//     } else if (works.id == 13) {
//       return {
//         id: works.id,
//         x: 0,
//         y: -900,
//       };
//     } else {
//       return {
//         id: works.id,
//         x: 0,
//         y: -900,
//       };
//     }
//   });
//   return coords;
// })(100, 450, 120);

/** miroのお絵描きから */
const miroCoords = ((particleRadius: number, arrangeRadius: number, sectorRadian: number) => {
  const l = worksInfoArr.length;
  const coords: Coord[] = worksInfoArr.map((works) => {
    if (works.id == 0) {
      return {
        id: works.id,
        x: -700,
        y: -700,
      };
    } else if (works.id == 2) {
      return {
        id: works.id,
        x: Math.cos((2 * Math.PI * 1) / 3 + Math.PI / 4) * (particleRadius + arrangeRadius / 2) + 750,
        y: Math.sin((2 * Math.PI * 1) / 3 + Math.PI / 4) * (particleRadius + arrangeRadius / 2) + 750,
      };
    } else if (works.id == 5) {
      return {
        id: works.id,
        x: Math.cos((2 * Math.PI * 2) / 3 + Math.PI / 4) * (particleRadius + arrangeRadius / 2) + 750,
        y: Math.sin((2 * Math.PI * 2) / 3 + Math.PI / 4) * (particleRadius + arrangeRadius / 2) + 750,
      };
    } else if (works.id == 11) {
      return {
        id: works.id,
        x: Math.cos((2 * Math.PI * 3) / 3 + Math.PI / 4) * (particleRadius + arrangeRadius / 2) + 750,
        y: Math.sin((2 * Math.PI * 3) / 3 + Math.PI / 4) * (particleRadius + arrangeRadius / 2) + 750,
      };
    } else if (works.id == 1) {
      return {
        id: works.id,
        x:
          Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 0) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
        y:
          Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 0) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
      };
    } else if (works.id == 3) {
      return {
        id: works.id,
        x:
          Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 1) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
        y:
          Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 1) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
      };
    } else if (works.id == 4) {
      return {
        id: works.id,
        x:
          Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 2) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
        y:
          Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 2) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
      };
    } else if (works.id == 6) {
      return {
        id: works.id,
        x:
          Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 3) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
        y:
          Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 3) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
      };
    } else if (works.id == 7) {
      return {
        id: works.id,
        x:
          Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 4) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
        y:
          Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 4) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
      };
    } else if (works.id == 8) {
      return {
        id: works.id,
        x:
          Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 5) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
        y:
          Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 5) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
      };
    } else if (works.id == 9) {
      return {
        id: works.id,
        x:
          Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 6) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
        y:
          Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 6) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
      };
    } else if (works.id == 10) {
      return {
        id: works.id,
        x:
          Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 7) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
        y:
          Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 7) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
      };
    } else if (works.id == 12) {
      return {
        id: works.id,
        x:
          Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 8) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
        y:
          Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 8) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
      };
    } else if (works.id == 13) {
      return {
        id: works.id,
        x:
          Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 9) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
        y:
          Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 9) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
      };
    } else {
      return {
        id: works.id,
        x:
          Math.cos(((2 * Math.PI) / 360) * ((sectorRadian * 9) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
        y:
          Math.sin(((2 * Math.PI) / 360) * ((sectorRadian * 9) / 10 - (sectorRadian - 90) / 2)) *
          (particleRadius + 2 * arrangeRadius),
      };
    }
  });
  return coords;
})(100, 200, 360);

// /** カテゴリの座標 */
// const categoryCoords = ((particleRadius: number, arrangeRadius: number, dist: number) => {
//   const l = worksInfoArr.length;
//   const coords: Coord[] = worksInfoArr.map((works) => {
//     if (works.id == 0) {
//       return {
//         id: works.id,
//         x: Math.cos(Math.PI / 6) * (particleRadius + arrangeRadius) + dist * 1,
//         y: Math.sin(Math.PI / 6) * (particleRadius + arrangeRadius) - dist * 1,
//       };
//     } else if (works.id == 1) {
//       return {
//         id: works.id,
//         x: Math.cos(Math.PI / 6) * (particleRadius + arrangeRadius) - dist * 1,
//         y: Math.sin(Math.PI / 6) * (particleRadius + arrangeRadius) + dist * 1,
//       };
//     } else if (works.id == 2) {
//       return {
//         id: works.id,
//         x: Math.cos(Math.PI / 2) * (particleRadius + arrangeRadius) + dist * 1,
//         y: Math.sin(Math.PI / 2) * (particleRadius + arrangeRadius) + dist * 1,
//       };
//     } else if (works.id == 3) {
//       return {
//         id: works.id,
//         x: Math.cos(Math.PI / 2) * (particleRadius + arrangeRadius) - dist * 1,
//         y: Math.sin(Math.PI / 2) * (particleRadius + arrangeRadius) - dist * 1,
//       };
//     } else if (works.id == 4) {
//       return {
//         id: works.id,
//         x: Math.cos(Math.PI / 2) * (particleRadius + arrangeRadius) + 2 * dist * 1,
//         y: Math.sin(Math.PI / 2) * (particleRadius + arrangeRadius) - 2 * dist * 1,
//       };
//     } else if (works.id == 5) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 5) / 6) * (particleRadius + arrangeRadius) - dist * 1,
//         y: Math.sin((Math.PI * 5) / 6) * (particleRadius + arrangeRadius) - dist * 1,
//       };
//     } else if (works.id == 6) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 5) / 6) * (particleRadius + arrangeRadius) + dist * 1,
//         y: Math.sin((Math.PI * 5) / 6) * (particleRadius + arrangeRadius) + dist * 1,
//       };
//     } else if (works.id == 7) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) + dist * 1,
//         y: Math.sin((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) + dist * 1,
//       };
//     } else if (works.id == 8) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) - dist * 1,
//         y: Math.sin((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) - dist * 1,
//       };
//     } else if (works.id == 9) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) - 2 * dist * 1,
//         y: Math.sin((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) + 2 * dist * 1,
//       };
//     } else if (works.id == 10) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 7) / 6) * (particleRadius + arrangeRadius) + dist * 1,
//         y: Math.sin((Math.PI * 7) / 6) * (particleRadius + arrangeRadius) - dist * 1,
//       };
//     } else if (works.id == 11) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 7) / 6) * (particleRadius + arrangeRadius) - dist * 1,
//         y: Math.sin((Math.PI * 7) / 6) * (particleRadius + arrangeRadius) + dist * 1,
//       };
//     } else if (works.id == 12) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 11) / 6) * (particleRadius + arrangeRadius) - dist * 1,
//         y: Math.sin((Math.PI * 11) / 6) * (particleRadius + arrangeRadius) - dist * 1,
//       };
//     } else if (works.id == 13) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 11) / 6) * (particleRadius + arrangeRadius) + dist * 1,
//         y: Math.sin((Math.PI * 11) / 6) * (particleRadius + arrangeRadius) + dist * 1,
//       };
//     } else {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 11) / 6) * (particleRadius + arrangeRadius) + dist * 1,
//         y: Math.sin((Math.PI * 11) / 6) * (particleRadius + arrangeRadius) - dist * 1,
//       };
//     }
//   });
//   return coords;
// })(100, 800, 100);

// /** カテゴリの座標 */
// const taeroCoords = ((particleRadius: number, arrangeRadius: number, dist: number, dist2: number, margin: number) => {
//   const l = worksInfoArr.length;
//   const coords: Coord[] = worksInfoArr.map((works) => {
//     if (works.id == 0) {
//       return {
//         id: works.id,
//         x: Math.cos(Math.PI / 6) * (particleRadius + arrangeRadius) - dist * 1 - margin,
//         y: Math.sin(Math.PI / 6) * (particleRadius + arrangeRadius) - dist * 1 - margin,
//       };
//     } else if (works.id == 1) {
//       return {
//         id: works.id,
//         x: Math.cos(Math.PI / 6) * (particleRadius + arrangeRadius) + dist * 1 + 60 - margin,
//         y: Math.sin(Math.PI / 6) * (particleRadius + arrangeRadius) + dist * 1 - 60 - margin,
//       };
//     } else if (works.id == 2) {
//       return {
//         id: works.id,
//         x: Math.cos(Math.PI / 2) * (particleRadius + arrangeRadius) + dist2 * 1,
//         y: Math.sin(Math.PI / 2) * (particleRadius + arrangeRadius) + dist2 * 1,
//       };
//     } else if (works.id == 3) {
//       return {
//         id: works.id,
//         x: Math.cos(Math.PI / 2) * (particleRadius + arrangeRadius) - dist2 * 1,
//         y: Math.sin(Math.PI / 2) * (particleRadius + arrangeRadius) - dist2 * 1,
//       };
//     } else if (works.id == 4) {
//       return {
//         id: works.id,
//         x: Math.cos(Math.PI / 2) * (particleRadius + arrangeRadius) + 2 * dist2 * 1,
//         y: Math.sin(Math.PI / 2) * (particleRadius + arrangeRadius) - 2 * dist2 * 1,
//       };
//     } else if (works.id == 5) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 5) / 6) * (particleRadius + arrangeRadius) + dist * 1,
//         y: Math.sin((Math.PI * 5) / 6) * (particleRadius + arrangeRadius) - dist * 1,
//       };
//     } else if (works.id == 6) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 5) / 6) * (particleRadius + arrangeRadius) - dist * 1,
//         y: Math.sin((Math.PI * 5) / 6) * (particleRadius + arrangeRadius) + dist * 1,
//       };
//     } else if (works.id == 7) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) + dist2 * 1,
//         y: Math.sin((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) + dist2 * 1,
//       };
//     } else if (works.id == 8) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) - dist2 * 1,
//         y: Math.sin((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) - dist2 * 1,
//       };
//     } else if (works.id == 9) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) - 2 * dist2 * 1,
//         y: Math.sin((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) + 2 * dist2 * 1,
//       };
//     } else if (works.id == 10) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 7) / 6) * (particleRadius + arrangeRadius) - dist * 1 - 60,
//         y: Math.sin((Math.PI * 7) / 6) * (particleRadius + arrangeRadius) - dist * 1 + 60,
//       };
//     } else if (works.id == 11) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 7) / 6) * (particleRadius + arrangeRadius) + dist * 1,
//         y: Math.sin((Math.PI * 7) / 6) * (particleRadius + arrangeRadius) + dist * 1,
//       };
//     } else if (works.id == 12) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 11) / 6) * (particleRadius + arrangeRadius) + dist * 1 - margin,
//         y: Math.sin((Math.PI * 11) / 6) * (particleRadius + arrangeRadius) - dist * 1 - margin,
//       };
//     } else if (works.id == 13) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 11) / 6) * (particleRadius + arrangeRadius) - dist * 1 - margin,
//         y: Math.sin((Math.PI * 11) / 6) * (particleRadius + arrangeRadius) + dist * 1 - margin,
//       };
//     } else {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 11) / 6) * (particleRadius + arrangeRadius) + dist * 1,
//         y: Math.sin((Math.PI * 11) / 6) * (particleRadius + arrangeRadius) - dist * 1,
//       };
//     }
//   });
//   return coords;
// })(100, 500, 100, 100, 50);

// /** カテゴリの座標 */
// const puyoCoords = ((particleRadius: number, arrangeRadius: number, dist: number, dist2: number, margin: number) => {
//   const l = worksInfoArr.length;
//   const coords: Coord[] = worksInfoArr.map((works) => {
//     if (works.id == 0) {
//       return {
//         id: works.id,
//         x: Math.cos(Math.PI / 6) * (particleRadius + arrangeRadius - dist),
//         y: Math.sin(Math.PI / 6) * (particleRadius + arrangeRadius - dist),
//       };
//     } else if (works.id == 1) {
//       return {
//         id: works.id,
//         x: Math.cos(Math.PI / 6) * (particleRadius + arrangeRadius + 2 * dist),
//         y: Math.sin(Math.PI / 6) * (particleRadius + arrangeRadius + 2 * dist),
//       };
//     } else if (works.id == 2) {
//       return {
//         id: works.id,
//         x: Math.cos(Math.PI / 2) * (particleRadius + arrangeRadius),
//         y: Math.sin(Math.PI / 2) * (particleRadius + arrangeRadius) - dist2 * 0.8,
//       };
//     } else if (works.id == 3) {
//       return {
//         id: works.id,
//         x: Math.cos(Math.PI / 2) * (particleRadius + arrangeRadius) - Math.sqrt(3) * dist2 * 0.8,
//         y: Math.sin(Math.PI / 2) * (particleRadius + arrangeRadius) + 2 * dist2 * 0.8,
//       };
//     } else if (works.id == 4) {
//       return {
//         id: works.id,
//         x: Math.cos(Math.PI / 2) * (particleRadius + arrangeRadius) + Math.sqrt(3) * dist2 * 0.8,
//         y: Math.sin(Math.PI / 2) * (particleRadius + arrangeRadius) + 2 * dist2 * 0.8,
//       };
//     } else if (works.id == 5) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 5) / 6) * (particleRadius + arrangeRadius + 2 * dist),
//         y: Math.sin((Math.PI * 5) / 6) * (particleRadius + arrangeRadius + 2 * dist),
//       };
//     } else if (works.id == 6) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 5) / 6) * (particleRadius + arrangeRadius - dist),
//         y: Math.sin((Math.PI * 5) / 6) * (particleRadius + arrangeRadius - dist),
//       };
//     } else if (works.id == 7) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 3) / 2) * (particleRadius + arrangeRadius),
//         y: Math.sin((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) + dist2 * 0.8,
//       };
//     } else if (works.id == 8) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) - Math.sqrt(3) * dist2 * 0.8,
//         y: Math.sin((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) - 2 * dist2 * 0.8,
//       };
//     } else if (works.id == 9) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) + Math.sqrt(3) * dist2 * 0.8,
//         y: Math.sin((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) - 2 * dist2 * 0.8,
//       };
//     } else if (works.id == 10) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 7) / 6) * (particleRadius + arrangeRadius - dist),
//         y: Math.sin((Math.PI * 7) / 6) * (particleRadius + arrangeRadius - dist),
//       };
//     } else if (works.id == 11) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 7) / 6) * (particleRadius + arrangeRadius + 2 * dist),
//         y: Math.sin((Math.PI * 7) / 6) * (particleRadius + arrangeRadius + 2 * dist),
//       };
//     } else if (works.id == 12) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 11) / 6) * (particleRadius + arrangeRadius + 2 * dist),
//         y: Math.sin((Math.PI * 11) / 6) * (particleRadius + arrangeRadius + 2 * dist),
//       };
//     } else if (works.id == 13) {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 11) / 6) * (particleRadius + arrangeRadius - dist),
//         y: Math.sin((Math.PI * 11) / 6) * (particleRadius + arrangeRadius - dist),
//       };
//     } else {
//       return {
//         id: works.id,
//         x: Math.cos((Math.PI * 11) / 6) * (particleRadius + arrangeRadius),
//         y: Math.sin((Math.PI * 11) / 6) * (particleRadius + arrangeRadius),
//       };
//     }
//   });
//   return coords;
// })(100, 400, 100, 100, 50);

/** 飛行機の座標 */
const airplaneCoords = ((
  dist: number,
  arrange_dist: number,
  margin: number,
  arrange_dist2: number,
  margin2: number,
) => {
  const l = worksInfoArr.length;
  const coords: Coord[] = worksInfoArr.map((works) => {
    if (works.id == 0) {
      return {
        id: works.id,
        x: dist,
        y: -dist,
      };
    } else if (works.id == 1) {
      return {
        id: works.id,
        x: -dist + margin2 - arrange_dist2,
        y: +dist + margin2 - arrange_dist2,
      };
    } else if (works.id == 2) {
      return {
        id: works.id,
        x: +margin - arrange_dist,
        y: +margin - arrange_dist,
      };
    } else if (works.id == 3) {
      return {
        id: works.id,
        x: -dist + margin2 * 2 - arrange_dist2,
        y: +dist + margin2 * 2 - arrange_dist2,
      };
    } else if (works.id == 4) {
      return {
        id: works.id,
        x: -dist - margin2 + arrange_dist2,
        y: +dist - margin2 + arrange_dist2,
      };
    } else if (works.id == 5) {
      return {
        id: works.id,
        x: -dist * 2,
        y: dist * 2,
      };
    } else if (works.id == 6) {
      return {
        id: works.id,
        x: +margin * 2 - arrange_dist,
        y: +margin * 2 - arrange_dist,
      };
    } else if (works.id == 7) {
      return {
        id: works.id,
        x: +margin * 3 - arrange_dist,
        y: +margin * 3 - arrange_dist,
      };
    } else if (works.id == 8) {
      return {
        id: works.id,
        x: +margin * 4 - arrange_dist,
        y: +margin * 4 - arrange_dist,
      };
    } else if (works.id == 9) {
      return {
        id: works.id,
        x: -dist - margin2 * 2 + arrange_dist2,
        y: +dist - margin2 * 2 + arrange_dist2,
      };
    } else if (works.id == 10) {
      return {
        id: works.id,
        x: -margin + arrange_dist,
        y: -margin + arrange_dist,
      };
    } else if (works.id == 11) {
      return {
        id: works.id,
        x: -margin * 2 + arrange_dist,
        y: -margin * 2 + arrange_dist,
      };
    } else if (works.id == 12) {
      return {
        id: works.id,
        x: -margin * 3 + arrange_dist,
        y: -margin * 3 + arrange_dist,
      };
    } else if (works.id == 13) {
      return {
        id: works.id,
        x: -margin * 4 + arrange_dist,
        y: -margin * 4 + arrange_dist,
      };
    } else {
      return {
        id: works.id,
        x: +margin * 4,
        y: +margin * 4,
      };
    }
  });
  return coords;
})(400, 100, 200, 120, 240);

// /** クッパクラウン */
// const kuppaCoords = ((particleRadius: number, arrangeRadius: number, dist: number, rectangle_dist: number) => {
//   const l = worksInfoArr.length;
//   const coords: Coord[] = worksInfoArr.map((works) => {
//     if (works.id == 0) {
//       return {
//         id: works.id,
//         x: dist,
//         y: -dist,
//       };
//     } else if (works.id == 1) {
//       return {
//         id: works.id,
//         x: rectangle_dist,
//         y: 0,
//       };
//     } else if (works.id == 2) {
//       return {
//         id: works.id,
//         x: Math.cos(((2 * Math.PI) / 360) * (20 * 1)) * (particleRadius + arrangeRadius),
//         y: Math.sin(((2 * Math.PI) / 360) * (20 * 1)) * (particleRadius + arrangeRadius),
//       };
//     } else if (works.id == 3) {
//       return {
//         id: works.id,
//         x: 0,
//         y: rectangle_dist,
//       };
//     } else if (works.id == 4) {
//       return {
//         id: works.id,
//         x: 0,
//         y: -rectangle_dist,
//       };
//     } else if (works.id == 5) {
//       return {
//         id: works.id,
//         x: -dist,
//         y: -dist,
//       };
//     } else if (works.id == 6) {
//       return {
//         id: works.id,
//         x: Math.cos(((2 * Math.PI) / 360) * (20 * 2)) * (particleRadius + arrangeRadius),
//         y: Math.sin(((2 * Math.PI) / 360) * (20 * 2)) * (particleRadius + arrangeRadius),
//       };
//     } else if (works.id == 7) {
//       return {
//         id: works.id,
//         x: Math.cos(((2 * Math.PI) / 360) * (20 * 3)) * (particleRadius + arrangeRadius),
//         y: Math.sin(((2 * Math.PI) / 360) * (20 * 3)) * (particleRadius + arrangeRadius),
//       };
//     } else if (works.id == 8) {
//       return {
//         id: works.id,
//         x: Math.cos(((2 * Math.PI) / 360) * (20 * 4)) * (particleRadius + arrangeRadius),
//         y: Math.sin(((2 * Math.PI) / 360) * (20 * 4)) * (particleRadius + arrangeRadius),
//       };
//     } else if (works.id == 9) {
//       return {
//         id: works.id,
//         x: -rectangle_dist,
//         y: 0,
//       };
//     } else if (works.id == 10) {
//       return {
//         id: works.id,
//         x: Math.cos(((2 * Math.PI) / 360) * (20 * 5)) * (particleRadius + arrangeRadius),
//         y: Math.sin(((2 * Math.PI) / 360) * (20 * 5)) * (particleRadius + arrangeRadius),
//       };
//     } else if (works.id == 11) {
//       return {
//         id: works.id,
//         x: Math.cos(((2 * Math.PI) / 360) * (20 * 6)) * (particleRadius + arrangeRadius),
//         y: Math.sin(((2 * Math.PI) / 360) * (20 * 6)) * (particleRadius + arrangeRadius),
//       };
//     } else if (works.id == 12) {
//       return {
//         id: works.id,
//         x: Math.cos(((2 * Math.PI) / 360) * (20 * 7)) * (particleRadius + arrangeRadius),
//         y: Math.sin(((2 * Math.PI) / 360) * (20 * 7)) * (particleRadius + arrangeRadius),
//       };
//     } else if (works.id == 13) {
//       return {
//         id: works.id,
//         x: Math.cos(((2 * Math.PI) / 360) * (20 * 8)) * (particleRadius + arrangeRadius),
//         y: Math.sin(((2 * Math.PI) / 360) * (20 * 8)) * (particleRadius + arrangeRadius),
//       };
//     } else {
//       return {
//         id: works.id,
//         x: Math.cos(((2 * Math.PI) / 360) * (20 * 9)) * (particleRadius + arrangeRadius),
//         y: Math.sin(((2 * Math.PI) / 360) * (20 * 9)) * (particleRadius + arrangeRadius),
//       };
//     }
//   });
//   return coords;
// })(100, 800, 500, 200);

/** 新井案 */
const araiCoords = ((particleRadius: number, arrangeRadius: number, dist: number, margin: number) => {
  const l = worksInfoArr.length;
  const coords: Coord[] = worksInfoArr.map((works) => {
    if (works.id == 0) {
      return {
        id: works.id,
        x: Math.cos(Math.PI / 6) * (particleRadius + arrangeRadius),
        y: Math.sin(Math.PI / 6) * (particleRadius + arrangeRadius),
      };
    } else if (works.id == 1) {
      return {
        id: works.id,
        x: Math.cos(Math.PI / 6) * (particleRadius + arrangeRadius) + margin,
        y: Math.sin(Math.PI / 6) * (particleRadius + arrangeRadius),
      };
    } else if (works.id == 2) {
      return {
        id: works.id,
        x: Math.cos(Math.PI / 2) * (particleRadius + arrangeRadius),
        y: Math.sin(Math.PI / 2) * (particleRadius + arrangeRadius),
      };
    } else if (works.id == 3) {
      return {
        id: works.id,
        x: Math.cos(Math.PI / 2) * (particleRadius + arrangeRadius) + Math.cos((Math.PI * 1) / 6) * margin,
        y: Math.sin(Math.PI / 2) * (particleRadius + arrangeRadius) + Math.sin((Math.PI * 1) / 6) * margin,
      };
    } else if (works.id == 4) {
      return {
        id: works.id,
        x: Math.cos(Math.PI / 2) * (particleRadius + arrangeRadius) + Math.cos((Math.PI * 1) / 2) * margin,
        y: Math.sin(Math.PI / 2) * (particleRadius + arrangeRadius) + Math.sin((Math.PI * 1) / 2) * margin,
      };
    } else if (works.id == 5) {
      return {
        id: works.id,
        x: Math.cos((Math.PI * 5) / 6) * (particleRadius + arrangeRadius),
        y: Math.sin((Math.PI * 5) / 6) * (particleRadius + arrangeRadius),
      };
    } else if (works.id == 6) {
      return {
        id: works.id,
        x: Math.cos((Math.PI * 5) / 6) * (particleRadius + arrangeRadius) + Math.cos((Math.PI * 3) / 4) * margin,
        y: Math.sin((Math.PI * 5) / 6) * (particleRadius + arrangeRadius) + Math.sin((Math.PI * 3) / 4) * margin,
      };
    } else if (works.id == 7) {
      return {
        id: works.id,
        x: Math.cos((Math.PI * 3) / 2) * (particleRadius + arrangeRadius),
        y: Math.sin((Math.PI * 3) / 2) * (particleRadius + arrangeRadius),
      };
    } else if (works.id == 8) {
      return {
        id: works.id,
        x: Math.cos((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) + Math.cos((Math.PI * 7) / 6) * margin,
        y: Math.sin((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) + Math.sin((Math.PI * 7) / 6) * margin,
      };
    } else if (works.id == 9) {
      return {
        id: works.id,
        x: Math.cos((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) + Math.cos((Math.PI * 3) / 2) * margin,
        y: Math.sin((Math.PI * 3) / 2) * (particleRadius + arrangeRadius) + Math.sin((Math.PI * 3) / 2) * margin,
      };
    } else if (works.id == 10) {
      return {
        id: works.id,
        x: Math.cos((Math.PI * 7) / 6) * (particleRadius + arrangeRadius),
        y: Math.sin((Math.PI * 7) / 6) * (particleRadius + arrangeRadius),
      };
    } else if (works.id == 11) {
      return {
        id: works.id,
        x: Math.cos((Math.PI * 7) / 6) * (particleRadius + arrangeRadius) - margin,
        y: Math.sin((Math.PI * 7) / 6) * (particleRadius + arrangeRadius),
      };
    } else if (works.id == 12) {
      return {
        id: works.id,
        x: Math.cos((Math.PI * 11) / 6) * (particleRadius + arrangeRadius),
        y: Math.sin((Math.PI * 11) / 6) * (particleRadius + arrangeRadius),
      };
    } else if (works.id == 13) {
      return {
        id: works.id,
        x: Math.cos((Math.PI * 11) / 6) * (particleRadius + arrangeRadius) + Math.cos((Math.PI * 7) / 4) * margin,
        y: Math.sin((Math.PI * 11) / 6) * (particleRadius + arrangeRadius) + Math.sin((Math.PI * 7) / 4) * margin,
      };
    } else {
      return {
        id: works.id,
        x: Math.cos((Math.PI * 11) / 6) * (particleRadius + arrangeRadius),
        y: Math.sin((Math.PI * 11) / 6) * (particleRadius + arrangeRadius),
      };
    }
  });
  return coords;
})(100, 300, 100, 300);

export const mapCoordsArr: MapCoords[] = [
  {
    modeId: 1,
    modeName: 'おすすめ順路',
    coords: circleCoords,
    center: {
      x: 0,
      y: 0,
    },
    border: {
      minX: -800,
      maxX: 800,
      minY: -800,
      maxY: 800,
    },
    threshold: {
      dist: 400,
    },
  },
  {
    modeId: 2,
    modeName: '対応デバイス',
    coords: miroCoords,
    center: {
      x: 100,
      y: 100,
    },
    border: {
      minX: -1000,
      maxX: 1000,
      minY: -1200,
      maxY: 1200,
    },
    threshold: {
      dist: 450,
    },
  },
  {
    modeId: 3,
    modeName: '制作者の所属',
    coords: airplaneCoords,
    center: {
      x: -60,
      y: 60,
    },
    border: {
      minX: -1000,
      maxX: 1000,
      minY: -1200,
      maxY: 1200,
    },
    threshold: {
      dist: 450,
    },
  },
  {
    modeId: 4,
    modeName: '作品の題材',
    coords: araiCoords,
    center: {
      x: 0,
      y: 0,
    },
    border: {
      minX: -1000,
      maxX: 1000,
      minY: -1000,
      maxY: 1000,
    },
    threshold: {
      dist: 320,
    },
  },
  {
    modeId: 5,
    modeName: '作品名',
    coords: lineCoords,
    center: {
      x: 0,
      y: 0,
    },
    border: {
      minX: -1500,
      maxX: 1500,
      minY: -50,
      maxY: 50,
    },
    threshold: {
      dist: 300,
    },
  },
  // {
  //   modeId: 5,
  //   modeName: 'カテゴリ2',
  //   coords: puyoCoords,
  //   center: {
  //     x: 0,
  //     y: 0,
  //   },
  //   border: {
  //     minX: -1000,
  //     maxX: 1000,
  //     minY: -1000,
  //     maxY: 1000,
  //   },
  //   threshold: {
  //     dist: 320,
  //   },
  // },

  // {
  //   modeId: 7,
  //   modeName: '所属２',
  //   coords: kuppaCoords,
  //   center: {
  //     x: 0,
  //     y: 100,
  //   },
  //   border: {
  //     minX: -1000,
  //     maxX: 1000,
  //     minY: -1000,
  //     maxY: 1000,
  //   },
  //   threshold: {
  //     dist: 500,
  //   },
  // },
  // {
  //   modeId: 8,
  //   modeName: '多面体射影',
  //   coords: projectionCoords,
  //   center: {
  //     x: 0,
  //     y: 0,
  //   },
  //   border: {
  //     minX: -800,
  //     maxX: 800,
  //     minY: -800,
  //     maxY: 800,
  //   },
  //   threshold: {
  //     dist: 450,
  //   },
  // },
  // {
  //   modeId: 9,
  //   modeName: '対応デバイス2',
  //   coords: sectorCoords,
  //   center: {
  //     x: 200,
  //     y: 200,
  //   },
  //   border: {
  //     minX: -800,
  //     maxX: 800,
  //     minY: -800,
  //     maxY: 800,
  //   },
  // },
  // {
  //   modeId: 10,
  //   modeName: '対応デバイス3',
  //   coords: neuralCoords,
  //   center: {
  //     x: 100,
  //     y: 0,
  //   },
  //   border: {
  //     minX: -800,
  //     maxX: 800,
  //     minY: -1200,
  //     maxY: 1200,
  //   },
  // },
  // {
  //   modeId: 11,
  //   modeName: 'カテゴリ3',
  //   coords: categoryCoords,
  //   center: {
  //     x: 0,
  //     y: 0,
  //   },
  //   border: {
  //     minX: -1000,
  //     maxX: 1000,
  //     minY: -1000,
  //     maxY: 1000,
  //   },
  // },
  // {
  //   modeId: 12,
  //   modeName: 'カテゴリ4',
  //   coords: taeroCoords,
  //   center: {
  //     x: 0,
  //     y: 0,
  //   },
  //   border: {
  //     minX: -1000,
  //     maxX: 1000,
  //     minY: -1000,
  //     maxY: 1000,
  //   },
  // },
];
