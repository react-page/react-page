import Editable from 'app/entity/Editable';
import Section from 'app/entity/Section';

describe('Unit\\Entity\\Editable', function () {
    it('should instantiate correctly', function () {
        var e = new Editable({
            id: '02912fd7-94c2-4779-b2df-2397e35f5e66',
            sections: []
        });
        expect(e.id).toBe('02912fd7-94c2-4779-b2df-2397e35f5e66');
        expect(e.sections).toEqual([]);
    });

    it('should instantiate children correctly', function () {
        var e = new Editable({sections: [{id: 123, plugin: 'foobar'}]});
        expect(e.sections).toEqual([new Section({
            id: 123,
            plugin: 'foobar'
        })]);
    });
});
