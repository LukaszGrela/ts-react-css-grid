import * as Array2dUtils from './2d-array-utils';

describe('Initialise array', () => {
  it('should init 1x1 array initialised with a default (0)', () => {
    const source = Array2dUtils.init(1, 1);

    expect(source).toEqual('[1,1,0]0');
  });
  it('should init 1x1 array initialised with a default (0)) on undefined', () => {
    const source = Array2dUtils.init(1, 1, undefined);

    expect(source).toEqual('[1,1,0]0');
  });
  it('should init 1x1 array initialised with a custom value (*)', () => {
    const source = Array2dUtils.init(1, 1, '*');

    expect(source).toEqual('[1,1,*]*');
  });
  it('should init 5x5 array initialised with a custom value (*)', () => {
    const source = Array2dUtils.init(5, 5, '*');

    expect(source).toEqual('[5,5,*]*************************');
  });
  it("should fail if initializer contains ']'", () => {
    expect(() => {
      Array2dUtils.init(1, 1, ']');
    }).toThrow("Invalid Argument. Array can't be initialised with ']'");
  });
});

describe('modification of array', () => {
  let source: string;
  beforeEach(() => {
    source = Array2dUtils.init(5, 5, '*');
  });
  it('addColumn should work', () => {
    expect(() => {
      Array2dUtils.addColumn('****');
    }).toThrow('Invalid Argument. Missing size prefix.');
    let updated = Array2dUtils.addColumn(source);
    expect(updated).toEqual('[6,5,*]******************************');
    updated = Array2dUtils.addColumn('[2,2,x]****');
    expect(updated).toEqual('[3,2,x]**x**x');
  });
  it('removeColumn should work', () => {
    expect(() => {
      Array2dUtils.removeColumn('****');
    }).toThrow('Invalid Argument. Missing size prefix.');
    let updated = Array2dUtils.removeColumn(source);
    expect(updated).toEqual('[4,5,*]********************');
    updated = Array2dUtils.removeColumn('[2,2,x]****');
    expect(updated).toEqual('[1,2,x]**');
  });
  it('addColumn then removeColumn should keep the same', () => {
    let updated = Array2dUtils.addColumn(source);
    expect(source).toEqual(Array2dUtils.removeColumn(updated));
  });
  it('addRow should work', () => {
    expect(() => {
      Array2dUtils.addRow('****');
    }).toThrow('Invalid Argument. Missing size prefix.');
    let updated = Array2dUtils.addRow(source);
    expect(updated).toEqual('[5,6,*]******************************');
    updated = Array2dUtils.addRow('[2,2,x]****');
    expect(updated).toEqual('[2,3,x]****xx');
  });
  it('removeRow should work', () => {
    expect(() => {
      Array2dUtils.removeRow('****');
    }).toThrow('Invalid Argument. Missing size prefix.');
    let updated = Array2dUtils.removeRow(source);
    expect(updated).toEqual('[5,4,*]********************');
    updated = Array2dUtils.removeRow('[2,2,x]****');
    expect(updated).toEqual('[2,1,x]**');
  });
  it('addRow then removeRow should keep the same', () => {
    let updated = Array2dUtils.addRow(source);
    expect(source).toEqual(Array2dUtils.removeRow(updated));
  });
});

describe('get/set content', () => {
  let source: string;
  beforeEach(() => {
    source = '[4,4,*]0123456789abcdef';
  });
  it('get value at coordinates', () => {
    const coords = { x: 0, y: 0 };
    expect(() => {
      Array2dUtils.get('****', coords);
    }).toThrow('Invalid Argument. Missing size prefix.');
    let result = Array2dUtils.get(source, coords);
    expect(result).toEqual('0');
    coords.x++;
    result = Array2dUtils.get(source, coords);
    expect(result).toEqual('1');
    coords.x++;
    result = Array2dUtils.get(source, coords);
    expect(result).toEqual('2');
    coords.x++;
    result = Array2dUtils.get(source, coords);
    expect(result).toEqual('3');
    coords.y++;
    result = Array2dUtils.get(source, coords);
    expect(result).toEqual('7');
    coords.y++;
    result = Array2dUtils.get(source, coords);
    expect(result).toEqual('b');
    coords.y++;
    result = Array2dUtils.get(source, coords);
    expect(result).toEqual('f');
  });
  it('get fails with out of bounds', () => {
    expect(() => {
      Array2dUtils.get(source, { x: -1, y: 0 });
    }).toThrow('Out of Bounds.');
    expect(() => {
      Array2dUtils.get(source, { x: 0, y: -1 });
    }).toThrow('Out of Bounds.');
    expect(() => {
      Array2dUtils.get(source, { x: 4, y: 0 });
    }).toThrow('Out of Bounds.');
    expect(() => {
      Array2dUtils.get(source, { x: 0, y: 4 });
    }).toThrow('Out of Bounds.');
  });
  it('set value at coordinates', () => {
    const coords = { x: 0, y: 0 };
    expect(() => {
      Array2dUtils.set('****', coords);
    }).toThrow('Invalid Argument. Missing size prefix.');
    let updated = Array2dUtils.set(source, coords, 'X');
    expect(updated).toEqual('[4,4,*]X123456789abcdef');
    coords.x++;
    updated = Array2dUtils.set(source, coords, 'X');
    expect(updated).toEqual('[4,4,*]0X23456789abcdef');
    coords.x++;
    updated = Array2dUtils.set(source, coords, 'X');
    expect(updated).toEqual('[4,4,*]01X3456789abcdef');
    coords.x++;
    updated = Array2dUtils.set(source, coords, 'X');
    expect(updated).toEqual('[4,4,*]012X456789abcdef');
    coords.y++;
    updated = Array2dUtils.set(source, coords, 'X');
    expect(updated).toEqual('[4,4,*]0123456X89abcdef');
    coords.y++;
    updated = Array2dUtils.set(source, coords, 'X');
    expect(updated).toEqual('[4,4,*]0123456789aXcdef');
    coords.y++;
    updated = Array2dUtils.set(source, coords, 'X');
    expect(updated).toEqual('[4,4,*]0123456789abcdeX');
  });
  it('set fails with out of bounds', () => {
    expect(() => {
      Array2dUtils.set(source, { x: -1, y: 0 });
    }).toThrow('Out of Bounds.');
    expect(() => {
      Array2dUtils.set(source, { x: 0, y: -1 });
    }).toThrow('Out of Bounds.');
    expect(() => {
      Array2dUtils.set(source, { x: 4, y: 0 });
    }).toThrow('Out of Bounds.');
    expect(() => {
      Array2dUtils.set(source, { x: 0, y: 4 });
    }).toThrow('Out of Bounds.');
  });
  it('setBox at coordinates', () => {
    // 0123
    // 4567
    // 89ab
    // cdef
    expect(() => {
      Array2dUtils.setBox('****', 0, 0, 0, 0);
    }).toThrow('Invalid Argument. Missing size prefix.');
    let updated = Array2dUtils.setBox(source, 0, 0, 2, 2, 'X');
    expect(updated).toEqual('[4,4,*]XX23XX6789abcdef');
    updated = Array2dUtils.setBox(source, 1, 1, 2, 2, 'X');
    expect(updated).toEqual('[4,4,*]01234XX78XXbcdef');
    updated = Array2dUtils.setBox(source, 2, 2, 2, 2, 'X');
    expect(updated).toEqual('[4,4,*]0123456789XXcdXX');
  });
  it('setBox fails with out of bounds', () => {
    expect(() => {
      Array2dUtils.setBox(source, -1, 0, 2, 2);
    }).toThrow('Out of Bounds.');
    expect(() => {
      Array2dUtils.setBox(source, 0, -1, 2, 2);
    }).toThrow('Out of Bounds.');
    expect(() => {
      Array2dUtils.setBox(source, 4, 0, 2, 2);
    }).toThrow('Out of Bounds.');
    expect(() => {
      Array2dUtils.setBox(source, 0, 4, 2, 2);
    }).toThrow('Out of Bounds.');
    expect(() => {
      Array2dUtils.setBox(source, 3, 0, 2, 2);
    }).toThrow('Out of Bounds.');
    expect(() => {
      Array2dUtils.setBox(source, 0, 3, 2, 2);
    }).toThrow('Out of Bounds.');
  });
});

describe('utils', () => {
  let source: string;
  beforeEach(() => {
    source = '[4,4,*]0123456789abcdef';
  });
  it('finds first instance of a value', () => {
    expect(() => {
      Array2dUtils.findFirst('****');
    }).toThrow('Invalid Argument. Missing size prefix.');
    // 0123
    // 4567
    // 89ab
    // cdef
    expect(Array2dUtils.findFirst(source, 'NOT FOUND')).toBeNull();
    expect(Array2dUtils.findFirst(source, '0')).toEqual({ x: 0, y: 0 });
    expect(Array2dUtils.findFirst(source, '1')).toEqual({ x: 1, y: 0 });
    expect(Array2dUtils.findFirst(source, '2')).toEqual({ x: 2, y: 0 });
    expect(Array2dUtils.findFirst(source, '3')).toEqual({ x: 3, y: 0 });
    expect(Array2dUtils.findFirst(source, '7')).toEqual({ x: 3, y: 1 });
    expect(Array2dUtils.findFirst(source, 'b')).toEqual({ x: 3, y: 2 });
    expect(Array2dUtils.findFirst(source, 'f')).toEqual({ x: 3, y: 3 });
  });

  it('returns size of array', () => {
    expect(() => {
      Array2dUtils.getSize('****');
    }).toThrow('Invalid Argument. Missing size prefix.');
    expect(Array2dUtils.getSize(source)).toEqual({ x: 4, y: 4 });
    expect(Array2dUtils.getSize('[0,0,*]')).toEqual({ x: 0, y: 0 });
    expect(Array2dUtils.getSize('[1,0,*]')).toEqual({ x: 0, y: 0 });
    expect(Array2dUtils.getSize('[0,1,*]')).toEqual({ x: 0, y: 0 });
    expect(Array2dUtils.getSize('[1,1,*]*')).toEqual({ x: 1, y: 1 });
    expect(Array2dUtils.getSize('[1,2,*]*+')).toEqual({ x: 1, y: 2 });
    expect(Array2dUtils.getSize('[2,1,*]**')).toEqual({ x: 2, y: 1 });
  });
  it('contains works', () => {
    expect(() => {
      Array2dUtils.contains('****', 0, 0, 0, 0);
    }).toThrow('Invalid Argument. Missing size prefix.');
    // 0123
    // 4567
    // 89ab
    // cdef
    expect(Array2dUtils.contains(source, 0, 0, 2, 2)).toEqual(true);
    expect(Array2dUtils.contains(source, 1, 1, 2, 2)).toEqual(true);
    expect(Array2dUtils.contains(source, 2, 2, 2, 2)).toEqual(true);

    expect(Array2dUtils.contains(source, 0, 0, 0, 0)).toEqual(false);
    expect(Array2dUtils.contains(source, -1, -1, 2, 2)).toEqual(false);
    expect(Array2dUtils.contains(source, 0, -1, 2, 2)).toEqual(false);
    expect(Array2dUtils.contains(source, -1, 0, 2, 2)).toEqual(false);
    expect(Array2dUtils.contains(source, 0, 3, 2, 2)).toEqual(false);
    expect(Array2dUtils.contains(source, 3, 0, 2, 2)).toEqual(false);
    expect(Array2dUtils.contains(source, 3, 3, 2, 2)).toEqual(false);
    expect(Array2dUtils.contains(source, 4, 0, 2, 2)).toEqual(false);
    expect(Array2dUtils.contains(source, 0, 4, 2, 2)).toEqual(false);
    expect(Array2dUtils.contains(source, -1, -1, 1, 1)).toEqual(false);
    expect(Array2dUtils.contains(source, -1, 0, 1, 1)).toEqual(false);
    expect(Array2dUtils.contains(source, 0, -1, 1, 1)).toEqual(false);
    expect(Array2dUtils.contains(source, 4, 0, 1, 1)).toEqual(false);
    expect(Array2dUtils.contains(source, 0, 4, 1, 1)).toEqual(false);
    expect(Array2dUtils.contains(source, 4, 4, 1, 1)).toEqual(false);
  });
});
