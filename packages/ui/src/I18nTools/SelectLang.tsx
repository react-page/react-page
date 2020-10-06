import { Select } from '@material-ui/core';
import { useEditor, useLang, useSetLang } from '@react-page/core';
import React, { memo } from 'react';

const SelectLang = () => {
  const editor = useEditor();
  const lang = useLang();
  const setLang = useSetLang();
  if (editor.languages?.length > 0) {
    return (
      <Select value={lang} onChange={(e) => setLang(e.target.value as string)}>
        {editor.languages.map((l) => (
          <option key={l.lang} value={l.lang}>
            {l.label}
          </option>
        ))}
      </Select>
    );
  }
  return null;
};

export default memo(SelectLang);
