import { Actions, connect, Selectors, useEditor } from '@react-page/core';
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { Select } from '@material-ui/core';

const SelectLang = ({ lang = null, setLang, ...rest }) => {
  const editor = useEditor();
  if (editor.languages?.length > 0) {
    return (
      <Select value={lang} onChange={(e) => setLang(e.target.value)}>
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

const mapStateToProps = createStructuredSelector({
  lang: Selectors.Setting.getLang,
});

const mapDispatchToProps = {
  setLang: Actions.Setting.setLang,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectLang);
