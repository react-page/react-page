import { DOMParser } from '@xmldom/xmldom';

export default (html: string) => {
  return new DOMParser().parseFromString(html, 'text/html');
};
