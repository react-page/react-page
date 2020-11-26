import { shallow } from 'enzyme';
import React from 'react';

import Component from '../index';

describe('components/Cell/Rows', () => {
  xit('renders a single div', () => {
    const wrapper = shallow(<Component nodeId="some-node-id" />);
    expect(wrapper.find('.react-page-cell-rows')).toHaveLength(1);
  });
});
