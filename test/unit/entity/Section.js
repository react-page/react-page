import Section from 'app/entity/Section';

describe('Unit Entity', function () {
    describe('Section', function () {
        it('should be instantiate correctly', function () {
            var s = new Section('foobar', '1.0', {});
            expect(s.plugin).toBe('foobar');
            expect(s.version).toBe('1.0');
            expect(s.data).toEqual({});
        });
    });
});
