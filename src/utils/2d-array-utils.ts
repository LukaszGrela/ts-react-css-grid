/**
 * Implement 2D array with a use 1d string
 */
const MATCH_SIZE_PFX = /^\[(\d+),(\d+)(,([^\]]+))?\]/;

const initValues = (
  width: number,
  height: number,
  values: string = '0'
): string => {
  if (values.indexOf(']') !== -1) {
    throw new Error("Invalid Argument. Array can't be initialised with ']'");
  }
  // console.log(
  //   'initValues',
  //   width,
  //   height,
  //   values,
  //   Array.from(Array(width * height), () => values).join('')
  // );
  return Array.from(Array(width * height), () => values).join('');
};

export const init = (
  width: number,
  height: number,
  values: string = '0'
): string => {
  if (values.indexOf(']') !== -1) {
    throw new Error("Invalid Argument. Array can't be initialised with ']'");
  }
  return `[${width},${height},${values}]${initValues(width, height, values)}`;
};
export interface ICoords2D {
  x: number;
  y: number;
}
export const findFirst = (
  source: string,
  defaultValue?: string
): ICoords2D | null => {
  const match: RegExpMatchArray | null = source.match(MATCH_SIZE_PFX);
  if (match === null) {
    throw new Error('Invalid Argument. Missing size prefix.');
  }
  let array = source.substr(match[0].length);
  const values = defaultValue || match[4] || ' ';
  const i = array.indexOf(values);
  if (i === -1) {
    return null;
  }
  const width = parseInt(match[1], 10);
  // console.log('findFirst', source, values, i);
  return {
    x: i % width,
    y: Math.floor(i / width),
  };
};

export const getSize = (source: string): ICoords2D => {
  const match: RegExpMatchArray | null = source.match(MATCH_SIZE_PFX);
  if (match === null) {
    throw new Error('Invalid Argument. Missing size prefix.');
  }

  let width = parseInt(match[1], 10);
  let height = parseInt(match[2], 10);

  if (width <= 0) {
    height = 0;
  }
  if (height <= 0) {
    width = 0;
  }

  return { x: width, y: height };
};

export const contains = (
  source: string,
  x: number,
  y: number,
  cols: number,
  rows: number
): boolean => {
  const size: ICoords2D = getSize(source);

  if (x < 0) return false;
  if (y < 0) return false;
  if (cols === 0 || rows === 0) return false;
  if (y > size.y - 1 || y + rows > size.y) return false;
  if (x > size.x - 1 || x + cols > size.x) return false;

  return true;
};

export const set = (
  source: string,
  coords: ICoords2D,
  newValue?: string
): string => {
  const match: RegExpMatchArray | null = source.match(MATCH_SIZE_PFX);
  if (match === null) {
    throw new Error('Invalid Argument. Missing size prefix.');
  }

  const width = parseInt(match[1], 10);
  let height = parseInt(match[2], 10);

  if (coords.x < 0 || coords.x > width - 1) {
    throw new Error('Out of Bounds.');
  }

  if (coords.y < 0 || coords.y > height - 1) {
    throw new Error('Out of Bounds.');
  }

  let array = source.substr(match[0].length);
  const values = match[4] || ' ';

  const i = coords.x + width * coords.y;

  return `[${width},${height},${values}]${array.substring(0, i)}${newValue ||
    values}${array.substring(i + 1)}`;
};

export const setBox = (
  source: string,
  x: number,
  y: number,
  cols: number,
  rows: number,
  newValue?: string
): string => {
  // console.log(
  //   'Array2dUtils.setBox\n',
  //   `source=${source},\nx:${x}, y:${y}, cols:${cols}, rows:${rows},\n${newValue}`
  // );
  const match: RegExpMatchArray | null = source.match(MATCH_SIZE_PFX);
  if (match === null) {
    throw new Error('Invalid Argument. Missing size prefix.');
  }

  const width = parseInt(match[1], 10);
  let height = parseInt(match[2], 10);

  if (x < 0 || x > width - 1) {
    throw new Error('Out of Bounds.');
  }

  if (y < 0 || y > height - 1) {
    throw new Error('Out of Bounds.');
  }

  if (x + cols > width) {
    throw new Error('Out of Bounds.');
  }
  if (y + rows > height) {
    throw new Error('Out of Bounds.');
  }

  let array = source.substr(match[0].length);
  const values = match[4] || ' ';

  for (let r = y; r < y + rows; r++) {
    const i = x + width * r;
    // console.log(r, i, cols);
    array =
      array.substring(0, i) +
      initValues(cols, 1, newValue || values) +
      array.substring(i + cols);
  }
  // console.log(source.substr(match[0].length));
  // console.log(array);
  return `[${width},${height},${values}]${array}`;
};

export const get = (source: string, coords: ICoords2D): string => {
  const match: RegExpMatchArray | null = source.match(MATCH_SIZE_PFX);
  if (match === null) {
    throw new Error('Invalid Argument. Missing size prefix.');
  }

  const width = parseInt(match[1], 10);
  let height = parseInt(match[2], 10);

  if (coords.x < 0 || coords.x > width - 1) {
    throw new Error('Out of Bounds.');
  }

  if (coords.y < 0 || coords.y > height - 1) {
    throw new Error('Out of Bounds.');
  }

  let array = source.substr(match[0].length);
  const i = coords.x + width * coords.y;

  return array.charAt(i);
};

export const removeColumn = (source: string): string => {
  const match: RegExpMatchArray | null = source.match(MATCH_SIZE_PFX);
  if (match === null) {
    throw new Error('Invalid Argument. Missing size prefix.');
  }
  const width = parseInt(match[1], 10);
  if (width <= 0) {
    return source;
  }
  let height = parseInt(match[2], 10);
  const values = match[4] || ' ';
  let array = source.substr(match[0].length);

  let n = height;
  let i: number;
  while (n > 0) {
    i = n * width - 1;
    array = array.substring(0, i) + array.substring(i + 1);
    n--;
  }
  if (width - 1 === 0) {
    height = 0;
  }
  return `[${width - 1},${height},${values}]${array}`;
};

export const addColumn = (source: string): string => {
  const match: RegExpMatchArray | null = source.match(MATCH_SIZE_PFX);
  if (match === null) {
    throw new Error('Invalid Argument. Missing size prefix.');
  }
  const width = parseInt(match[1], 10);
  let height = parseInt(match[2], 10);
  const values = match[4] || ' ';
  if (width === 0) return `[${1},${1},${values}]${values}`;
  let array = source.substr(match[0].length);

  let n = array.length;
  while (n > 0) {
    if (n % width === 0) {
      array = array.substr(0, n) + values + array.substr(n);
    }
    n--;
  }
  if (width + 1 === 1) {
    height = 1;
  }
  return `[${width + 1},${height},${values}]${array}`;
};

export const removeRow = (source: string): string => {
  const match: RegExpMatchArray | null = source.match(MATCH_SIZE_PFX);
  if (match === null) {
    throw new Error('Invalid Argument. Missing size prefix.');
  }
  let width = parseInt(match[1], 10);
  const height = parseInt(match[2], 10);
  if (height <= 0) {
    return source;
  }
  const values = match[4] || ' ';
  let array = source.substr(match[0].length);

  array = array.substring(0, array.length - width);
  if (height - 1 === 0) width = 0;
  return `[${width},${height - 1},${values}]${array}`;
};

export const addRow = (source: string): string => {
  const match: RegExpMatchArray | null = source.match(MATCH_SIZE_PFX);
  if (match === null) {
    throw new Error('Invalid Argument. Missing size prefix.');
  }
  let width = parseInt(match[1], 10);
  const height = parseInt(match[2], 10);
  const values = match[4] || ' ';
  let array = source.substr(match[0].length);

  if (height + 1 === 1) {
    width = 1;
  }

  array = array + initValues(width, 1, values);

  return `[${width},${height + 1},${values}]${array}`;
};
