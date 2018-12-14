/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */
import * as React from 'react';
import { v4 } from 'uuid';
import Icon from '@material-ui/icons/CropLandscape';
import GradientIcon from '@material-ui/icons/Gradient';
import ColorIcon from '@material-ui/icons/ColorLens';
import ImageIcon from '@material-ui/icons/Landscape';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

import ImageComponent from './components/Image';
import ColorComponent from './components/Color';
import LinearGradient from './components/LinearGradient';

import { colorToString } from 'ory-editor-ui';

import { BottomToolbar } from 'ory-editor-ui';

import ThemeProvider, { darkTheme } from 'ory-editor-ui/lib/ThemeProvider';
import { RGBColor } from 'ory-editor-ui/lib/ColorPicker';
import { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes';
import { ImageUploadType, ImageLoaded } from 'ory-editor-ui/lib/ImageUpload';

export const IMAGE_MODE_FLAG = 1;
export const COLOR_MODE_FLAG = 2;
export const GRADIENT_MODE_FLAG = 4;

export type PluginComponentState = {
  mode: number;
  backgroundColorPreview?: RGBColor;
  gradientDegPreview?: number;
  gradientDegPreviewIndex?: number;
  gradientOpacityPreview?: number;
  gradientOpacityPreviewIndex?: number;
  gradientColorPreview?: RGBColor;
  gradientColorPreviewIndex?: number;
  gradientColorPreviewColorIndex?: number;
  darkenPreview?: number;
  lightenPreview?: number;
  imagePreview?: ImageLoaded;
};

export type ExtraPluginProps = {
  defaultPlugin: ContentPluginProps;
  enabledModes: number;
  defaultBackgroundColor: RGBColor;
  defaultGradientColor: RGBColor;
  defaultGradientSecondaryColor: RGBColor;
  defaultMode: number;
  defaultModeFlag: number;
  defaultDarken: number;
  defaultLighten: number;
  defaultHasPadding: boolean;
  defaultIsParallax: boolean;
  imageUpload: ImageUploadType;
};

export type Gradient = {
  opacity: number;
  deg: number;
  colors?: { color: RGBColor }[];
};

export type OryState = {
  background: string;
  backgroundColor: RGBColor;
  isParallax: boolean;
  modeFlag: number;
  padding: number;
  lighten: number;
  darken: number;
  hasPadding: boolean;
  gradients: Gradient[];
};

export type PluginProps = ExtraPluginProps & ContentPluginProps<OryState>;

class PluginComponent extends React.Component<
  PluginProps,
  PluginComponentState
> {
  static defaultProps: Partial<PluginProps> = {
    defaultBackgroundColor: { r: 245, g: 0, b: 87, a: 1 },
    defaultGradientColor: { r: 245, g: 0, b: 87, a: 1 },
    defaultGradientSecondaryColor: { r: 71, g: 245, b: 87, a: 1 },
    defaultMode: 1,
    defaultModeFlag: 1,
    defaultDarken: 0.1,
    defaultLighten: 0,
    defaultHasPadding: true,
    defaultIsParallax: true,
    enabledModes: IMAGE_MODE_FLAG | COLOR_MODE_FLAG | GRADIENT_MODE_FLAG,
  };

  constructor(props: PluginProps) {
    super(props);
    this.state = {
      mode: props.defaultMode,
    };
  }

  handleChangeDarken: React.ChangeEventHandler = e => {
    this.props.onChange({ darken: this.state.darkenPreview });
    this.setState({ darkenPreview: undefined });
  }

  handleChangeDarkenPreview = (e: React.ChangeEvent, value: number) => {
    this.setState({ darkenPreview: value });
  }

  handleChangeLighten: React.ChangeEventHandler = () => {
    this.props.onChange({ lighten: this.state.lightenPreview });
    this.setState({ lightenPreview: undefined });
  }

  handleChangeLightenPreview = (e: React.ChangeEvent, value: number) => {
    this.setState({ lightenPreview: value });
  }

  handleChangeHasPadding: React.ChangeEventHandler = e => {
    this.props.onChange({
      hasPadding:
        this.props.state.hasPadding === undefined
          ? !this.props.defaultHasPadding
          : !this.props.state.hasPadding,
    });
  }

  handleChangeMode = (e: React.ChangeEvent, mode: number) =>
    this.setState({ mode })

  handleChangeBackgroundColorPreview = (e: RGBColor) =>
    this.setState({ backgroundColorPreview: e })

  handleChangeGradientDegPreview = (
    gradientDegPreview: number,
    gradientDegPreviewIndex?: number
  ) => this.setState({ gradientDegPreview, gradientDegPreviewIndex })

  handleChangeGradientOpacityPreview = (
    gradientOpacityPreview: number,
    gradientOpacityPreviewIndex?: number
  ) => this.setState({ gradientOpacityPreview, gradientOpacityPreviewIndex })

  handleChangeGradientColorPreview = (
    gradientColorPreview: RGBColor,
    gradientColorPreviewIndex?: number,
    gradientColorPreviewColorIndex?: number
  ) =>
    this.setState({
      gradientColorPreview,
      gradientColorPreviewIndex,
      gradientColorPreviewColorIndex,
    })

  handleImageLoaded = (imagePreview: ImageLoaded) =>
    this.setState({ imagePreview })

  handleImageUploaded = () => this.setState({ imagePreview: undefined });

  renderUI = () => {
    switch (this.state.mode) {
      case COLOR_MODE_FLAG:
        return (
          <React.Fragment>
            {this.renderModeSwitch()}
            <ColorComponent
              {...this.props}
              ensureModeOn={this.ensureModeOn(COLOR_MODE_FLAG)}
              onChangeBackgroundColorPreview={
                this.handleChangeBackgroundColorPreview
              }
              backgroundColorPreview={this.state.backgroundColorPreview}
            />
          </React.Fragment>
        );
      case GRADIENT_MODE_FLAG:
        return (
          <React.Fragment>
            {this.renderModeSwitch()}
            <LinearGradient
              {...this.props}
              ensureModeOn={this.ensureModeOn(GRADIENT_MODE_FLAG)}
              gradientDegPreview={this.state.gradientDegPreview}
              gradientDegPreviewIndex={this.state.gradientDegPreviewIndex}
              gradientOpacityPreview={this.state.gradientOpacityPreview}
              gradientOpacityPreviewIndex={
                this.state.gradientOpacityPreviewIndex
              }
              gradientColorPreview={this.state.gradientColorPreview}
              gradientColorPreviewIndex={this.state.gradientColorPreviewIndex}
              gradientColorPreviewColorIndex={
                this.state.gradientColorPreviewColorIndex
              }
              onChangeGradientDegPreview={this.handleChangeGradientDegPreview}
              onChangeGradientOpacityPreview={
                this.handleChangeGradientOpacityPreview
              }
              onChangeGradientColorPreview={
                this.handleChangeGradientColorPreview
              }
            />
          </React.Fragment>
        );
      case IMAGE_MODE_FLAG:
      default:
        return (
          <React.Fragment>
            {this.renderModeSwitch()}
            <ImageComponent
              {...this.props}
              onImageLoaded={this.handleImageLoaded}
              onImageUploaded={this.handleImageUploaded}
              ensureModeOn={this.ensureModeOn(IMAGE_MODE_FLAG)}
            />
          </React.Fragment>
        );
    }
  }

  ensureModeOn = (mode: number) => () => {
    const {
      state: { modeFlag = this.props.defaultModeFlag },
    } = this.props;
    if ((modeFlag & mode) === 0) {
      this.handleChangeModeSwitch(mode, modeFlag)();
    }
  }

  getStyles = () => {
    const {
      state: {
        background = '',
        modeFlag = this.props.defaultModeFlag,
        isParallax = true,
        backgroundColor = this.props.defaultBackgroundColor,
        gradients = [],
      },
    } = this.props;
    let styles: React.CSSProperties = {};
    if (modeFlag & GRADIENT_MODE_FLAG) {
      const usedGradients = gradients.filter(g => g.colors && g.colors.length);
      const usedGradientsString = usedGradients
        .map((g, i) => {
          const firstColor = g.colors[0].color;
          const firstColorStr = colorToString(firstColor);
          const deg =
            i === this.state.gradientDegPreviewIndex &&
            this.state.gradientDegPreview !== undefined
              ? this.state.gradientDegPreview
              : g.deg;
          const opacity =
            i === this.state.gradientOpacityPreviewIndex &&
            this.state.gradientOpacityPreview !== undefined
              ? this.state.gradientOpacityPreview
              : g.opacity;
          return (
            'linear-gradient(' +
            deg +
            'deg, ' +
            (g.colors.length !== 1
              ? g.colors
                  .map((c, cpIndex) => {
                    const color =
                      i === this.state.gradientColorPreviewIndex &&
                      cpIndex === this.state.gradientColorPreviewColorIndex &&
                      this.state.gradientColorPreview !== undefined
                        ? this.state.gradientColorPreview
                        : c.color;
                    const colorWithOpacity = {
                      ...color,
                      a: color.a !== undefined ? color.a * opacity : opacity,
                    };
                    return colorToString(colorWithOpacity);
                  })
                  .join(', ')
              : firstColorStr + ', ' + firstColorStr) +
            ')'
          );
        })
        .join(', ');
      if (usedGradientsString !== '') {
        styles = { ...styles, background: usedGradientsString };
      }
    }
    if (modeFlag & COLOR_MODE_FLAG) {
      const colorStr = colorToString(
        this.state.backgroundColorPreview
          ? this.state.backgroundColorPreview
          : backgroundColor
      );
      const modeStr = `linear-gradient(${colorStr}, ${colorStr})`;
      styles = {
        ...styles,
        background: styles.background
          ? styles.background + ', ' + modeStr
          : modeStr,
      };
    }
    if (modeFlag & IMAGE_MODE_FLAG) {
      const backgroundFinal = this.state.imagePreview
        ? this.state.imagePreview.dataUrl
        : background;
      const modeStr =
        `url('${backgroundFinal}') center / cover no-repeat` +
        (isParallax ? ' fixed' : '');
      styles = {
        ...styles,
        background: styles.background
          ? styles.background + ', ' + modeStr
          : modeStr,
      };
    }
    return styles;
  }

  handleChangeModeSwitch = (mode: number, modeFlag: number) => () => {
    modeFlag ^= mode;
    this.props.onChange({ modeFlag });
  }

  renderModeSwitch = () => {
    const {
      state: { modeFlag = this.props.defaultModeFlag },
    } = this.props;
    let label = 'ON/OFF';
    switch (this.state.mode) {
      case COLOR_MODE_FLAG:
        // label = 'Use color'
        break;
      case IMAGE_MODE_FLAG:
        // label = 'Use image'
        break;
      case GRADIENT_MODE_FLAG:
        // label = 'Use gradient'
        break;
      default:
        label = 'Unknown mode';
        break;
    }
    return (
      <FormControlLabel
        control={
          <Switch
            onChange={this.handleChangeModeSwitch(this.state.mode, modeFlag)}
            checked={Boolean(modeFlag & this.state.mode)}
          />
        }
        label={label}
      />
    );
  }

  render() {
    const {
      children,
      focused,
      readOnly,
      state: {
        darken = this.props.defaultDarken,
        lighten = this.props.defaultLighten,
        hasPadding = this.props.defaultHasPadding,
        modeFlag = this.props.defaultModeFlag,
      },
    } = this.props;
    let darkenFinal =
      this.state.darkenPreview !== undefined
        ? this.state.darkenPreview
        : darken;
    let lightenFinal =
      this.state.lightenPreview !== undefined
        ? this.state.lightenPreview
        : lighten;
    const containerStyles = this.getStyles();
    return (
      <ThemeProvider theme={darkTheme}>
        <div
          className="ory-prevent-blur ory-plugins-layout-background"
          style={{ ...containerStyles, ...(hasPadding ? {} : { padding: 0 }) }}
        >
          <div
            className="ory-plugins-layout-background__backstretch"
            style={{
              // tslint:disable-next-line:max-line-length
              backgroundImage: `linear-gradient(rgba(0, 0, 0, ${darkenFinal}), rgba(0, 0, 0, ${darkenFinal})),linear-gradient(rgba(255, 255, 255, ${lightenFinal}), rgba(255, 255, 255, ${lightenFinal}))`,
            }}
          />
          {!readOnly && (
            <BottomToolbar open={focused} theme={darkTheme}>
              <Tabs
                value={this.state.mode}
                onChange={this.handleChangeMode}
                centered={true}
              >
                {(this.props.enabledModes & IMAGE_MODE_FLAG) > 0 && (
                  <Tab
                    icon={
                      <ImageIcon
                        color={
                          (modeFlag & IMAGE_MODE_FLAG) > 0
                            ? 'secondary'
                            : undefined
                        }
                      />
                    }
                    label="Image"
                    value={IMAGE_MODE_FLAG}
                  />
                )}
                {(this.props.enabledModes & COLOR_MODE_FLAG) > 0 && (
                  <Tab
                    icon={
                      <ColorIcon
                        color={
                          (modeFlag & COLOR_MODE_FLAG) > 0
                            ? 'secondary'
                            : undefined
                        }
                      />
                    }
                    label="Color"
                    value={COLOR_MODE_FLAG}
                  />
                )}
                {(this.props.enabledModes & GRADIENT_MODE_FLAG) > 0 && (
                  <Tab
                    icon={
                      <GradientIcon
                        color={
                          (modeFlag & GRADIENT_MODE_FLAG) > 0
                            ? 'secondary'
                            : undefined
                        }
                      />
                    }
                    label="Gradient"
                    value={GRADIENT_MODE_FLAG}
                  />
                )}
              </Tabs>
              {this.renderUI()}
              <br />
              <div style={{ display: 'flex' }}>
                <div style={{ flex: '1', marginRight: '8px' }}>
                  <Typography variant="body1" id="linear-gradient-darken-label">
                    Darken ({(darkenFinal * 100).toFixed(0)}
                    %)
                  </Typography>
                  <Slider
                    aria-labelledby="linear-gradient-darken-label"
                    value={darkenFinal}
                    onChange={this.handleChangeDarkenPreview}
                    onDragEnd={this.handleChangeDarken}
                    step={0.01}
                    min={0}
                    max={1}
                  />
                </div>
                <div style={{ flex: '1', marginLeft: '8px' }}>
                  <Typography
                    variant="body1"
                    id="linear-gradient-lighten-label"
                  >
                    Lighten ({(lightenFinal * 100).toFixed(0)}
                    %)
                  </Typography>
                  <Slider
                    aria-labelledby="linear-gradient-lighten-label"
                    value={lightenFinal}
                    onChange={this.handleChangeLightenPreview}
                    onDragEnd={this.handleChangeLighten}
                    step={0.01}
                    min={0}
                    max={1}
                  />
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={this.handleChangeHasPadding}
                      checked={hasPadding}
                    />
                  }
                  label="Use padding"
                />
              </div>
            </BottomToolbar>
          )}
          {children}
        </div>
      </ThemeProvider>
    );
  }
}

export default ({
  defaultPlugin,
  defaultMode = PluginComponent.defaultProps.defaultMode,
  defaultModeFlag = PluginComponent.defaultProps.defaultModeFlag,
  defaultBackgroundColor = PluginComponent.defaultProps.defaultBackgroundColor,
  defaultGradientColor = PluginComponent.defaultProps.defaultGradientColor,
  defaultGradientSecondaryColor = PluginComponent.defaultProps
    .defaultGradientSecondaryColor,
  defaultDarken = PluginComponent.defaultProps.defaultDarken,
  defaultLighten = PluginComponent.defaultProps.defaultLighten,
  defaultIsParallax = PluginComponent.defaultProps.defaultIsParallax,
  defaultHasPadding = PluginComponent.defaultProps.defaultHasPadding,
  imageUpload,
  enabledModes = PluginComponent.defaultProps.enabledModes,
}: PluginProps) => {
  const settings: ExtraPluginProps = {
    defaultPlugin,
    defaultMode,
    defaultModeFlag,
    defaultBackgroundColor,
    defaultGradientColor,
    defaultGradientSecondaryColor,
    defaultDarken,
    defaultLighten,
    defaultIsParallax,
    defaultHasPadding,
    imageUpload,
    enabledModes,
  };
  return {
    Component: (componentProps: ContentPluginProps<OryState>) => (
      <PluginComponent {...componentProps} {...settings} />
    ),
    name: 'ory/editor/core/layout/background',
    version: '0.0.1',

    text: 'Background',
    IconComponent: <Icon />,

    createInitialChildren: () => ({
      id: v4(),
      rows: [
        {
          id: v4(),
          cells: [
            {
              content: {
                plugin: defaultPlugin,
                state: defaultPlugin.createInitialState(),
              },
              id: v4(),
            },
          ],
        },
      ],
    }),

    handleFocusNextHotKey: () => Promise.reject(),
    handleFocusPreviousHotKey: () => Promise.reject(),
  };
};
