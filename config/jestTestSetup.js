const enzyme = require("enzyme");
const EnzymeAdapter = require("enzyme-adapter-react-16");

enzyme.configure({ adapter: new EnzymeAdapter() });