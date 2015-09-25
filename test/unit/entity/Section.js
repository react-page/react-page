import Section from 'app/entity/Section';

describe('Unit Entity', function () {
    describe('Section', function () {
        it('should be instantiate correctly', function () {
            var data = {bar: 'foo'},
                options = {foo: 'bar'},
                s = new Section({
                uuid: '02912fd7-94c2-4779-b2df-2397e35f5e66',
                plugin: 'foobar',
                version: '1.0',
                options: options,
                data: data
            });
            expect(s.plugin).toBe('foobar');
            expect(s.version).toBe('1.0');
            expect(s.options).toEqual(options);
            expect(s.data).toEqual(data);
            expect(s.options === options).toBe(false);
            expect(s.data === data).toBe(false);
            expect(s.uuid).toBe('02912fd7-94c2-4779-b2df-2397e35f5e66');
            expect(s.tid.length).toEqual(0);
        });

        it('should create a temporary id', function () {
            var s = new Section({});
            expect(s.tid.length).toEqual(36);
        });
    });
});
