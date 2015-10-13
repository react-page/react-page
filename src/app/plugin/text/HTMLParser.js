import forEach from 'lodash/collection/forEach';
import clone from 'lodash/lang/clone';
import trim from 'lodash/string/trim';
import Section from 'app/entity/Section';

export default class HTMLParser {
    static parse(elements, placeholder) {
        var r = [];
        forEach(elements, (e) => {
            var o, d = clone(e.attributes, 1);
            d.inner = e.innerHTML;
            d.tag = e.nodeName.toLowerCase();
            o = {id: e.dataset.id, plugin: 'text', data: d};
            if (trim(d.inner) === '<br>') {
                o = {id: e.dataset.id, plugin: placeholder};
            }
            r.push(new Section(o));
        });
        return r;
    }
}
