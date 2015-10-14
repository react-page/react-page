import forEach from 'lodash/collection/forEach';
import find from 'lodash/collection/find';
import PluginNotFoundException from 'app/exception/PluginNotFoundException';
import InvalidArgumentException from 'app/exception/InvalidArgumentException';
import Repository from './Repository';

/**
 * PluginManager
 */
export default class PluginManager {
    /**
     * Construct the PluginManager with some plugins
     *
     * @example
     * // var plugins = [new Plugin()];
     * var repository = new Repository(plugins);
     * var pm = new PluginManager([repository]);
     *
     * @param {Repository[]} repositories
     * @throws {InvalidArgumentException}
     */
    constructor(repositories) {
        forEach(repositories, repository => this.constructor.assertRepository(repository));
        this.repositories = repositories;
    }

    /**
     * Checks if the argument implements Repository
     *
     * @example
     * PluginManager.assertRepository(repository);
     *
     * @param repository
     * @throws {InvalidArgumentException}
     */
    static assertRepository(repository) {
        if (!(repository instanceof Repository)) {
            throw new InvalidArgumentException('repository', 'Repository', repository);
        }
    }

    /**
     * Returns true if the plugin exists in the repository.
     *
     * @example
     * // var pm = new PluginManager...
     * console.log('plugin exists:', pm.has('myplugin', '0.1.3'));
     *
     * @param {string} name
     * @param {string} version
     * @return {bool}
     */
    has(name, version) {
        return find(this.repositories, r => r.has(name, version)) !== undefined;
    }

    /**
     * Gets a plugin (if it exists).
     *
     * @example
     * // var pm = new PluginManager...
     * console.log('plugin name:', pm.get('myplugin', '0.1.3').name);
     *
     * @param {string} name
     * @param {string} version
     * @throws {PluginNotFoundException}
     * @return {bool}
     */
    get(name, version) {
        var repository = find(this.repositories, r => r.has(name, version));
        if (repository !== undefined) {
            return repository.get(name, version);
        }
        throw new PluginNotFoundException(name, version);
    }
}
