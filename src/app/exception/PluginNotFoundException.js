export default class PluginNotFoundException extends Error {
    constructor(name, version) {
        super();
        this.message = 'Plugin ' + name + ' version ' + version + ' not found';
        this.name = 'PluginNotFoundException';
        this.stack = (new Error()).stack;
    }
}
