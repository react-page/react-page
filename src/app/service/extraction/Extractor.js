'use strict';
/**
 * The extractor is accountable for choosing the right strategy to extract
 * a data object which is used by the editor to render plugins etc.
 *
 * <code>
 *     // var myStrategy = new MyStrategy();
 *     var extractor = new Extractor([myStrategy]);
 *     var element = document.getElementById('some-editable-object');
 *     var data = extractor.extract(element);
 *     // if you want to run the extract command with different strategies do:
 *     var data = extractor.extract(element, [myOtherStrategy]);
 * </code>
 */
var Extractor,
    InvalidArgumentException = require('../../exception/InvalidArgumentException'),
    _ = require('underscore'),
    areValidStrategies;

/**
 * Checks if the given array consists of valid strategies. Throws an error,
 * if no valid strategy is given.
 *
 * @param strategies
 */
areValidStrategies = function(strategies) {
    if (!(strategies instanceof Array)) {
        throw new InvalidArgumentException('Argument strategies is not an array.');
    }
    if (strategies.length < 1) {
        throw new InvalidArgumentException('Argument strategies should not be empty.');
    }
    _.each(strategies, function (strategy) {
        if (!(strategy.canExtract instanceof Function || strategy.extract instanceof Function)) {
            throw new InvalidArgumentException('Given object does not provide methods extract and/or canExtract.');
        }
    });
};

/**
 * The extractor is accountable for choosing the right strategy to extract
 * a data object which is used by the editor to render plugins etc.
 *
 * <code>
 *     // var myStrategy = new MyStrategy();
 *     var extractor = new Extractor([myStrategy]);
 * </code>
 *
 * @param strategies provide a list of
 * @constructor
 */
Extractor = function (strategies) {
    areValidStrategies(strategies);
    this.strategies = strategies;
};

/**
 * Extract tries to find a suitable strategy for converting a HTMLElement to
 * a sanitized and sane object. The object is later used in the editor to e.g. decide which
 * plugins to load.
 *
 * <code>
 *     var element = document.getElementById('some-editable-object');
 *     var data = extractor.extract(element);
 *     // if you want to run the extract command with different strategies do:
 *     var data = extractor.extract(element, [myOtherStrategy]);
 * </code>
 *
 * @param element usually an editable object (should be of type HTMLElement)
 * @param strategies provide an array of strategies to use only these
 * @returns Object the extracted data model
 */
Extractor.prototype.extract = function (element, strategies) {
    var data = {};
    if (strategies instanceof Array) {
        areValidStrategies(strategies);
    } else {
        strategies = this.strategies;
    }
    if (!element instanceof HTMLElement) {
        throw new InvalidArgumentException('Argument element should be an HTMLElement');
    }
    _.each(strategies, function (strategy) {
        if (strategy.canExtract(element, data)) {
            data = strategy.extract(element, data);
        }
    });

    return data;
};

module.exports = Extractor;
