import { removeUndefinedProps } from './removeUndefinedProps';
describe('removeUndefinedProps', function () {
    it('should remove undefined and null properties from object', function () {
        var obj = {
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
    it('does not touch nested stuff', function () {
        var obj = {
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
//# sourceMappingURL=removeUndefinedProps.test.js.map