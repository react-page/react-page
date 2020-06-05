import '@react-page/core/lib/index.css'; // we also want to load the stylesheets
import Editor from '@react-page/editor';
import '@react-page/ui/lib/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
// The content state
import contents from './contents';
import customLayoutPluginWithInitialState from './customLayoutPluginWithInitialState';
import { plugins } from './plugins';
import './styles.css';
import {
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  Select,
} from '@material-ui/core';
import { defaultSlate } from './slate';
import { EditorProps } from '@react-page/editor';

if (
  process.env.NODE_ENV !== 'production' &&
  process.env.REACT_APP_TRACE_UPDATES
) {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

const LANGUAGES = [
  {
    lang: 'en',
    label: 'English',
  },
  {
    lang: 'de',
    label: 'Deutsch',
  },
];
const KeepStateEditor: React.FC<EditorProps> = ({ value, ...props }) => {
  const [state, setState] = React.useState(value);

  // here you would normally persist the state somewhere (e.g a database)
  // <Editor /> is stateful, so you don't nesseary have to keep the value updated
  // if you do, you have to guarantee that the value is referencially equal to what has been passed by `onChange`
  // or the editor will blur its fields (and other problems)

  const [allowMove, setAllowMove] = React.useState(true);
  const onAllowMoveChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
      setAllowMove(checked),
    []
  );
  const [allowResize, setAllowResize] = React.useState(true);
  const onAllowResizeChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
      setAllowResize(checked),
    []
  );

  const [hide, sethide] = React.useState(false);

  const onSethideChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
      sethide(checked),
    []
  );

  const [lang, setLang] = React.useState('en');

  const onSetLang = React.useCallback(
    (e: React.ChangeEvent<{ name?: string; value: unknown }>) =>
      setLang(e.target.value as string),
    []
  );
  return (
    <>
      <FormGroup row={true}>
        <FormControlLabel
          control={
            <Switch
              checked={allowMove}
              onChange={onAllowMoveChanged}
              color="primary"
            />
          }
          label="Allow move in edit mode"
        />
        <FormControlLabel
          control={
            <Switch
              checked={allowResize}
              onChange={onAllowResizeChanged}
              color="primary"
            />
          }
          label="Allow resize in edit mode"
        />
        <FormControlLabel
          control={
            <Switch
              checked={hide}
              onChange={onSethideChanged}
              color="primary"
            />
          }
          label="hide"
        />
        <FormControlLabel
          style={{ marginLeft: 20 }}
          control={
            <Select value={lang} onChange={onSetLang}>
              {LANGUAGES.map((l) => (
                <option value={l.lang} key={l.lang}>
                  {l.label}
                </option>
              ))}
            </Select>
          }
          label="Language"
        />
      </FormGroup>
      <div
        style={{
          display: hide ? 'none' : 'block',
        }}
      >
        <Editor
          {...props}
          allowMoveInEditMode={allowMove}
          allowResizeInEditMode={allowResize}
          value={state}
          onChange={setState}
          onChangeLang={setLang}
          lang={lang}
          languages={LANGUAGES}
        />
        <Button variant="outlined" onClick={() => setState(value)}>
          Reset this editor
        </Button>
      </div>
    </>
  );
};
// Render the editables - the areas that are editable
const elements = document.querySelectorAll<HTMLDivElement>('.editable');
elements.forEach((element, index) => {
  ReactDOM.render(
    <KeepStateEditor
      plugins={plugins}
      defaultPlugin={
        element.dataset.id === '10'
          ? customLayoutPluginWithInitialState()
          : defaultSlate
      }
      value={contents[index]}
    />,

    element
  );
});

// Render as beautified mark up (html)
ReactDOM.render(
  <Editor plugins={plugins} value={contents[0]} readOnly={true} />,
  document.getElementById('editable-static')
);
