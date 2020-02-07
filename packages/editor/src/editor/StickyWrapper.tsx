import React, { useState } from 'react';

export default ({ children }) => {
  const ref = React.createRef<HTMLDivElement>();

  const stickyElRef = React.createRef<HTMLDivElement>();
  const [shouldStickToTop, setShouldStickToTop] = useState(false);
  const [shouldStickToBottom, setShouldStickToBottom] = useState(true);

  const [rightOffset, setRightOffset] = useState(0);
  React.useEffect(() => {
    const calc = () => {
      if (ref.current) {
        const { top, left } = ref.current.getBoundingClientRect();
        const bottom = top + ref.current.clientHeight;
        // document.documentElement.clientWidth is without scrollbars, so better for us
        const right =
          document.documentElement.clientWidth - left - ref.current.clientWidth;

        const uiHeight = stickyElRef.current
          ? stickyElRef.current.clientHeight
          : 400;
        setRightOffset(right);
        setShouldStickToTop(top > window.innerHeight - uiHeight);
        setShouldStickToBottom(bottom < window.innerHeight);
      }
    };
    document.addEventListener('scroll', calc);
    window.addEventListener('resize', calc);
    // do it once
    calc();

    return () => {
      document.removeEventListener('scroll', calc);
      window.removeEventListener('resize', calc);
    };
  }, [ref, stickyElRef]);

  return (
    <div style={{ position: 'relative' }} ref={ref}>
      {children({
        rightOffset,
        stickyElRef,
        shouldStickToTop,
        shouldStickToBottom,
      })}
    </div>
  );
};
