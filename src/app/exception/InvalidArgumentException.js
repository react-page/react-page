export default class InvalidArgumentException extends TypeError {
    constructor(argument, expected, actual) {
        super();
        this.message = 'Expected argument ' + argument + ' to be ' + expected + ' but got ' + actual;
        this.name = 'InvalidArgumentException';
        this.stack = (new Error()).stack;
    }
}
