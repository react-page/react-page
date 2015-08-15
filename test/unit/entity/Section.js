import Section from 'app/entity/Section';

describe('Unit Entity', function () {
    describe('Section', function () {
        it('should be instantiate correctly', function () {
            var s = new Section('foobar', '1.0', {foo: 'bar'}, {bar: 'foo'});
            expect(s.name).toBe('foobar');
            expect(s.version).toBe('1.0');
            expect(s.args).toEqual({foo: 'bar'});
            expect(s.data).toEqual({bar: 'foo'});
        });
    });
});
