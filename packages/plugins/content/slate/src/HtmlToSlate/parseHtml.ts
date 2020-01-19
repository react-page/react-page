const { JSDOM } = require('jsdom');

const DOMParser = new JSDOM().window.DOMParser;
export default (html: string) => {
  return new DOMParser().parseFromString(html, 'text/html');
};
