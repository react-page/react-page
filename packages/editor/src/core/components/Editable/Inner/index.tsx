import throttle from 'lodash.throttle';
import * as React from 'react';
import { useEffect, useRef } from 'react';

import scrollIntoViewWithOffset from '../../Cell/utils/scrollIntoViewWithOffset';

import InsertNew from '../../Cell/InsertNew';
import Row from '../../Row';
import { useEditableNode } from '../../hooks';

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
  const { rowIds } = useEditableNode((editable) => ({
    rowIds: editable?.rows?.map((c) => c.id) ?? [],
  }));

  const ref = useRef<HTMLDivElement>();

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

  return (
    <div style={{ minHeight: 400, display: 'flex', flexDirection: 'column' }}>
      <div ref={ref} className="react-page-editable">
        {rowIds.length > 0
          ? rowIds.map((id) => <Row nodeId={id} key={id} />)
          : null}
      </div>
      <InsertNew />
    </div>
  );
};

export default React.memo(Inner);
