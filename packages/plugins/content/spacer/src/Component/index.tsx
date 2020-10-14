import * as React from 'react';
import { SpacerProps } from './../types/component';

export interface SpacerState {
  height: number;
}

class Spacer extends React.PureComponent<SpacerProps, SpacerState> {
  constructor(props: SpacerProps) {
    super(props);
    this.state = {
      height: undefined,
    };
    this.changeHeightPreview = this.changeHeightPreview.bind(this);
    this.commitHeight = this.commitHeight.bind(this);
  }

  render() {
    const { Controls } = this.props;
    return (
      <Controls
        {...this.props}
        state={{
          height: this.state.height
            ? this.state.height
            : this.props.data?.height,
        }}
        changeHeightPreview={this.changeHeightPreview}
        commitHeight={this.commitHeight}
      />
    );
  }

  private changeHeightPreview(height: number) {
    if (!height || height < 24) {
      height = 24;
    }
    this.setState({ height });
  }

  private commitHeight(height: number) {
    let h = height ? height : this.state.height;
    if (!h || h < 24) {
      h = 24;
    }
    this.setState({ height: undefined }, () =>
      this.props.onChange({ height: h })
    );
  }
}

export default Spacer;
