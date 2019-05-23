import { SlateSettings } from '../types/settings';

export const defaultTranslations = {
  pluginName: 'Text',
  pluginDescription: 'An advanced rich text area.',
  placeholder: 'Write here...',
  linkPlugin: {
    cancel: 'Cancel',
    ok: 'Ok',
    createLink: 'Create a link',
    linkTitlePlaceholder: 'Link title',
    linkHrefPlaceholder: 'http://example.com/my/link.html',
  },
};

export const defaultSettings: SlateSettings = {
  translations: defaultTranslations,
};
