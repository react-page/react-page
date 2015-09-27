import React from 'react';
import Parser from 'app/service/parser/Parser';
import InvalidArgumentException from 'app/exception/InvalidArgumentException';
import ParsingStrategy from 'app/service/parser/strategy/ParsingStrategy';
import DummyDOM from 'app/pkg/dummyDOM';
import forEach from 'lodash/collection/forEach';
import isEmpty from 'lodash/lang/isEmpty';

class Strategy extends ParsingStrategy {
    constructor(parse) {
        super();
        this.do = parse;
        this.called = 0;
    }

    parse(element) {
        this.called++;
        var result = this.do(element),
            options = result.options || {},
            data = result.data || {};
        if (isEmpty(options) && isEmpty(data.length)) {
            return new Promise((resolve, reject) => reject());
        }
        return new Promise((resolve) => resolve({data: data, options: options}));
    }
}

const results = {
    cannot: {options: {}, data: {}},
    can: {
        options: {
            foo: {foo: 'bar'}
        },
        data: {
            baz: {'boo': {faz: 'bez'}}
        }
    }
};

var cannot = new Strategy(() => results.cannot),
    can = new Strategy(() => results.can, 1);

var cases = [
    {strategies: [can], expects: results.can, called: 1},
    {strategies: [can, cannot, can], expects: results.can, called: 1},
    {strategies: [cannot, cannot, can], expects: results.can, called: 3},
    {strategies: [cannot, cannot, can, can], expects: results.can, called: 3},
    {strategies: [cannot, cannot, can, cannot], expects: results.can, called: 3},
    {strategies: [cannot], error: true, called: 1}
];

describe('Unit', function () {
    describe('Parser', function () {
        describe('constructor', function () {
            it('should be instantiable', function () {
                new Parser();
            });
        });

        forEach(cases, (c, num) => {
            describe('parse case ' + num, function () {
                var data, options, strategies = c.strategies, error = false;

                beforeEach(function (done) {
                    var parser = new Parser(strategies),
                        p = parser.parse(DummyDOM.appendHTML('<div></div>'));

                    p.then((result) => {
                        data = result.data;
                        options = result.options;
                        done();
                    });
                    p.catch(() => {
                        error = true;
                        done();
                    });
                });

                it('should choose the right strategies', function () {
                    var called = 0;
                    forEach(strategies, (strategy) => {
                        called += strategy.called;
                        strategy.called = 0;
                    });
                    expect(c.called).toEqual(called);

                    if (c.error) {
                        expect(error).toBeTruthy();
                        return;
                    }
                    expect(data).toEqual(c.expects.data);
                    expect(options).toEqual(c.expects.options);
                });
            });
        })
    });
});
