import { DOMParser } from 'xmldom';

export default (html: string) => {
  return new DOMParser().parseFromString(html, 'text/html');
};
