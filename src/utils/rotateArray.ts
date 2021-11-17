export const rotateArray = <P>(array: P[], offset: number): P[] => {
  const copyArr = array.slice();
  for (let i = 0; i < offset; i++) {
    const firstElem = copyArr.shift() as P;
    copyArr.push(firstElem);
  }
  return copyArr;
};
