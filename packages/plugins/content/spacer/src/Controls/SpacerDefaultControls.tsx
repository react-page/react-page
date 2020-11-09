import TextField from '@material-ui/core/TextField';
import { BottomToolbar } from '@react-page/ui';
import classNames from 'classnames';
import * as React from 'react';
import { Resizable } from 'react-resizable';
import { SpacerControlsProps } from '../types/controls';
import { defaultSpacerState } from './../default/state';

const faintBlack = 'rgba(0, 0, 0, 0.12)';

const SpacerDefaultControls: React.SFC<SpacerControlsProps> = (props) => {
  const {
    isPreviewMode,
    isEditMode,
    remove,
    Renderer,
    changeHeightPreview,
    commitHeight,
    data = defaultSpacerState,
  } = props;
  return (
    <div
      style={{ border: 'solid 1px', borderColor: faintBlack }}
      className={classNames('react-page-plugins-content-spacer', {
        'react-page-plugins-content-spacer-read-only': isPreviewMode,
      })}
    >
      {!isEditMode ? (
        <Renderer {...props} />
      ) : (
        <Resizable
          onResize={(e, data) => changeHeightPreview(data.size.height)}
          onResizeStop={(e, data) => commitHeight(data.size.height)}
          height={data?.height}
          width={0}
        >
          <div style={{ height: data?.height, position: 'relative' }}>
            <BottomToolbar
              {...props}
              icon={props.pluginConfig.IconComponent}
              open={props.focused}
              title={props.translations.pluginName}
              onDelete={remove}
            >
              <TextField
                placeholder="24"
                label={props.translations.elementHeightLabel}
                style={{ width: '512px' }}
                value={data?.height}
                onChange={(e) =>
                  changeHeightPreview(parseInt(e.target.value, 10))
                }
                onBlur={() => commitHeight()}
                type="number"
              />
            </BottomToolbar>
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                height: '24px',
                width: '100%',
                background: faintBlack,
                textAlign: 'center',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                style={{ color: 'white', width: 24, height: 24 }}
              >
                <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
              </svg>
            </div>
          </div>
        </Resizable>
      )}
    </div>
  );
};

export default SpacerDefaultControls;
