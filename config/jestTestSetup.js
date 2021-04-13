const enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
const enableHooks = require('jest-react-hooks-shallow').default;

import React from 'react';
React.useLayoutEffect = React.useEffect;

enzyme.configure({ adapter: new EnzymeAdapter() });
enableHooks(jest);
