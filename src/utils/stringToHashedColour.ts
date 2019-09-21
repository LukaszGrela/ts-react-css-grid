export const colours = [
  '#004D40',
  '#006064',
  '#0063B1',
  '#0078D7',
  '#009688',
  '#0099BC',
  '#00B294',
  '#00B7C3',
  '#00BCD4',
  '#00CC6A',
  '#01579B',
  '#018574',
  '#038387',
  '#03A9F4',
  '#0D47A1',
  '#107C10',
  '#10893E',
  '#1A237E',
  '#1B5E20',
  '#2196F3',
  '#311B92',
  '#3F51B5',
  '#498205',
  '#4A148C',
  '#4CAF50',
  '#607D8B',
  '#673AB7',
  '#881798',
  '#8BC34A',
  '#9A0089',
  '#9C27B0',
  '#BF0077',
  '#C30052',
  '#CDDC39',
  '#D13438',
  '#d50000',
  '#DA3B01',
  '#E3008C',
  '#E65100',
  '#E74856',
  '#E81123',
  '#E91E63',
  '#EA005E',
  '#f44336',
  '#F7630C',
  '#FF5722',
  '#FF8C00',
  '#FF9800',
  '#FFB900',
  '#FFC107',
  '#FFEB3B',
];
/**
 *  A fast string hashing function
 *  taken from from darkskyapp's string-hash https://github.com/darkskyapp/string-hash
 *  Bitwise operator and unary operator eslint setting disabled
 * @param {*} str
 * @returns number between 0 and 4294967295 (inclusive)
 */
export const stringHash = (str: string): number => {
  let hash = 5381;
  let i = str.length;

  while (i) {
    // eslint-disable-next-line
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  // eslint-disable-next-line no-bitwise
  return hash >>> 0;
};
/**
 *
 *
 * @param {*} str
 * @returns string hex colour from colours array
 */
export const stringToHashedColour = (str = 'luzask') => {
  const colorIndex = stringHash(str) % colours.length;
  return colours[colorIndex];
};
