import * as React from 'react';
import { ParallaxBackgroundRendererProps } from 'src/types/renderer';
import { defaultState } from '../default/state';

const ParallaxBackgroundHtmlRenderer: React.SFC<
  ParallaxBackgroundRendererProps
> = props => {
  const {
    children,
    state: {
      darken = defaultState.darken,
      background = defaultState.background,
    },
  } = props;
  return (
    <div
      className="ory-plugins-layout-parallax-background"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, ${darken}), rgba(0, 0, 0, ${darken})), url('${background}')`,
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxBackgroundHtmlRenderer;
