import Plugin from 'app/service/plugin/Plugin';
import PluginManager from 'app/service/plugin/PluginManager';
import Repository from 'app/service/plugin/Repository';
import Scribe from 'app/plugin/scribe/Scribe';

export default class DefaultPluginManagerFactory {
    static create () {
        var repository = new Repository([
            new Scribe()
        ]);
        return new PluginManager([repository]);
    }
}
