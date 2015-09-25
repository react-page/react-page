import React from 'react';
import Parser from 'app/service/parser/Parser';
import InvalidArgumentException from 'app/exception/InvalidArgumentException';
import ParsingStrategy from 'app/service/parser/strategy/ParsingStrategy';
import DummyDOM from 'app/pkg/dummyDOM';
import forEach from 'lodash/collection/forEach';

class Strategy extends ParsingStrategy {
    constructor(parseable, parse, expectedCalls) {
        super();
        this.can = parseable;
        this.do = parse;
        this.expectedCalls = expectedCalls;
        this.actualCalls = 0;
    }

    parse(element) {
        var result = this.do(element);
        this.actualCalls += 4;
        return new Promise(function (resolve) {
            return resolve(result);
        });
    }

    parseable(element) {
        var result = this.can(element);
        this.actualCalls += 2;
        return new Promise(function (resolve, reject) {
            if (result) {
                return resolve();
            }
            return reject();
        });
    }
}

const empty = {};
var cannot = new Strategy(() => false, () => empty, 2);
var can = new Strategy(() => true, () => {
    return {foo: 'bar'};
}, 6);
var unreachable = new Strategy(() => false, () => empty, 0);
var cases = [
    {strategies: [can], expects: {foo: 'bar'}},
    {strategies: [can, unreachable], expects: {foo: 'bar'}},
    {strategies: [cannot, can], expects: {foo: 'bar'}},
    {strategies: [cannot], error: true}
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
                var strategies = c.strategies,
                    data, error = false;
                beforeEach(function (done) {
                    var parser = new Parser(strategies);
                    var p = parser.parse(DummyDOM.appendHTML('<div></div>'));
                    p.then((d) => {
                        data = d;
                        done();
                    });
                    p.catch(() => {
                        error = true;
                        done();
                    });
                });

                it('should choose the right strategies', function () {
                    forEach(strategies, (strategy) => {
                        expect(strategy.expectedCalls).toBe(strategy.actualCalls);
                        strategy.actualCalls = 0;
                    });
                    if (c.error) {
                        expect(error).toBeTruthy();
                        return;
                    }
                    expect(data).toEqual(c.expects);
                });
            });
        })
    });
});
