import expect from 'unexpected';

import Editor from '../index';

const editor = new Editor();

describe('Editor', () => {
  it('should instantiate', () => {
    expect(editor, 'to be defined');
  });
});
