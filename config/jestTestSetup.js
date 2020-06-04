const enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

import React from 'react';
React.useLayoutEffect = React.useEffect;

enzyme.configure({ adapter: new EnzymeAdapter() });
