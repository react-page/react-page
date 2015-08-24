import Editable from 'app/entity/Editable';

describe('Unit Entity', function () {
    describe('Editable', function () {
        it('should be instantiate correctly', function () {
            var e = new Editable('1', [], 'title');
            expect(e.uuid).toBe('1');
            expect(e.field).toBe('title');
            expect(e.sections).toEqual([]);
        });
    });
});
