import u from 'underscore';
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
        u.each(plugins, plugin => this.constructor.assertPlugin(plugin));
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
        if (version) {
            return u.find(this.plugins, p => p.name === name && (p.version === version || this.constructor.isCompatible(version, p.compatibility)));
        } else {
            return u.find(this.plugins, p => p.name === name);
        }
    }

    static isCompatible(version, compatibles) {
        return compatibles ? compatibles.indexOf(version) > -1 : false;
    }
}
