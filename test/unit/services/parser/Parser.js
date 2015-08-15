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

function createDummyHTMLElement(html) {
    var div = document.createElement('div');
    div.insertAdjacentHTML('afterbegin', html);
    document.body.appendChild(div);
    return div.children[0];
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

            parser.parse(createDummyHTMLElement('<div></div>'));
            expect(called.can).toBe(true);
            expect(called.cannot).toBe(false);
        });
    });
});
