import slate from '../index';
import { HtmlToSlate } from '../htmlToSlate';
import defaultPlugins from '../plugins';
import makeSlatePluginsFromDef from '../utils/makeSlatePluginsFromDef';

const htmlToSlate = HtmlToSlate({
  plugins: makeSlatePluginsFromDef(defaultPlugins),
});
describe('getTextContents', () => {
  const mySlate = slate();

  it('serializes a slate to raw text', async () => {
    // we use `htmlToSlate` to generate simple values
    const data = await htmlToSlate(
      `<h1>Hello <em>World</em>!</h1>
      <p>How are <strong>you</strong>?</p>
      `
    );

    const contents = mySlate.getTextContents(data);
    expect(contents).toEqual(['Hello World!', 'How are you?']);
  });

  it('handles inline blocks correctly', async () => {
    // we use `htmlToSlate` to generate simple values
    const data = await htmlToSlate(
      `<h1>Hello <a href="http://world.com">World</a>!</h1>
      <p>How are <strong>you</strong>?</p>
      `
    );

    const contents = mySlate.getTextContents(data);
    expect(contents).toEqual(['Hello World!', 'How are you?']);
  });

  it('handles lists correctly', async () => {
    // we use `htmlToSlate` to generate simple values
    const data = await htmlToSlate(
      `<ul><li>one</li><li>two</li><li>three</li></ul>
      `
    );

    const contents = mySlate.getTextContents(data);
    expect(contents).toEqual(['one', 'two', 'three']);
  });
});
