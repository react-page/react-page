export default class ParsingStrategy {
    /**
     * The DOMParser constructor does not have anything special.
     *
     * @constructor
     */
    constructor(pluginManager) {
        this.pluginManager = pluginManager;
    }

    parse(element, data, options) {
        throw 'Not implemented';
    }

    parseable(element, data) {
        throw 'Not implemented';
    }
}
