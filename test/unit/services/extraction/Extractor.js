var React = require('react'),
    Extractor = require('../../../../src/app/service/extraction/Extractor'),
    Strategy,
    InvalidArgumentException = require('../../../../src/app/exception/InvalidArgumentException');

Strategy = function (can, extract) {
    this.can = can;
    this.do = extract;
};

Strategy.prototype.canExtract = function (element, previous) {
    return this.can(element, previous);
};

Strategy.prototype.extract = function (element, previous) {
    return this.do(element, previous);
};

describe('Unit:', function () {
    describe('Extractor', function () {
        describe('constructor', function () {
            it('should throw an error if an empty array is passed', function() {
                try {
                    new Extractor([]);
                    expect(false).toBe(true);
                } catch (e) {
                    expect(e instanceof InvalidArgumentException).toBe(true);
                }
            });
            it('should throw an error if no strategies are given', function(){
                try {
                    new Extractor();
                    expect(false).toBe(true);
                } catch (e) {
                    expect(e instanceof InvalidArgumentException).toBe(true);
                }
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
                extractor = new Extractor([can, cannot]);

            extractor.extract();
            expect(called.can).toBe(true);
            expect(called.cannot).toBe(false);
        });
    });
});
