export default class NoEditablesFound extends Error {
    constructor() {
        super();
        this.message = 'No editables found';
        this.name = 'NoEditablesFound';
        this.stack = (new Error()).stack;
    }
}
