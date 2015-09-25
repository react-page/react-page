import Editable from 'app/entity/Editable';
import Section from 'app/entity/Section';

describe('Unit Entity', function () {
    describe('Editable', function () {
        it('should instantiate correctly', function () {
            var e = new Editable({
                uuid: '02912fd7-94c2-4779-b2df-2397e35f5e66',
                field: 'title',
                sections: []
            });
            expect(e.uuid).toBe('02912fd7-94c2-4779-b2df-2397e35f5e66');
            expect(e.tid.length).toEqual(0);
            expect(e.field).toBe('title');
            expect(e.sections).toEqual([]);
        });
        it('should instantiate children correctly', function () {
            var e = new Editable({
                sections: [
                    {
                        uuid: '123',
                        plugin: 'foobar'
                    }
                ]
            });
            expect(e.sections).toEqual([new Section({
                uuid: '123',
                plugin: 'foobar'
            })]);
        });
    });
});
