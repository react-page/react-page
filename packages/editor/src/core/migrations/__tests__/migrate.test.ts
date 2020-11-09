import { migrate } from '../migrate';
import { Migration } from '../Migration';
describe('migrate', () => {
  describe('cases with 1 migration', () => {
    const dataIn = {
      foo: 123,
      bar: ['a', 'b', 'c'],
    };
    const expectedOut = {
      foonew: 123,
      barNew: ['123a', '123b', '123c'],
    };
    type DataIn = typeof dataIn;
    type DataOut = typeof expectedOut;
    const migrations = [
      new Migration<DataIn, DataOut>({
        fromVersion: 0,
        toVersion: 1,
        migrate: (d) => {
          return {
            foonew: d.foo,
            barNew: d.bar.map((s) => d.foo + '' + s),
          };
        },
      }),
    ];
    it('updates dataIn with one migration that specifies higher version', () => {
      const result = migrate(dataIn, migrations, 0, {
        lang: 'en',
        plugins: [],
      });
      expect(result).toEqual(expectedOut);
    });

    it('does nothing if already up to date', () => {
      const result = migrate(
        {
          foonew: 432,
          barNew: ['432a', '432b', '432c'],
        },
        migrations,
        1,
        {
          lang: 'en',
          plugins: [],
        }
      );
      expect(result).toEqual({
        foonew: 432,
        barNew: ['432a', '432b', '432c'],
      });
    });
  });

  describe('cases with 2migration', () => {
    const dataIn = {
      foo: 123,
      bar: ['a', 'b', 'c'],
    };
    const expectedOut = {
      wrapped: {
        foonew: 123,
        barNew: ['123a', '123b', '123c'],
      },
    };
    type DataIn = typeof dataIn;
    type DataOut = typeof expectedOut;
    const migrations = [
      new Migration<
        DataIn,
        {
          foonew: number;
          barNew: string[];
        }
      >({
        fromVersion: 0,
        toVersion: 1,
        migrate: (d) => {
          return {
            foonew: d.foo,
            barNew: d.bar.map((s) => d.foo + '' + s),
          };
        },
      }),
      new Migration<
        {
          foonew: number;
          barNew: string[];
        },
        DataOut
      >({
        fromVersion: 1,
        toVersion: 2,
        migrate: (d) => {
          return {
            wrapped: d,
          };
        },
      }),
    ];
    it('updates dataIn with multiple migrations that specifies higher version', () => {
      const result = migrate(dataIn, migrations, 0, {
        lang: 'en',
        plugins: [],
      });
      expect(result).toEqual(expectedOut);
    });

    it('only applies migrations required', () => {
      const result = migrate(
        {
          foonew: 123,
          barNew: ['123a', '123b', '123c'],
        },
        migrations,
        1,
        {
          lang: 'en',
          plugins: [],
        }
      );
      expect(result).toEqual(expectedOut);
    });
  });

  describe('legacy support for string numbers', () => {
    const dataIn = {
      foo: 123,
      bar: ['a', 'b', 'c'],
    };
    const expectedOut = {
      wrapped: {
        foonew: 123,
        barNew: ['123a', '123b', '123c'],
      },
    };
    type DataIn = typeof dataIn;
    type DataOut = typeof expectedOut;
    const migrations = [
      new Migration<
        DataIn,
        {
          foonew: number;
          barNew: string[];
        }
      >({
        fromVersionRange: '^0.3.0',
        toVersion: '0.4.0',
        migrate: (d) => {
          return {
            foonew: d.foo,
            barNew: d.bar?.map((s) => d.foo + '' + s),
          };
        },
      }),
      new Migration<
        {
          foonew: number;
          barNew: string[];
        },
        DataOut
      >({
        fromVersion: '0.4.0',
        toVersion: '1.0.0',
        migrate: (d) => {
          return {
            wrapped: d,
          };
        },
      }),
    ];

    it('supports legacy string numbers', () => {
      const result = migrate(dataIn, migrations, '0.3.0', {
        lang: 'en',
        plugins: [],
      });

      expect(result).toEqual(expectedOut);
    });
  });
});
