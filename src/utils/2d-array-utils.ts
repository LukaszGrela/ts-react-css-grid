const MATCH_SIZE_PFX = /^\[(\d+),(\d+)(,([^\]]+))?\]/;

export const init = (
  width: number,
  height: number,
  values: string = '0'
): string => {
  const defaultValue = values || ' ';
  if (defaultValue.indexOf(']') !== -1) {
    throw new Error("Invalid Argument. Array can't be initialised with ']'");
  }
  return `[${width},${height},${defaultValue}]${Array.from(
    Array(width * height),
    () => defaultValue
  ).join('')}`;
};
export interface ICoords2D {
  x: number;
  y: number;
}
export const findFirstEmpty = (
  source: string,
  defaultValue?: string
): ICoords2D => {
  const match: RegExpMatchArray | null = source.match(MATCH_SIZE_PFX);
  if (match === null) {
    throw new Error('Invalid Argument. Missing size prefix.');
  }
  let array = source.substr(match[0].length);
  const values = defaultValue || match[4] || ' ';
  const i = array.indexOf(values);
  const width = parseInt(match[1], 10);
  console.log('findFirstEmpty', source, values, i);
  return {
    x: i % width,
    y: Math.floor(i / width),
  };
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

  array = array + Array.from(Array(width), () => values).join('');

  return `[${width},${height + 1},${values}]${array}`;
};

let test = init(3, 4, 'x');
console.log(test);
test = '[4,4,*]0123456789abcdef';
console.log(test);
console.log('removeColumn');
test = removeColumn(test);
console.log(test);
test = removeColumn(test);
console.log(test);
test = removeColumn(test);
console.log(test);
test = removeColumn(test);
console.log(test);
test = removeColumn(test);
console.log(test);
console.log('addRow');
test = addRow(test);
console.log(test);
test = addRow(test);
console.log(test);
test = addRow(test);
console.log(test);
console.log('change default value');
test = test.replace(
  MATCH_SIZE_PFX,
  ($0, $1, $2, $3, $4): string => `[${$1},${$2},x]`
);
console.log(test);
console.log('addColumn');
test = addColumn(test);
console.log(test);
test = addColumn(test);
console.log(test);
test = addColumn(test);
console.log(test);

console.log('removeRow');
// test = removeRow(test)
// console.log(test)
// test = removeRow(test)
// console.log(test)
// test = removeRow(test)
// console.log(test)
// test = removeRow(test)
// console.log(test)
// test = removeRow(test)
// console.log(test)
