import Plugin from 'app/service/plugin/Plugin';
import PluginManager from 'app/service/plugin/PluginManager';
import Repository from 'app/service/plugin/Repository';
import Default from 'app/plugin/Default';
import MediumJS from 'app/plugin/MediumJS';

export default class DefaultPluginManagerFactory {
    static create () {
        var repository = new Repository([
            new Default(),
            new MediumJS()
        ]);
        return new PluginManager([repository])
    }
}
