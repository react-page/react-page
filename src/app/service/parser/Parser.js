import InvalidArgumentException from 'app/exception/InvalidArgumentException';
import u from 'underscore';
import ParsingStrategy from './strategy/ParsingStrategy';

/**
 * Checks if the given array consists of valid strategies. Throws an error,
 * if no valid strategy is given.
 *
 * @param {ParsingStrategy} strategy
 */
function assertStrategy(strategy) {
    if (!(strategy instanceof ParsingStrategy)) {
        throw new InvalidArgumentException('strategy', 'Strategy', strategy);
    }
}

/**
 * The Parser is accountable for choosing the right strategy to extract
 * a data object which is used by the editor to render plugins etc.
 *
 * <code>
 *     // var myStrategy = new MyStrategy();
 *     var Parser = new Parser([myStrategy]);
 *     var element = document.getElementById('some-editable-object');
 *     var data = Parser.extract(element);
 *     // if you want to run the extract command with different strategies do:
 *     var data = Parser.extract(element, [myOtherStrategy]);
 * </code>
 */
export default class Parser {
    /**
     * The Parser is accountable for choosing the right strategy to extract
     * a data object which is used by the editor to render plugins etc.
     *
     * <code>
     *     // var myStrategy = new MyStrategy();
     *     var Parser = new Parser([myStrategy]);
     * </code>
     *
     * @param strategies provide a list of
     * @constructor
     */
    constructor(strategies) {
        u.each(strategies, strategy => assertStrategy(strategy));
        this.strategies = strategies || [];
    }

    /**
     * Extract tries to find a suitable strategy for converting a HTMLElement to
     * a sanitized and sane object. The object is later used in the editor to e.g. decide which
     * plugins to load.
     *
     * <code>
     *     var element = document.getElementById('some-editable-object');
     *     var data = Parser.extract(element);
     *     // if you want to run the extract command with different strategies do:
     *     var data = Parser.extract(element, [myOtherStrategy]);
     * </code>
     *
     * @param element usually an editable object (should be of type HTMLElement)
     * @param strategies provide an array of strategies to use only these
     * @returns Object the extracted data model
     */
    parse(element, strategies) {
        if (strategies instanceof Array) {
            u.each(strategies, strategy => assertStrategy(strategy));
        } else {
            strategies = this.strategies;
        }
        if (!element instanceof HTMLElement) {
            throw new InvalidArgumentException('element', 'HTMLElement', element);
        }

        var data = {};
        u.each(strategies, function (strategy) {
            if (strategy.parseable(element, data)) {
                data = strategy.parse(element, data);
            }
        });
        return data;
    }
}
