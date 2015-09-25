export default class ParsingStrategy {
    /**
     * The DOMParser constructor does not have anything special.
     *
     * @constructor
     */
    constructor(pluginManager) {
        this.pluginManager = pluginManager;
    }

    parse(element) {
        throw 'Not implemented';
    }

    parseable(element) {
        throw 'Not implemented';
    }
}
