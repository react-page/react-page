import forEach from 'lodash/collection/forEach';
import lfind from 'lodash/collection/find';
import Plugin from './Plugin';
import PluginNotFoundException from 'app/exception/PluginNotFoundException';
import InvalidArgumentException from 'app/exception/InvalidArgumentException';

/**
 * A Repository is responsible for finding plugins in a specific version.
 *
 * <code>
 *
 * </code>
 */
export default class Repository {
    /**
     *
     * @param plugins []Plugin
     */
    constructor(plugins) {
        forEach(plugins, plugin => this.constructor.assertPlugin(plugin));
        this.plugins = plugins;
    }

    static assertPlugin(plugin) {
        if (!(plugin instanceof Plugin)) {
            throw new InvalidArgumentException('plugin', 'Plugin', plugin);
        }
    }

    get(name, version) {
        var plugin = this.find(name, version);
        if (plugin !== undefined) {
            return plugin;
        }
        throw new PluginNotFoundException(name, version);
    }

    has(name, version) {
        return this.find(name, version) !== undefined;
    }

    find(name, version) {
        version = version || 0;
        return lfind(this.plugins, p => p.name === name && this.constructor.isCompatible(version, p.version));
    }

    static isCompatible(version, head) {
        return version <= head;
    }
}
