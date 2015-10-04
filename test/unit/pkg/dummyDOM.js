import dummyDOM from 'app/pkg/dummyDOM';
import forEach from 'lodash/collection/forEach';

const cases = [
    {
        html: '<div class="foo"></div>',
        query: 'div.foo',
        parent: document.body,
        amount: 1
    },
    {
        html: '<div class="foo"><div class="bar"></div></div>',
        query: 'div.foo > div.bar',
        parent: document.body,
        amount: 1
    },
    {
        html: '<div class="dummy-1"></div><div class="dummy-2"></div>',
        query: '.dummy-1, .dummy-2',
        parent: document.body,
        amount: 2
    }
];

describe('Unit\\pkg\\dummyDOM', function () {
    forEach(cases, (c, i) => {
        it('appendElement should pass case ' + i, function () {
            dummyDOM.appendHTML(c.html, c.parent);
            var e = c.parent.querySelectorAll(':scope > ' + c.query);
            expect(e.length).toBe(c.amount);
        });
    });
});
