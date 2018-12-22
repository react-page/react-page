/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import * as React from 'react';
import * as unexpected from 'unexpected';

import PluginService from '../index';
import {
  Migration,
  LayoutPluginConfig,
  ContentPluginConfig
} from '../classes';

const FOO = 'foo';
const OLDEST_VERSION = '0.0.1';
const OLDER_VERSION = '0.0.2';
const MATCHING_VERSION = '0.0.3';

const expect = unexpected.clone();

const content = [
  {
    name: FOO,
    version: MATCHING_VERSION,
    Component: () => <div />,
    migrations: [
      new Migration({
        toVersion: OLDEST_VERSION,
        fromVersionRange: '0.0.0 - 0.0.0',
        migrate: state => ({ ...state, old: 1 }),
      }),
      new Migration({
        toVersion: OLDER_VERSION,
        fromVersionRange: '0.0.1 - 0.0.1',
        migrate: state => ({ ...state, modified: 2 }),
      }),
      new Migration({
        toVersion: MATCHING_VERSION,
        fromVersionRange: '0.0.2 - 0.0.2',
        migrate: state => ({ ...state, modified: 1 }),
      }),
    ],
  },
] as ContentPluginConfig[];

const migrationEdgeCaseContent = [
  {
    name: FOO,
    version: MATCHING_VERSION,
    Component: () => <div />,
    migrations: [
      new Migration({
        toVersion: OLDEST_VERSION,
        fromVersionRange: '0.0.2 - 0.0.2',
        migrate: state => ({ ...state, old: 1 }),
      }),
      new Migration({
        toVersion: OLDER_VERSION,
        fromVersionRange: '0.0.0 - 0.0.0',
        migrate: state => ({ ...state, modified: 2 }),
      }),
      new Migration({
        toVersion: MATCHING_VERSION,
        fromVersionRange: '0.0.1 - 0.0.1',
        migrate: state => ({ ...state, modified: 1 }),
      }),
    ],
  },
] as ContentPluginConfig[];

const layout = [
  { name: 'bar', version: '0.0.2', Component: () => <div /> },
] as LayoutPluginConfig[];

const plugins = new PluginService({ content, layout });

const migrationEdgeCasePlugins = new PluginService({
  content: migrationEdgeCaseContent,
  layout,
});

describe('PluginService', () => {
  content.forEach(p => {
    it(`should find plugin ${p.name} ${p.version}`, () => {
      expect(
        plugins.findContentPlugin(p.name, p.version).plugin.name,
        'to equal',
        p.name
      );
    });
  });

  it(`should find plugin different version ${FOO} ${OLDEST_VERSION}`, () => {
    expect(
      plugins.findContentPlugin(FOO, OLDEST_VERSION).pluginWrongVersion.name,
      'to equal',
      FOO
    );
    expect(
      plugins.findContentPlugin(FOO, OLDEST_VERSION).pluginWrongVersion.version,
      'to equal',
      MATCHING_VERSION
    );
  });

  it(`should apply migrations`, () => {
    const plugin = plugins.findContentPlugin(FOO, OLDEST_VERSION)
      .pluginWrongVersion;
    const newState = plugins.migratePluginState({}, plugin, OLDEST_VERSION);
    expect(newState.modified, 'to equal', 1);
    expect(newState.old, 'to equal', undefined);
  });

  it(`should apply migrations even in edge case`, () => {
    const plugin = migrationEdgeCasePlugins.findContentPlugin(FOO, '0.0.0')
      .pluginWrongVersion;
    const newState = migrationEdgeCasePlugins.migratePluginState(
      {},
      plugin,
      '0.0.0'
    );
    expect(newState.modified, 'to equal', 1);
    expect(newState.old, 'to equal', 1);
  });

  layout.forEach(p => {
    it(`should find plugin ${p.name} ${p.version}`, () => {
      expect(
        plugins.findLayoutPlugin(p.name, p.version).plugin.name,
        'to equal',
        p.name
      );
    });
  });

  const np = {
    name: 'baz',
    version: '0.0.1',
    Component: () => <div />,
  } as ContentPluginConfig;
  it('should add a content plugin', () => {
    plugins.addContentPlugin(np);
    expect(
      plugins.findContentPlugin(np.name, np.version).plugin.name,
      'to equal',
      np.name
    );
    expect(plugins.plugins.content.length, 'to equal', 3);
  });

  it('should remove a content plugin', () => {
    plugins.removeContentPlugin(np.name);
    expect(plugins.plugins.content.length, 'to equal', 2);
  });

  it('should set content plugins', () => {
    plugins.setContentPlugins([np]);
    expect(
      plugins.findContentPlugin(np.name, np.version).plugin.name,
      'to equal',
      np.name
    );
    expect(plugins.plugins.content.length, 'to equal', 2);
  });

  it('should add a layout plugin', () => {
    plugins.addLayoutPlugin(np);
    expect(
      plugins.findLayoutPlugin(np.name, np.version).plugin.name,
      'to equal',
      np.name
    );
    expect(plugins.plugins.layout.length, 'to equal', 2);
  });

  it('should remove a layout plugin', () => {
    plugins.removeLayoutPlugin(np.name);
    expect(plugins.plugins.layout.length, 'to equal', 1);
  });

  it('should set layout plugins', () => {
    plugins.setLayoutPlugins([np]);
    expect(
      plugins.findLayoutPlugin(np.name, np.version).plugin.name,
      'to equal',
      np.name
    );
    expect(plugins.plugins.layout.length, 'to equal', 1);
  });

  it('should tell me when no native plugin is set', () => {
    expect(plugins.hasNativePlugin(), 'to be falsy');
  });

  it('should tell me when no native plugin is set', () => {
    const p = new PluginService({
      content,
      layout,
      native: () =>
        ({
          Component: () => <div />,
          name: 'ory/editor/core/content/default-native',
          version: '0.0.1',
          createInitialState: () => ({}),
        }),
    });
    expect(p.hasNativePlugin(), 'to be truthy');
    expect(p.createNativePlugin(), 'to be defined');
  });
});
