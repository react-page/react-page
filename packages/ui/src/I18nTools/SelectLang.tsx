import { Select } from '@material-ui/core';
import { useEditor, useLang, useOptions, useSetLang } from '@react-page/core';
import React, { memo } from 'react';

const SelectLang = () => {
  const options = useOptions();
  const lang = useLang();
  const setLang = useSetLang();
  if (options.languages?.length > 0) {
    return (
      <Select value={lang} onChange={(e) => setLang(e.target.value as string)}>
        {options.languages.map((l) => (
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
