import { PluginGetComponent } from 'src/plugins/Plugin';

export interface SlatePluginSettings {
  // tslint:disable-next-line:no-any
  getComponent?: PluginGetComponent;
}
