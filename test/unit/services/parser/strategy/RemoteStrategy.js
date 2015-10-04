import Mock from 'superagent-mocker';
import request from 'superagent';
import dummyDOM from 'app/pkg/dummyDOM';
import RemoteStrategy from 'app/service/parser/strategy/RemoteStrategy';
import forEach from 'lodash/collection/forEach';
import Editable from 'app/entity/Editable';

var mock = Mock(request);

const resource = {
    "id": "39a13f96-ac2a-441a-be1a-b26d581c09b2",
    "sections": [
        {
            "id": "02912fd7-94c2-4779-b2df-2397e35f5e66",
            "plugin": "text",
            "data": {
                "inner": "About Me"
            }
        }
    ]
};

mock.get('/resource', () => ({body: resource}));

describe('Unit\\Service\\Parser\\Strategy\\RemoteStrategy', function () {
    beforeEach(function () {
        // Guarentee each test knows exactly which routes are defined
    });

    describe('parse', function () {
        var testCases = [
            {
                html: '<div></div>',
                pass: false, fail: true, expected: undefined
            },
            {
                html: '<div data-resource=""></div>',
                pass: false, fail: true, expected: undefined
            },
            {
                html: '<div data-resource="404"></div>',
                pass: false, fail: true
            },
            {
                html: '<div data-resource="/resource"></div>',
                pass: true, fail: false, expected: new Editable(resource)
            }
        ];

        forEach(testCases, (tc, i) => {
            var rs = new RemoteStrategy(), result, passed = false, failed = false;
            beforeEach((done) => {
                var e = dummyDOM.appendHTML(tc.html, document.body);
                passed = false;
                failed = false;
                rs.parse(e).then((res) => {
                    passed = true;
                    result = res;
                    done();
                }).catch((err) => {
                    failed = true;
                    result = err;
                    done();
                });
            });

            it('should pass test case ' + i, () => {
                expect(failed).toBe(tc.fail);
                expect(passed).toBe(tc.pass);
                if (tc.pass) {
                    expect(result).toEqual(tc.expected);
                }
            });
        });
    });
});
