import React from 'react';
import { shallow } from 'enzyme';

import EditorUI from '../';

describe('EditorUI', () => {
  const defaultProps = {
    stickyNotes: {
      shouldStickToTop: false,
      shouldStickToBottom: false,
      rightOffset: 0,
    },
    hideEditorSidebar: false,
  };

  it('renders correctly with default properties', () => {
    const component = shallow(<EditorUI {...defaultProps} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with option to hide the editor sidebar', () => {
    const component = shallow(<EditorUI {...defaultProps} hideEditorSidebar />);

    expect(component.find('DisplayModeToggle')).toHaveLength(0);
  });
});
