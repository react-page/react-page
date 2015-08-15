export default class ParserException extends Error {
    constructor(message) {
        super();
        this.name = 'ParserException';
        this.message = message || 'The Parser strategy was unable to properly extract the data';
        this.stack = (new Error()).stack;
    }
}
