import Section from 'app/entity/Section';
import forEach from 'lodash/collection/forEach';
import HTMLParser from 'app/plugin/text/HTMLParser';
import dummyDOM from 'app/pkg/dummyDOM';

function ns(plugin, tag, inner, id) {
    return new Section({id: id, plugin: plugin, data: {tag: tag, inner: inner}});
}

function ne(id) {
    return new Section({id: id, plugin: 'placeholder'});
}

const cases = [
    {
        html: '<h1>heading</h1><p>foo</p><p>bar</p>',
        expected: [ns('text', 'h1', 'heading'), ns('text', 'p', 'foo'), ns('text', 'p', 'bar')]
    },
    {
        html: '<h1 data-id="1">heading</h1><p>foo</p><blockquote data-id="2">bar</blockquote>',
        expected: [ns('text', 'h1', 'heading', '1'), ns('text', 'p', 'foo'), ns('text', 'blockquote', 'bar', '2')]
    },
    {
        html: '<h1 data-id="1">heading</h1><p data-id="1"><br></p><p>bar</p>',
        expected: [ns('text', 'h1', 'heading', '1'), ne('1'), ns('text', 'p', 'bar')]
    },
    {
        html: '<h1 data-id="1">heading</h1><p data-id="1"><br></p><p>bar <strong>bold</strong></p>',
        expected: [ns('text', 'h1', 'heading', '1'), ne('1'), ns('text', 'p', 'bar <strong>bold</strong>')]
    },
    {
        html: '<p><br></p><p><br></p>',
        expected: [ne(), ne()]
    }
];

function fakeIds(a, b) {
    forEach(a, (v, k) => {
        v.id = typeof v.id === 'string' ? v.id : b[k].id;
    });
}

describe('Test\\Plugin\\Text\\HTMLParser', () => {
    forEach(cases, (c, k) => {
        it('parse should pass test case ' + k, () => {
            var e = dummyDOM.appendHTML('<div>' + c.html + '</div>', document.body),
                r = HTMLParser.parse(e.querySelectorAll(':scope > *'), 'placeholder');
            fakeIds(r, c.expected);
            expect(c.expected).toEqual(r);
        });
    })
});
