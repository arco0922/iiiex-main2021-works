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
  const l = worksInfoArr.length;
  const coords: Coord[] = worksInfoArr.map((works) => {
    return {
      id: works.id,
      x: Math.cos((2 * Math.PI * works.id) / l) * (particleRadius + arrangeRadius),
      y: Math.sin((2 * Math.PI * works.id) / l) * (particleRadius + arrangeRadius),
    };
  });
  return coords;
})(100, 450);

export const mapCoordsArr: MapCoords[] = [
  {
    modeId: 1,
    modeName: '文字コード順',
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
  },
  {
    modeId: 2,
    modeName: '順路',
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
  },
  {
    modeId: 3,
    modeName: '作品カテゴリ',
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
  },
  {
    modeId: 4,
    modeName: '対応デバイス',
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
  },
];
