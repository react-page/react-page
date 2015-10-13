import Plugin from 'app/service/plugin/Plugin';
import PluginManager from 'app/service/plugin/PluginManager';
import Repository from 'app/service/plugin/Repository';
import Text from 'app/plugin/text/Plugin';
import Placeholder from 'app/plugin/placeholder/Plugin';

export default class DefaultPluginManagerFactory {
    static create() {
        var repository = new Repository([new Text(), new Placeholder()]);
        return new PluginManager([repository]);
    }
}
