import * as React from 'react';
import expect from 'unexpected';

import PluginService from '../index';
import {PluginBase} from '../classes';
import { Migration } from '../../../migrations/Migration';

const FOO = 'foo';
const OLDEST_VERSION = '0.0.1';
const OLDER_VERSION = '0.0.2';
const MATCHING_VERSION = '0.0.3';

const content = [
  {
    name: FOO,
    version: MATCHING_VERSION,
    Component: () => <div />,
    migrations: [
      new Migration({
        toVersion: OLDEST_VERSION,
        fromVersionRange: '0.0.0 - 0.0.0',
        migrate: (state) => ({ ...state, old: 1 }),
      }),
      new Migration({
        toVersion: OLDER_VERSION,
        fromVersionRange: '0.0.1 - 0.0.1',
        migrate: (state) => ({ ...state, modified: 2 }),
      }),
      new Migration({
        toVersion: MATCHING_VERSION,
        fromVersionRange: '0.0.2 - 0.0.2',
        migrate: (state) => ({ ...state, modified: 1 }),
      }),
    ],
  },
] as PluginBase[];

const migrationEdgeCaseContent = [
  {
    name: FOO,
    version: MATCHING_VERSION,
    Component: () => <div />,
    migrations: [
      new Migration({
        toVersion: OLDEST_VERSION,
        fromVersionRange: '0.0.2 - 0.0.2',
        migrate: (state) => ({ ...state, old: 1 }),
      }),
      new Migration({
        toVersion: OLDER_VERSION,
        fromVersionRange: '0.0.0 - 0.0.0',
        migrate: (state) => ({ ...state, modified: 2 }),
      }),
      new Migration({
        toVersion: MATCHING_VERSION,
        fromVersionRange: '0.0.1 - 0.0.1',
        migrate: (state) => ({ ...state, modified: 1 }),
      }),
    ],
  },
] as PluginBase[];

const layout = [
  { name: 'bar', version: '0.0.2', Component: () => <div /> },
] asPluginBase[];

const plugins = new PluginService({ content, layout });

const migrationEdgeCasePlugins = new PluginService({
  content: migrationEdgeCaseContent,
  layout,
});

describe('PluginService', () => {
  content.forEach((p) => {
    it(`should find plugin ${p.name} ${p.version}`, () => {
      expect(
        plugins.findPluginBase(p.name, p.version).plugin.name,
        'to equal',
        p.name
      );
    });
  });

  it(`should find plugin different version ${FOO} ${OLDEST_VERSION}`, () => {
    expect(
      plugins.findPluginBase(FOO, OLDEST_VERSION).pluginWrongVersion.name,
      'to equal',
      FOO
    );
    expect(
      plugins.findPluginBase(FOO, OLDEST_VERSION).pluginWrongVersion.version,
      'to equal',
      MATCHING_VERSION
    );
  });

  it(`should apply migrations`, () => {
    const plugin = plugins.findPluginBase(FOO, OLDEST_VERSION)
      .pluginWrongVersion;
    const newState = plugins.migratePluginState({}, plugin, OLDEST_VERSION);
    expect(newState.modified, 'to equal', 1);
    expect(newState.old, 'to equal', undefined);
  });

  it(`should apply migrations even in edge case`, () => {
    const plugin = migrationEdgeCasePlugins.findPluginBase(FOO, '0.0.0')
      .pluginWrongVersion;
    const newState = migrationEdgeCasePlugins.migratePluginState(
      {},
      plugin,
      '0.0.0'
    );
    expect(newState.modified, 'to equal', 1);
    expect(newState.old, 'to equal', 1);
  });

  layout.forEach((p) => {
    it(`should find plugin ${p.name} ${p.version}`, () => {
      expect(
        plugins.findLayoutPlugin(p.name, p.version).plugin.name,
        'to equal',
        p.name
      );
    });
  });
});
