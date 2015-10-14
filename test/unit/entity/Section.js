import Section from 'app/entity/Section';

describe('Unit\\Entity\\Section', function () {
        it('should be instantiate correctly', function () {
            var data = {bar: 'foo'},
                s = new Section({
                id: '02912fd7-94c2-4779-b2df-2397e35f5e66',
                plugin: 'foobar',
                version: '1.0',
                data: data
            });

            expect(s.id).toBe('02912fd7-94c2-4779-b2df-2397e35f5e66');
            expect(s.plugin).toBe('foobar');
            expect(s.version).toBe('1.0');
            expect(s.data).toEqual(data);
            expect(s.data === data).toBe(false);
        });

        it('should create a temporary id', function () {
            var s = new Section({});
            expect(s.id).toBeDefined();
        });
});
