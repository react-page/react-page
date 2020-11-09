import { Select } from '@material-ui/core';
import React, { memo } from 'react';
import { useLang, useOptions, useSetLang } from '../../core/components/hooks';

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
