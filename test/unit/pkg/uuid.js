import uuid from 'app/pkg/uuid';

describe('Unit', function () {
    describe('pkg', function () {
        describe('uuid', function () {
            var ids = [];
            for (var i = 0; i < 10; i++) {
                it('case ' + i + ' should be unique-ish and a valid uuid', function () {
                    var id = uuid();
                    expect(id.length).toEqual(36);
                    expect(ids.indexOf(id)).toEqual(-1);
                    ids.push(id);
                });
            }
        });
    });
});
