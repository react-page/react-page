import throttle from 'lodash.throttle';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useMeasure } from 'react-use';
import { useEditableNode } from '../../..';
import scrollIntoViewWithOffset from '../../../components/Cell/utils/scrollIntoViewWithOffset';
import Cell from '../../Cell';
import { useInsertCellAtTheEnd } from '../../hooks';

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
type Props = {
  id: string;
};
const Inner: React.FC<Props> = () => {
  const node = useEditableNode();
  const ref = useRef<HTMLDivElement>();
  const [sizeRef, { width }] = useMeasure();
  const cells = node?.cells ?? [];

  const firstElementInViewPortref = React.useRef<{
    el: HTMLDivElement;
    topOffset: number;
  }>();
  useEffect(() => {
    const onScroll = throttle(() => {
      if (ref.current) {
        const firstInViewport: HTMLDivElement = Array.prototype.find.call(
          ref.current.getElementsByClassName('ory-cell'),
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

  const insertAtEnd = useInsertCellAtTheEnd();

  const shouldCreateFallbackCell = node && cells.length === 0;
  useEffect(() => {
    if (shouldCreateFallbackCell) {
      insertAtEnd({});
    }
  }, [shouldCreateFallbackCell]);

  useEffect(() => {
    if (firstElementInViewPortref.current) {
      const { el, topOffset } = firstElementInViewPortref.current;
      setTimeout(() => {
        scrollIntoViewWithOffset(el, topOffset, 'auto');
      }, 0);
    }
  }, [firstElementInViewPortref.current]);
  if (!node) {
    return null;
  }
  return (
    <div ref={sizeRef}>
      <div ref={ref} className="ory-editable">
        {cells.map((cell) => (
          <Cell nodeId={cell.id} rowWidth={width} key={cell.id} />
        ))}
      </div>
    </div>
  );
};

export default Inner;
