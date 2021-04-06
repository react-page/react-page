import throttle from 'lodash.throttle';
import React from 'react';
import { useEffect, useRef } from 'react';

import scrollIntoViewWithOffset from '../../Cell/utils/scrollIntoViewWithOffset';

import InsertNew from '../../Cell/InsertNew';
import Row from '../../Row';
import {
  useDisplayMode,
  useOptions,
  useValueNode,
  useCellSpacing,
} from '../../hooks';

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

const Inner: React.FC = () => {
  const { rowIds } = useValueNode((editable) => ({
    rowIds: editable?.rows?.map((c) => c.id) ?? [],
  }));

  const ref = useRef<HTMLDivElement>();
  const options = useOptions();
  const RowComponent = options.components?.Row ?? Row;

  const firstElementInViewPortref = React.useRef<{
    el: HTMLDivElement;
    topOffset: number;
  }>();
  useEffect(() => {
    const onScroll = throttle(() => {
      if (ref.current) {
        const firstInViewport: HTMLDivElement = Array.prototype.find.call(
          ref.current.getElementsByClassName('react-page-cell'),
          (cell: HTMLDivElement) => isElementInViewport(cell)
        );
        if (firstInViewport) {
          firstElementInViewPortref.current = {
            el: firstInViewport,
            topOffset: firstInViewport.getBoundingClientRect().top,
          };
        } else {
          firstElementInViewPortref.current = null;
        }
      }
    }, 600);

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  useEffect(() => {
    if (firstElementInViewPortref.current) {
      const { el, topOffset } = firstElementInViewPortref.current;
      setTimeout(() => {
        scrollIntoViewWithOffset(el, topOffset, 'auto');
      }, 0);
    }
  }, [firstElementInViewPortref.current]);
  const mode = useDisplayMode();
  const { y: cellSpacingY } = useCellSpacing();
  const insertAllowed = options.childConstraints?.maxChildren
    ? options.childConstraints?.maxChildren > rowIds.length
    : true;

  return (
    <div
      ref={ref}
      style={{ minHeight: 480 }}
      className={'react-page-editable react-page-editable-mode-' + mode}
    >
      {rowIds.length > 0 ? (
        <div
          style={
            cellSpacingY !== 0
              ? { margin: `${-cellSpacingY / 2}px 0` }
              : undefined
          }
        >
          {rowIds.map((id) => (
            <RowComponent nodeId={id} key={id} />
          ))}
        </div>
      ) : null}
      {insertAllowed ? <InsertNew /> : null}
    </div>
  );
};

export default React.memo(Inner);
