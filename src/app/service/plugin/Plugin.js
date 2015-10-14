export default class Plugin {
    constructor(options) {
        // The plugin's settings
        this.name = options.name || '';
        this.version = parseInt(options.version || 0);
    }

    render(sections) {
    }
}
