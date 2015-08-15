import Plugin from 'app/service/plugin/Plugin';
import PluginManager from 'app/service/plugin/PluginManager';
import Repository from 'app/service/plugin/Repository';
import Default from 'app/plugin/Default';
import MediumJS from 'app/plugin/mediumjs/MediumJS';
import Embed from 'app/plugin/embed/Embed';

export default class DefaultPluginManagerFactory {
    static create () {
        var repository = new Repository([
            new Default(),
            new MediumJS(),
            new Embed()
        ]);
        return new PluginManager([repository]);
    }
}
