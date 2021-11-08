import { Coord } from 'constants/MapCoords';

export const sortWorksByDistance = (id: number, coordsArray: Coord[]): number[] => {
  const myCoord = coordsArray.filter(({ id }) => id === id)[0];
  const sortedCoordsArray = coordsArray.sort(
    (coord1, coord2) => calcSquaredDistance(myCoord, coord1) - calcSquaredDistance(myCoord, coord2),
  );
  const sortedId = sortedCoordsArray.map((coord) => coord.id);
  return sortedId;
};

const calcSquaredDistance = (coord1: Coord, coord2: Coord): number => {
  return Math.pow(coord1.x - coord2.x, 2) + Math.pow(coord1.y - coord2.y, 2);
};
