import Partitioner from 'app/service/partitioner/Partitioner';
import forEach from 'lodash/collection/forEach';

const parts = {
    foo: {
        "v1": [
            {
                "plugin": "foo",
                "version": "0.1",
                "data": {
                    "href": "bar"
                }
            },
            {
                "plugin": "foo",
                "version": "0.1",
                "data": {
                    "href": "baz"
                }
            }
        ],
        "v2": [
            {
                "plugin": "foo",
                "version": "0.2",
                "data": {
                    "href": "bar"
                }
            },
            {
                "plugin": "foo",
                "version": "0.2",
                "data": {
                    "href": "baz"
                }
            }
        ]
    },
    text: [
        {
            "plugin": "text",
            "data": {
                "inner": "Much I marvelled this ungainly fowl to hear discourse so plainly,Though its answer little meaning--little relevancy bore;For we cannot help agreeing that no living human beingEver yet was blessed with seeing bird above his chamber door--Bird or beast upon the sculptured bust above his chamber door,With such name as \"Nevermore.\""
            }
        },
        {
            "plugin": "text",
            "data": {
                "inner": "Much I marvelled this ungainly fowl to hear discourse so plainly,Though its answer little meaning--little relevancy bore;For we cannot help agreeing that no living human beingEver yet was blessed with seeing bird above his chamber door--Bird or beast upon the sculptured bust above his chamber door,With such name as \"Nevermore.\""
            },
            "options": {
                "tag": "p"
            }
        },
        {
            "plugin": "text",
            "data": {
                "inner": "But the Raven, sitting lonely on that placid bust, spoke onlyThat one word, as if its soul in that one word he did outpourNothing farther then he uttered; not a feather then he fluttered--Till I scarcely more than muttered: \"Other friends have flown before--On the morrow he will leave me, as my Hopes have flown before.\",Then the bird said \"Nevermore.\""
            }
        }
    ]
};

const cases = [
    {
        input: [
            parts.text[0],
            parts.text[1],
            parts.text[2],
            parts.foo.v1[0],
            parts.text[2],
            parts.text[1],
            parts.text[1],
            parts.text[0]
        ],
        expected: [
            [parts.text[0], parts.text[1], parts.text[2]],
            [parts.foo.v1[0]],
            [parts.text[2], parts.text[1], parts.text[1], parts.text[0]]
        ]
    },
    {
        input: [
            parts.text[0],
            parts.text[1],
            parts.foo.v1[0],
            parts.text[2]
        ],
        expected: [
            [parts.text[0], parts.text[1]],
            [parts.foo.v1[0]],
            [parts.text[2]]
        ]
    },
    {
        input: [
            parts.foo.v1[0],
            parts.foo.v2[0],
            parts.foo.v1[0],
            parts.foo.v1[1]
        ],
        expected: [
            [parts.foo.v1[0]],
            [parts.foo.v2[0]],
            [parts.foo.v1[0], parts.foo.v1[1]]
        ]
    },
    {
        input: [
            parts.foo.v1[0],
            parts.foo.v2[0],
            parts.foo.v1[0],
            parts.foo.v2[1]
        ],
        expected: [
            [parts.foo.v1[0]],
            [parts.foo.v2[0]],
            [parts.foo.v1[0]],
            [parts.foo.v2[1]]
        ]
    }
];

describe('Unit\\Service\\Partitioner', function () {
    var p = new Partitioner();
    forEach(cases, function (c, k) {
        it('passes test case ' + k, function () {
            var partitions = p.partition(c.input);
            expect(partitions.length).toBe(c.expected.length);
            expect(partitions).toEqual(c.expected);
        });
    });
});
