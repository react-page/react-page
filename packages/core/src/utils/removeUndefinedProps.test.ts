import { removeUndefinedProps } from './removeUndefinedProps';

describe('removeUndefinedProps', () => {
  it('should remove undefined and null properties from object', () => {
    const obj = {
      a: 'a',
      b: undefined,
      c: 'something',
      d: null,
    };
    expect(removeUndefinedProps(obj)).toEqual({
      a: 'a',
      c: 'something',
    });
  });

  it('does not touch nested stuff', () => {
    const obj = {
      a: 'a',
      b: undefined,
      c: 'something',
      d: {
        some: undefined,
        bar: 'bar',
      },
    };
    expect(removeUndefinedProps(obj)).toEqual({
      a: 'a',
      c: 'something',
      d: {
        some: undefined,
        bar: 'bar',
      },
    });
  });
});
