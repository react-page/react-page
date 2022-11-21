var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { createValue } from '../..';
import { getTextContents } from './getTextContents';
var customCellPlugin1 = {
    id: 'p1',
    Renderer: function () { return null; },
    version: 1,
    getTextContents: function (data) { return [data.title, data.description]; },
};
var customCellPlugin2 = {
    id: 'p2',
    Renderer: function () { return null; },
    version: 1,
};
var customCellPlugin3 = {
    id: 'p3',
    Renderer: function () { return null; },
    version: 1,
    getTextContents: function (data) { return __spreadArray([data.title], __read(data.text), false); },
};
var cellPlugins = [customCellPlugin1, customCellPlugin2, customCellPlugin3];
describe('getTextContents', function () {
    var sampleValue = createValue({
        rows: [
            [
                {
                    plugin: customCellPlugin1,
                    data: {
                        title: 'my title',
                        description: 'my description',
                    },
                },
                {
                    plugin: customCellPlugin2,
                    data: {
                        imageUrl: 'fooo.bar',
                    },
                },
            ],
            [
                {
                    rows: [
                        [
                            {
                                plugin: customCellPlugin3,
                                data: {
                                    title: 'hello',
                                    text: ['world', 'echo'],
                                },
                            },
                        ],
                    ],
                },
            ],
        ],
    }, {
        lang: 'en',
        cellPlugins: cellPlugins,
    });
    it('extracts getTextContents from Cell Plugins', function () {
        expect(getTextContents(sampleValue, {
            cellPlugins: cellPlugins,
            lang: 'en',
        })).toEqual(['my title', 'my description', 'hello', 'world', 'echo']);
    });
});
//# sourceMappingURL=getTextContents.test.js.map