import React from 'react';
import Parser from 'app/service/parser/Parser';
import InvalidArgumentException from 'app/exception/InvalidArgumentException';
import ParsingStrategy from 'app/service/parser/strategy/ParsingStrategy';

class Strategy extends ParsingStrategy {
    constructor(parseable, parse) {
        super(null);
        this.can = parseable;
        this.do = parse;
    }

    parse(element, previous) {
        return this.do(element, previous);
    }

    parseable(element, previous) {
        return this.can(element, previous);
    }
}

describe('Unit', function () {
    describe('Parser', function () {
        describe('constructor', function () {
            it('should be instantiable', function () {
                new Parser();
            });
        });

        it('should choose the right strategies', function () {
            var called = {can: false, cannot: false},
                can = new Strategy(function () {
                    return true;
                }, function () {
                    called.can = true;
                }),
                cannot = new Strategy(function () {
                    return false;
                }, function () {
                    called.cannot = true;
                }),
                parser = new Parser([can, cannot]);

            parser.parse();
            expect(called.can).toBe(true);
            expect(called.cannot).toBe(false);
        });
    });
});
