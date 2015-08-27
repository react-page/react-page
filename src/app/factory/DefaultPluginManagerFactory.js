import Plugin from 'app/service/plugin/Plugin';
import PluginManager from 'app/service/plugin/PluginManager';
import Repository from 'app/service/plugin/Repository';
import Scribe from 'app/plugin/scribe/Scribe';
import Embed from 'app/plugin/embed/Embed';
import Math from 'app/plugin/math/Math';
import Row from 'app/plugin/row/Row';

export default class DefaultPluginManagerFactory {
    static create () {
        var repository = new Repository([
            new Scribe(),
            new Embed(),
            new Math(),
            new Row()
        ]);
        return new PluginManager([repository]);
    }
}
