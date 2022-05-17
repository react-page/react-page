import { Select } from '@material-ui/core';
import React, { memo } from 'react';
import { useLang, useOption, useSetLang } from '../../core/components/hooks';

const SelectLang = () => {
  const languages = useOption('languages');
  const lang = useLang();
  const setLang = useSetLang();
  if (languages && languages?.length > 0) {
    return (
      <Select
        value={lang || ''}
        onChange={(e) => setLang(e.target.value as string)}
      >
        {languages.map((l) => (
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
