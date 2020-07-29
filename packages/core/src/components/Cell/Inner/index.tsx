import * as React from 'react';

import Droppable from '../Droppable';
import Draggable from '../Draggable';
import Rows from '../Rows';
import Layout from '../Layout';
import Content from '../Content';
import ErrorCell from '../ErrorCell';

import {
  ComponetizedCell,
  SimplifiedModesProps,
} from '../../../types/editable';

export type CellInnerProps = ComponetizedCell & SimplifiedModesProps;

class Inner extends React.PureComponent<CellInnerProps, { error: Error }> {
  state = {
    error: null,
  };
  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return <ErrorCell {...this.props} error={this.state.error} />;
    }
    const {
      node: {
        rows = [],
        layout: {
          plugin: {
            Component: LayoutComponent = undefined,
            name: layoutType = undefined,
            text: layoutTitle = undefined,
          } = {},
        } = {},
        content: {
          plugin: {
            Component: ContentComponent = undefined,
            name: contentType = undefined,
            text: contentTitle = undefined,
          } = {},
        } = {},
      },
      config: { whitelist = [] },
    } = this.props;

    if (rows.length && LayoutComponent) {
      return (
        <Droppable {...this.props} dropTypes={whitelist}>
          <Draggable
            {...this.props}
            dragType={layoutType}
            name={layoutTitle || layoutType}
          >
            <Layout {...this.props} />
          </Draggable>
        </Droppable>
      );
    } else if (rows.length) {
      return (
        <Droppable {...this.props} dropTypes={whitelist}>
          <Rows {...this.props} />
        </Droppable>
      );
    } else if (ContentComponent) {
      return (
        <Droppable {...this.props} isLeaf={true} dropTypes={whitelist}>
          <Draggable
            {...this.props}
            isLeaf={true}
            dragType={contentType}
            name={contentTitle || contentType}
          >
            <Content {...this.props} />
          </Draggable>
        </Droppable>
      );
    }

    return (
      <ErrorCell
        {...this.props}
        error={new Error('The content plugin could not be found.')}
      />
    );
  }
}

export default Inner;
