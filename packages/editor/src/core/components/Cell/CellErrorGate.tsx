import React from 'react';
import ErrorCell from './ErrorCell';

export const CellErrorGate = class extends React.Component<
  {
    children: React.ReactNode;
    nodeId: string;
    shouldShowError?: boolean;
  },
  { error: Error | null }
> {
  state = {
    error: null,
  };
  componentDidCatch(error: Error) {
    this.setState({ error });
    console.error(error);
  }

  reset() {
    this.setState({ error: null });
  }

  render() {
    if (this.state.error && this.props.shouldShowError) {
      return (
        <ErrorCell
          nodeId={this.props.nodeId}
          error={this.state.error}
          resetError={this.reset.bind(this)}
        />
      );
    }
    return this.props.children;
  }
};
