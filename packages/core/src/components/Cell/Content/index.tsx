import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  updateCellContent,
  UpdateCellContentAction,
} from '../../../actions/cell';
import { connect } from '../../../reduxConnect';
import {
  isEditMode,
  isInsertMode,
  isLayoutMode,
  isPreviewMode,
  isResizeMode,
} from '../../../selector/display';
import { ContentPluginProps } from '../../../service/plugin/classes';
import { ComponetizedCell, I18nField } from '../../../types/editable';
import scrollIntoViewWithOffset from '../utils/scrollIntoViewWithOffset';

export const getI18nState = ({
  stateI18n,
  state,
  lang,
}: {
  stateI18n: I18nField<unknown>;
  state: unknown;
  lang?: string;
}) => {
  if (!stateI18n || !lang) {
    return state;
  }
  return (
    stateI18n?.[lang] ??
    // find first non-empty
    stateI18n?.[Object.keys(stateI18n).find((l) => stateI18n[l])] ??
    state
  );
};
// TODO clean me up #157
class Content extends React.PureComponent<ComponetizedCell & { lang: string }> {
  private ref: HTMLDivElement;

  UNSAFE_componentWillReceiveProps(
    nextProps: ComponetizedCell & { lang: string }
  ) {
    const {
      node: { focused: was, scrollToCell: scrollToCellWas },
    } = this.props;
    const {
      lang,
      node: { focused: is, scrollToCell: scrollToCellIs, focusSource },
    } = nextProps;
    const {
      editable,
      id,

      node: {
        content: {
          plugin: {
            handleFocus = () => null,
            handleBlur = () => null,
            name = 'N/A',
            version = 'N/A',
          } = {},
          state = {},
          stateI18n = {},
        } = {},
        focused,
      },
    } = nextProps;

    // FIXME this is really shitty because it will break when the state changes before the blur comes through, see #157
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pass: ContentPluginProps = {
      editable,
      id,
      state: getI18nState({ lang, state, stateI18n }),
      focused: this.props.isEditMode && focused,
      readOnly: !isEditMode,
      onChange: this.onChange,
      name,
      lang,
      version,
      isEditMode: nextProps.isEditMode,
      isResizeMode: nextProps.isResizeMode,
      isPreviewMode: nextProps.isPreviewMode,
      isInsertMode: nextProps.isInsertMode,
      isLayoutMode: nextProps.isLayoutMode,
      remove: nextProps.removeCell,
    };

    // Basically we check if the focus state changed and if yes, we execute the callback handler from the plugin, that
    // can set some side effects.
    if (!scrollToCellWas && scrollToCellIs) {
      if (this.ref) {
        scrollIntoViewWithOffset(this.ref, 100);
      }
    }
    if (!was && is) {
      // We need this because otherwise we lose hotkey focus on elements like spoilers.
      // This could probably be solved in an easier way by listening to window.document?

      handleFocus(pass, focusSource, this.ref);
    } else if (was && !is) {
      handleBlur(pass);
    }
  }

  onRef = (ref: HTMLDivElement) => {
    this.ref = ref;
  };

  onChange = (state) => {
    this.props.updateCellContent(state, this.props.lang);
  };
  remove = () => {
    this.props.removeCell();
  };
  focus = (args) => {
    this.props.focusCell(args);
  };

  render() {
    const {
      lang,
      editable,
      id,
      node: {
        content: {
          plugin: {
            Component = () => null,
            name = 'N/A',
            version = 'N/A',
            text = 'unnamed plugin',
          } = {},
          state = {},
          stateI18n = null,
        } = {},
        focused,
      },
    } = this.props;
    const { blurCell } = this.props;

    let focusProps;
    if (!this.props.isPreviewMode) {
      focusProps = {
        onMouseDown: () => {
          if (!focused) {
            this.focus({ source: 'onMouseDown' });
          }
          return true;
        },
      };
    }
    // has in translation? if not, fall back to first nonEmpty or fallback to non i18n

    return (
      <div
        {...focusProps}
        tabIndex="-1"
        style={{ outline: 'none' }}
        ref={this.onRef}
        className="ory-cell-inner ory-cell-leaf"
      >
        <Component
          editable={editable}
          id={id}
          lang={lang}
          state={getI18nState({ lang, state, stateI18n })}
          focused={Boolean(this.props.isEditMode && focused)}
          name={name}
          text={text}
          version={version}
          readOnly={!this.props.isEditMode}
          onChange={this.onChange}
          focus={this.focus}
          blur={blurCell}
          isInsertMode={this.props.isInsertMode}
          isResizeMode={this.props.isResizeMode}
          isPreviewMode={this.props.isPreviewMode}
          isEditMode={this.props.isEditMode}
          isLayoutMode={this.props.isLayoutMode}
          remove={this.remove}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isEditMode,
  isLayoutMode,
  isPreviewMode,
  isInsertMode,
  isResizeMode,
});

const mapDispatchToProps = (
  dispatch: Dispatch<UpdateCellContentAction>,
  { id }: ComponetizedCell
) =>
  bindActionCreators(
    {
      updateCellContent: updateCellContent(id),
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch as any
  );

export default connect(mapStateToProps, mapDispatchToProps)(Content);
