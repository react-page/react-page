import * as React from 'react';
import { BackgroundRendererProps } from '../types/renderer';
import { ModeEnum } from '../types/modeEnum';
import { colorToString } from '@react-page/ui/lib/ColorPicker';

const getStyles = (props: BackgroundRendererProps) => {
  const {
    state: {
      background = '',
      modeFlag = props.defaultModeFlag,
      isParallax = true,
      backgroundColor = props.defaultBackgroundColor,
      gradients = [],
    },
  } = props;
  let styles: React.CSSProperties = {};
  if (modeFlag & ModeEnum.GRADIENT_MODE_FLAG) {
    const usedGradients = gradients.filter(g => g.colors && g.colors.length);
    const usedGradientsString = usedGradients
      .map((g, i) => {
        const firstColor = g.colors[0].color;
        const firstColorStr = colorToString(firstColor);
        const deg =
          i === props.gradientDegPreviewIndex &&
          props.gradientDegPreview !== undefined
            ? props.gradientDegPreview
            : g.deg;
        const opacity =
          i === props.gradientOpacityPreviewIndex &&
          props.gradientOpacityPreview !== undefined
            ? props.gradientOpacityPreview
            : g.opacity;
        return (
          'linear-gradient(' +
          deg +
          'deg, ' +
          (g.colors.length !== 1
            ? g.colors
                .map((c, cpIndex) => {
                  const color =
                    i === props.gradientColorPreviewIndex &&
                    cpIndex === props.gradientColorPreviewColorIndex &&
                    props.gradientColorPreview !== undefined
                      ? props.gradientColorPreview
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
  if (modeFlag & ModeEnum.COLOR_MODE_FLAG) {
    const colorStr = colorToString(
      props.backgroundColorPreview
        ? props.backgroundColorPreview
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
  if (modeFlag & ModeEnum.IMAGE_MODE_FLAG) {
    const backgroundFinal = props.imagePreview
      ? props.imagePreview.dataUrl
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
};

const BackgroundHtmlRenderer: React.SFC<
  BackgroundRendererProps
> = props => {
  const {
    children,
    state: {
      darken = props.defaultDarken,
      lighten = props.defaultLighten,
      hasPadding = props.defaultHasPadding,
    },
  } = props;
  let darkenFinal =
    props.darkenPreview !== undefined ? props.darkenPreview : darken;
  let lightenFinal =
    props.lightenPreview !== undefined ? props.lightenPreview : lighten;
  const containerStyles = getStyles(props);
  return (
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
      {children}
    </div>
  );
};

export default BackgroundHtmlRenderer;
