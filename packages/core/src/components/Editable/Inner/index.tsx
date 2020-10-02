import throttle from 'lodash.throttle';
import * as React from 'react';
import { createStructuredSelector } from 'reselect';
import { createFallbackCell } from '../../../actions/cell';
import scrollIntoViewWithOffset from '../../../components/Cell/utils/scrollIntoViewWithOffset';
import { connect } from '../../../reduxConnect';
import { RootState } from '../../../selector';
import { purifiedEditable } from '../../../selector/editable';
import {
  ContentPlugin,
  ContentPluginConfig,
  LayoutPlugin,
  LayoutPluginConfig,
} from '../../../service/plugin/classes';
import {
  EditableComponentState,
  SimplifiedModesProps,
} from '../../../types/editable';
import Cell from '../../Cell';
import dimensions from '../../Dimensions';
function isElementInViewport(el: HTMLDivElement) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /*or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /*or $(window).width() */
  );
}
export type EditableInnerProps = EditableComponentState & SimplifiedModesProps;
class Inner extends React.PureComponent<EditableInnerProps> {
  ref = React.createRef<HTMLDivElement>();
  firstElementInViewport = null;

  onScroll = throttle(() => {
    if (this.ref.current) {
      const firstInViewport: HTMLDivElement = Array.prototype.find.call(
        this.ref.current.getElementsByClassName('ory-cell'),
        (cell: HTMLDivElement) => isElementInViewport(cell)
      );
      if (firstInViewport) {
        this.firstElementInViewport = {
          el: firstInViewport,
          topOffset: firstInViewport.getBoundingClientRect().top,
        };
      } else {
        this.firstElementInViewport = null;
      }
    }
  }, 600);

  componentDidMount() {
    this.createFallbackCell();
    window.addEventListener('scroll', this.onScroll);
  }

  componentDidUpdate(oldProps: EditableInnerProps) {
    this.createFallbackCell();
    if (oldProps.displayMode !== this.props.displayMode) {
      if (this.firstElementInViewport) {
        const { el, topOffset } = this.firstElementInViewport;
        setTimeout(() => {
          scrollIntoViewWithOffset(el, topOffset, 'auto');
        }, 0);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  createFallbackCell = () => {
    const { node, defaultPlugin, id } = this.props;

    if (!node) {
      return;
    }

    const { cells = [] } = node;
    if (cells.length === 0) {
      // FIXME: one more reason to unify layout and content plugins...
      if ((defaultPlugin as LayoutPluginConfig).createInitialChildren) {
        this.props.createFallbackCell(new LayoutPlugin(defaultPlugin), id);
      } else {
        this.props.createFallbackCell(
          new ContentPlugin(defaultPlugin as ContentPluginConfig),
          id
        );
      }
    }
  };

  render() {
    const { id, containerWidth, containerHeight, node, ...rest } = this.props;

    if (!node) {
      return null;
    }

    const { cells = [] } = node;
    return (
      <div ref={this.ref} className="ory-editable">
        {cells.map((c: string) => (
          <Cell
            rowWidth={containerWidth}
            rowHeight={containerHeight}
            editable={id}
            ancestors={[]}
            key={c}
            id={c}
            {...rest}
          />
        ))}
      </div>
    );
  }
}

export const displayMode = ({
  reactPage: {
    display: { mode },
  },
}: RootState): string => mode;

const mapStateToProps = createStructuredSelector({
  node: purifiedEditable,
  displayMode,
});

const mapDispatchToProps = { createFallbackCell };

export default dimensions()(
  connect(mapStateToProps, mapDispatchToProps)(Inner)
);
